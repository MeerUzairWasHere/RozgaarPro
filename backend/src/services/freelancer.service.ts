import { Freelancer, FreelancerStatus, Role } from "@prisma/client";
import { FreelancerProfileCompletedInput } from "../dto";
import {
  IFreelancerService,
  IPrismaService,
  IUserService,
} from "../interfaces";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import { MAX_NUMBER_OF_SKILLS } from "../utils/constants";

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

  async getAllVisibleFreelancers(): Promise<Freelancer[]> {
    return this.prismaService.freelancer.findMany({
      where: {
        status: FreelancerStatus.APPROVED,
      },
    });
  }

  async findFreelancerByIdOrThrowError({
    id,
  }: {
    id: string;
  }): Promise<Freelancer> {
    const freelancer = await this.prismaService.freelancer.findUnique({
      where: { userId: id },
    });

    if (!freelancer) {
      throw new NotFoundError(`Freelancer with id ${id} not found`);
    }

    return freelancer;
  }
}
