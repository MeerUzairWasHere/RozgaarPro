import { Job } from "@prisma/client";
import { JobCreateInputDto } from "../dto";

export interface IJobService {
  createJob({
    params,
    userId,
    freelancerId,
  }: {
    params: JobCreateInputDto;
    userId: string;
    freelancerId: string;
  }): Promise<Job>;
}
