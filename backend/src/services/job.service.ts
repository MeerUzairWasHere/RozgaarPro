import { Job } from "@prisma/client";
import { JobCreateInputDto } from "../dto";
import {
  IFreelancerService,
  IJobService,
  IPrismaService,
  IUserService,
} from "../interfaces";

export class JobService implements IJobService {
  constructor(
    private prismaService: IPrismaService,
    private userService: IUserService,
    private freelancerService: IFreelancerService,
  ) {}

  async createJob({
    params,
    userId,
    freelancerId,
  }: {
    params: JobCreateInputDto;
    userId: string;
    freelancerId: string;
  }): Promise<Job> {
    await this.userService.findUserByIdOrThrowError({
      id: userId,
    });
    await this.freelancerService.findFreelancerByIdOrThrowError({
      id: freelancerId,
    });

    const job = await this.prismaService.job.create({
      data: {
        ...params,
        userId,
        freelancerId,
      },
    });

    return job;
  }
}
