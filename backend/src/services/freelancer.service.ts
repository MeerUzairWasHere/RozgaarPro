import { Freelancer, FreelancerStatus, Role } from "@prisma/client";
import { FreelancerProfileCompletedInput, ListQueryDto } from "../dto";
import {
  IFreelancerService,
  IPrismaService,
  IUserService,
} from "../interfaces";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import { MAX_NUMBER_OF_SKILLS } from "../utils/constants";
import { emptyPaginatedResponse, PaginatedResponse } from "../types";
import {
  buildOrderBy,
  buildPagination,
  buildSearch,
  buildSelect,
  buildWhere,
} from "../utils/prisma-list.builder";

export class FreelancerService implements IFreelancerService {
  constructor(
    private prismaService: IPrismaService,
    private userService: IUserService,
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
  ): Promise<PaginatedResponse<Freelancer>> {
    const { page, pageSize, skip, take } = buildPagination(query.pagination);

    const randomfreelancerIds = await this.getRandomFreelancerIds(5);

    if (randomfreelancerIds.length === 0) {
      return emptyPaginatedResponse<Freelancer>(page, pageSize);
    }

    const baseWhere = {
      status: FreelancerStatus.APPROVED,
      id: { in: randomfreelancerIds },
    };

    const filterWhere = buildWhere(query.filters);
    const searchWhere = buildSearch(query.search);

    const where = {
      AND: [baseWhere, filterWhere, ...(searchWhere ? [searchWhere] : [])],
    };

    const orderBy = buildOrderBy(query.sort);

    const [data, totalItems] = await this.prismaService.$transaction([
      this.prismaService.freelancer.findMany({
        where,
        orderBy,
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          primaryProfession: {
            select: {
              id: true,
              name: true,
            },
          },
          skills: {
            select: {
              skill: true,
            },
          },
        },
        skip,
        take,
      }),
      this.prismaService.freelancer.count({ where }),
    ]);

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
}
