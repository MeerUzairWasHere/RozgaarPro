import { Freelancer, FreelancerStatus, Role } from "@prisma/client";
import {
  FreelancerProfileCompletedInput,
  FreelancerWithAwayDistanceInput,
  ListQueryDto,
  NearbyFreelancer,
  NearbyFreelancerDetail,
} from "../dto";
import {
  IFreelancerService,
  ILocationService,
  IPrismaService,
  IUserService,
} from "../interfaces";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import { MAX_NUMBER_OF_SKILLS } from "../utils/constants";
import { PaginatedResponse } from "../types";
import { buildPagination } from "../utils/prisma-list.builder";

export class FreelancerService implements IFreelancerService {
  constructor(
    private prismaService: IPrismaService,
    private userService: IUserService,
    private locationService: ILocationService,
  ) {}

  async createAndCompleteFreelancerProfile({
    id,
    params,
  }: {
    id: string;
    params: FreelancerProfileCompletedInput;
  }) {
    const user = await this.userService.findUserByIdOrThrowError({ id });

    if (user.role !== Role.FREELANCER) {
      throw new ForbiddenError("Only freelancers can complete this profile");
    }

    if (
      params.skillIds.length === 0 ||
      params.skillIds.length > MAX_NUMBER_OF_SKILLS
    ) {
      throw new BadRequestError(`Select up to ${MAX_NUMBER_OF_SKILLS} skills`);
    }

    // 🔐 Validate skills belong to profession
    const skillsCount = await this.prismaService.skill.count({
      where: {
        id: { in: params.skillIds },
        professionId: params.professionId,
      },
    });

    if (skillsCount !== params.skillIds.length) {
      throw new BadRequestError("Invalid skills for selected profession");
    }

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
        data: { profileCompleted: true },
      });
    });
  }

  async getFreelancerStatus(id: string): Promise<FreelancerStatus> {
    const freelancer = await this.findFreelancerByIdOrThrowError({ id });
    return freelancer.status;
  }

  async getAllVisibleFreelancers(
    query: ListQueryDto,
  ): Promise<PaginatedResponse<NearbyFreelancer>> {
    const { page, pageSize, skip, take } = buildPagination({
      page: 1,
      pageSize: 5,
    });

    const { latitude, longitude } = query.location ?? {};

    const data = await this.prismaService.$queryRaw<NearbyFreelancer[]>`
    SELECT
      f.id AS freelancer_Id,
      u.id AS user_Id,
      u.name AS name,
      f.experience AS experience,
      f.status AS status,
      f.rating AS rating,
      p.name AS primary_profession_name,
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
    WHERE f.status = 'APPROVED'
    ORDER BY distance_km ASC
    LIMIT ${take}
    OFFSET ${skip};
  `;

    const totalItems = data.length; // OK for now

    return {
      data,
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
        hasNext: page * pageSize < totalItems,
        hasPrev: page > 1,
      },
    };
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

  async getSingleVisibleFreelancerDetail({
    latitude,
    longitude,
    freelancerId,
  }: FreelancerWithAwayDistanceInput): Promise<NearbyFreelancerDetail> {
    // Ensure freelancer exists
    await this.findFreelancerByIdOrThrowError({ id: freelancerId });

    if (latitude == null || longitude == null) {
      throw new Error("Location (latitude, longitude) is required");
    }

    const result = await this.prismaService.$queryRaw<NearbyFreelancerDetail[]>`
    SELECT
      f.id::TEXT AS freelancer_id,
      u.id::TEXT AS user_id,
      u.name AS name,
      f.experience AS experience,
      f.status AS status,
      f.rating AS rating,
      f.description AS description,
      p.name AS primary_profession_name,
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
    };

    return freelancerDetails;
  }
}
