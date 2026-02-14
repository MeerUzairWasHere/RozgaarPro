import { Freelancer, FreelancerStatus } from "@prisma/client";
import {
  Coordinates,
  FreelancerProfileCompletedInput,
  ListQueryDto,
  NearbyFreelancer,
  NearbyFreelancerDetail,
} from "../dto";
import { FreelancerUploadFiles, PaginatedResponse } from "../types";
import { Request } from "express";

export interface IFreelancerService {
  createAndCompleteFreelancerProfile({
    id,
    params,
    files,
  }: {
    id: string;
    params: FreelancerProfileCompletedInput;
    files: FreelancerUploadFiles;
  }): Promise<void>;

  getFreelancerStatus(id: string): Promise<FreelancerStatus | null>;

  getAllVisibleFreelancers(
    query: ListQueryDto,
  ): Promise<PaginatedResponse<NearbyFreelancer>>;

  findFreelancerByIdOrThrowError({ id }: { id: string }): Promise<Freelancer>;
  getSingleVisibleFreelancerDetail(
    coords: Coordinates,
    freelancerId: string,
  ): Promise<NearbyFreelancerDetail>;
}
