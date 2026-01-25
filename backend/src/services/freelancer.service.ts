import { Freelancer, FreelancerStatus, Role } from "@prisma/client";
import { FreelancerProfileCompletedInput } from "../dto";
import {
  IFreelancerService,
  IPrismaService,
  IUserService,
} from "../interfaces";
import { ForbiddenError, NotFoundError } from "../errors";

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

    await this.prismaService.$transaction(async (tx) => {
      await tx.freelancer.create({
        data: {
          userId: id,
          experience: params.experience,
          phone: user.phone,
          locations: {
            create: {
              latitude: params.location.latitude,
              longitude: params.location.longitude,
              accuracy: params.location.accuracy,
            },
          },
          skills: {
            connect: params.skills.map((skill) => ({ id: skill })),
          },
        },
      });

      await tx.user.update({
        where: { id: user.id },
        data: {
          profileCompleted: true,
        },
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
        user: {
          profileCompleted: true,
        },
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
