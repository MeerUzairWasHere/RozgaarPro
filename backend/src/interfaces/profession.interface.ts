import { Profession } from "@prisma/client";
import {
  ProfessionWithFreelancerCount,
  ProfessionWithFreelancerCountInputDto,
} from "../dto";

export interface IProfessionService {
  getAllAvailableProfessions(): Promise<Profession[]>;
  getSingleProfession({
    professionId,
  }: {
    professionId: string;
  }): Promise<Profession>;

  findProfessionByIdOrThrowError({
    professionId,
  }: {
    professionId: string;
  }): Promise<Profession>;

  getNearbyProfessionCounts({
    location,
  }: ProfessionWithFreelancerCountInputDto): Promise<
    ProfessionWithFreelancerCount[]
  >;
}
