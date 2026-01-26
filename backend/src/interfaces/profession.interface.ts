import { Profession } from "@prisma/client";
import { ProfessionWithFreelancerCount } from "../dto";

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

  getProfessionsFilterList(): Promise<ProfessionWithFreelancerCount[]>;
}
