import { Freelancer, FreelancerStatus } from "@prisma/client";
import { FreelancerProfileCompletedInput } from "../dto";

export interface IFreelancerService {
  createAndCompleteFreelancerProfile({
    id,
    params,
  }: {
    id: string;
    params: FreelancerProfileCompletedInput;
  }): Promise<void>;

  getFreelancerStatus(id: string): Promise<FreelancerStatus | null>;

  getAllVisibleFreelancers(): Promise<Freelancer[]>;

  findFreelancerByIdOrThrowError({ id }: { id: string }): Promise<Freelancer>;
}
