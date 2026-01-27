import { Freelancer, FreelancerStatus } from "@prisma/client";
import { FreelancerProfileCompletedInput, ListQueryDto } from "../dto";
import { PaginatedResponse } from "../types";

export interface IFreelancerService {
  createAndCompleteFreelancerProfile({
    id,
    params,
  }: {
    id: string;
    params: FreelancerProfileCompletedInput;
  }): Promise<void>;

  getFreelancerStatus(id: string): Promise<FreelancerStatus | null>;

  getAllVisibleFreelancers(
    query: ListQueryDto,
  ): Promise<PaginatedResponse<Freelancer>>;

  findFreelancerByIdOrThrowError({ id }: { id: string }): Promise<Freelancer>;
}



