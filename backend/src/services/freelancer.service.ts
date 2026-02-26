import {
  Freelancer,
  FreelancerStatus,
  Image,
  Prisma,
  Role,
} from "@prisma/client";
import {
  Coordinates,
  FilterOperator,
  FreelancerImage,
  FreelancerProfileCompletedInput,
  ListFilter,
  ListQueryDto,
  NearbyFreelancer,
  NearbyFreelancerDetail,
} from "../dto";
import {
  BucketType,
  IFreelancerService,
  ILocationService,
  IPrismaService,
  IProfileImageService,
  IStorageService,
  IUserService,
  ProcessedImageResult,
  StorageUploadResult,
} from "../interfaces";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import {
  MAX_NUMBER_OF_GALLERY_IMAGES,
  MAX_NUMBER_OF_SKILLS,
  MAX_TOTAL_GALLERY_IMAGES,
} from "../utils/constants";
import { FreelancerUploadFiles, PaginatedResponse } from "../types";
import { executePaginatedRawQuery } from "../utils";

export class FreelancerService implements IFreelancerService {
  constructor(
    private prismaService: IPrismaService,
    private userService: IUserService,
    private locationService: ILocationService,
    private storageService: IStorageService,
    private profileImageService: IProfileImageService,
  ) {}

  async createAndCompleteFreelancerProfile({
    id,
    params,
    files,
  }: {
    id: string;
    params: FreelancerProfileCompletedInput;
    files: FreelancerUploadFiles;
  }) {
    const user = await this.userService.findUserByIdOrThrowError({ id });

    if (user.role !== Role.FREELANCER) {
      throw new ForbiddenError("Only freelancers can complete this profile");
    }

    const profileImage = files.profileImage?.[0];
    const idImage = files.idImage?.[0];

    if (!idImage) {
      throw new BadRequestError("ID image is required");
    }

    let profileImageResult: ProcessedImageResult | undefined;
    let idImageResult: ProcessedImageResult | undefined;

    try {
      // Process and upload profile image (optional)
      if (profileImage) {
        profileImageResult =
          await this.profileImageService.processAndUploadProfileImage(
            profileImage.buffer,
            profileImage.mimetype,
            id,
          );
      }

      // Upload ID image (required)
      idImageResult = await this.profileImageService.uploadIdImage(
        idImage.buffer,
        idImage.mimetype,
        id,
      );

      // Validate skills
      if (
        params.skillIds.length === 0 ||
        params.skillIds.length > MAX_NUMBER_OF_SKILLS
      ) {
        throw new BadRequestError(
          `Select up to ${MAX_NUMBER_OF_SKILLS} skills`,
        );
      }

      const skillsCount = await this.prismaService.skill.count({
        where: {
          id: { in: params.skillIds },
          professionId: params.professionId,
        },
      });

      if (skillsCount !== params.skillIds.length) {
        throw new BadRequestError("Invalid skills for selected profession");
      }

      // Create freelancer profile in transaction
      await this.prismaService.$transaction(async (tx) => {
        await tx.freelancer.create({
          data: {
            userId: id,
            experience: params.experience,
            phone: user.phone,
            primaryProfessionId: params.professionId,
            locations: {
              create: {
                latitude: params.location.latitude,
                longitude: params.location.longitude,
                accuracy: params.location.accuracy,
              },
            },
            skills: {
              create: params.skillIds.map((skillId) => ({
                skillId,
              })),
            },
          },
        });

        await tx.user.update({
          where: { id: user.id },
          data: {
            profileImage: profileImageResult?.storageResult.key ?? null,
            idImage: idImageResult?.storageResult.key ?? "",
            profileCompleted: true,
          },
        });
      });
    } catch (error) {
      // Cleanup orphaned files on error
      if (profileImageResult) {
        await profileImageResult.cleanup();
      }
      if (idImageResult) {
        await idImageResult.cleanup();
      }

      console.error("Failed to create freelancer profile:", error);
      throw error;
    }
  }

  async getFreelancerStatus(id: string): Promise<FreelancerStatus> {
    const freelancer = await this.findFreelancerByIdOrThrowError({ id });
    return freelancer.status;
  }

  async getAllVisibleFreelancers(
    query: ListQueryDto,
  ): Promise<PaginatedResponse<NearbyFreelancer>> {
    const defaultFilters: ListFilter[] = [
      {
        alias: "f",
        field: "status",
        operator: FilterOperator.EQUAL_TO,
        value: FreelancerStatus.APPROVED,
      },
    ];

    const { latitude, longitude } = query.location ?? {};

    const response = await executePaginatedRawQuery<NearbyFreelancer>({
      prisma: this.prismaService,
      query,
      defaultFilters,
      baseQuery: (sqlFilters, sqlOrder, sqlSearch, take, skip) => Prisma.sql`
      SELECT
        f.id AS freelancer_Id,
        u.id AS user_Id,
        u.name AS name,
        u."profileImage" AS profile_image_key,
        f.experience AS experience,
        f.status AS status,
        f.rating AS rating,
        p.name AS primary_profession_name,
        p.id AS primary_profession_id,
        get_distance_km(
          ${latitude},
          ${longitude},
          fl.latitude,
          fl.longitude
        ) AS distance_km
      FROM "Freelancer" f
      JOIN "FreelancerLocation" fl
        ON fl."freelancerId" = f.id
       AND fl."recordedAt" = (
         SELECT MAX(fl2."recordedAt")
         FROM "FreelancerLocation" fl2
         WHERE fl2."freelancerId" = f.id
       )
      JOIN "User" u
        ON u.id = f."userId"
      JOIN "Profession" p
        ON f."primaryProfessionId" = p."id"
      ${sqlFilters}
      ${sqlSearch}
      ${sqlOrder}
      LIMIT ${take}
      OFFSET ${skip}
    `,
      countQuery: (sqlFilters) => Prisma.sql`
        SELECT COUNT(*)::int AS count FROM "Freelancer"`,
    });

    // map avatar keys to URLs
    response.data = response.data.map((item) => ({
      ...item,
      profile_image_url: item.profile_image_key
        ? this.storageService.getPublicUrl(item.profile_image_key)
        : null,
    }));

    return response;
  }

  async getSingleVisibleFreelancerDetail(
    coords: Coordinates,
    freelancerId: string,
  ): Promise<NearbyFreelancerDetail> {
    await this.findFreelancerByIdOrThrowError({
      id: freelancerId,
    });

    const { latitude, longitude } = coords;

    if (latitude == null || longitude == null) {
      throw new Error("Location (latitude, longitude) is required");
    }

    const result = await this.prismaService.$queryRaw<NearbyFreelancerDetail[]>`
    SELECT
      f.id::TEXT AS freelancer_id,
      u.id::TEXT AS user_id,
      u.phone AS phone,
      u.name AS name,
      u."profileImage" AS profile_image_key,
      f.availability AS availability,
      f.experience AS experience,
      f.status AS status,
      f.rating AS rating,
      f.description AS description,
      p.name AS primary_profession_name,
      p.id AS primary_profession_id,
      fl.latitude AS latitude,
      fl.longitude AS longitude,
      get_distance_km(
        ${latitude},
        ${longitude},
        fl.latitude,
        fl.longitude
      ) AS distance_km
    FROM "Freelancer" f
    JOIN "FreelancerLocation" fl
      ON fl."freelancerId" = f.id
     AND fl."recordedAt" = (
       SELECT MAX(fl2."recordedAt")
       FROM "FreelancerLocation" fl2
       WHERE fl2."freelancerId" = f.id
     )
    JOIN "User" u
      ON u.id = f."userId"
    JOIN "Profession" p
      ON f."primaryProfessionId" = p."id"
    WHERE f.id = ${freelancerId};
  `;

    const location = await this.locationService.getAddressFromCoordinates({
      latitude: result[0].latitude,
      longitude: result[0].longitude,
    });

    const freelancerDetails = {
      ...result[0],
      location,
      profile_image_url: result[0].profile_image_key
        ? this.storageService.getPublicUrl(result[0].profile_image_key)
        : null,
    };

    return freelancerDetails;
  }

  async findFreelancerByIdOrThrowError({
    id,
  }: {
    id: string;
  }): Promise<Freelancer> {
    const freelancer = await this.prismaService.freelancer.findUnique({
      where: { id },
    });

    if (!freelancer) {
      throw new NotFoundError(`Freelancer with id ${id} not found`);
    }

    return freelancer;
  }

  async getRandomFreelancerIds(count: number): Promise<string[]> {
    const rows = await this.prismaService.$queryRaw<Array<{ id: string }>>`
    SELECT f."id"
    FROM "Freelancer" f
    WHERE f."status" = 'APPROVED'
    ORDER BY RANDOM()
    LIMIT ${count}
  `;

    return rows.map((r) => r.id);
  }

  async addImagesToFreelancerProfile({
    freelancerId,
    files,
  }: {
    freelancerId: string;
    files: FreelancerUploadFiles;
  }) {
    if (!files.images || files.images.length === 0) {
      throw new BadRequestError("At least one image is required");
    }

    if (files.images.length > MAX_NUMBER_OF_GALLERY_IMAGES) {
      throw new BadRequestError(
        `You can upload up to ${MAX_NUMBER_OF_GALLERY_IMAGES} images at a time`,
      );
    }

    // Find freelancer or throw
    const freelancer = await this.findFreelancerByIdOrThrowError({
      id: freelancerId,
    });

    // Check total existing images don't exceed the cap
    const existingCount = await this.prismaService.image.count({
      where: { freelancerId: freelancer.id },
    });

    if (existingCount + files.images.length > MAX_TOTAL_GALLERY_IMAGES) {
      throw new BadRequestError(
        `You can have at most ${MAX_TOTAL_GALLERY_IMAGES} gallery images total. You currently have ${existingCount}.`,
      );
    }

    const uploadedResults: StorageUploadResult[] = [];

    try {
      // Upload all images first
      for (const file of files.images) {
        const extension = file.mimetype.split("/")[1];

        const key = `gallery/${freelancerId}-${Date.now()}.${extension}`;

        const result = await this.storageService.upload(
          file.buffer,
          key,
          file.mimetype,
          BucketType.PUBLIC,
        );
        uploadedResults.push(result);
      }

      // Save all to DB in a single transaction
      await this.prismaService.$transaction(async (tx) => {
        await tx.image.createMany({
          data: uploadedResults.map((result) => ({
            freelancerId: freelancer.id,
            imageKey: result.key,
          })),
        });
      });
    } catch (error) {
      // Cleanup any successfully uploaded files on failure
      for (const result of uploadedResults) {
        await this.storageService.delete(result.key, BucketType.PUBLIC);
      }

      console.error("Failed to upload gallery images:", error);
      throw error;
    }
  }

  async getGalleryImages(
    query: ListQueryDto,
  ): Promise<PaginatedResponse<FreelancerImage>> {
    const response = await executePaginatedRawQuery<FreelancerImage>({
      prisma: this.prismaService,
      query,
      defaultFilters: query.filters,
      baseQuery: (sqlFilters, sqlOrder, sqlSearch, take, skip) => Prisma.sql`
        SELECT 
          "id" AS image_id,
          "freelancerId" AS freelancer_id,
          "imageKey" AS image_key,
          "altText" AS alt_text,
          "createdAt" AS created_at
        FROM "Image"
      ${sqlFilters}
      LIMIT ${take}
      OFFSET ${skip}
    `,
      countQuery: (sqlFilters) => Prisma.sql`
        SELECT COUNT(*)::int AS count FROM "Image"`,
    });

    response.data = response.data.map((item) => ({
      ...item,
      image_url: item.image_key
        ? this.storageService.getPublicUrl(item.image_key)
        : null,
    }));

    return response;
  }
}
