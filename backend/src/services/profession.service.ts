import { Profession } from "@prisma/client";
import { IPrismaService, IProfessionService } from "../interfaces";
import { NotFoundError } from "../errors";
import { ProfessionWithFreelancerCount } from "../dto";

export class ProfessionService implements IProfessionService {
  constructor(private prismaService: IPrismaService) {}

  async getAllAvailableProfessions(): Promise<Profession[]> {
    return this.prismaService.profession.findMany();
  }

  async getSingleProfession({
    professionId,
  }: {
    professionId: string;
  }): Promise<Profession> {
    return await this.findProfessionByIdOrThrowError({
      professionId,
    });
  }

  async findProfessionByIdOrThrowError({
    professionId,
  }: {
    professionId: string;
  }): Promise<Profession> {
    const profession = await this.prismaService.profession.findUnique({
      where: { id: professionId },
    });

    if (!profession) {
      throw new NotFoundError(`Profession with id ${professionId} not found`);
    }

    return profession;
  }

  async getProfessionsFilterList(): Promise<ProfessionWithFreelancerCount[]> {
    const professions = await this.prismaService.profession.findMany({
      take: 6,
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            freelancers: true,
          },
        },
      },
    });

    return professions;
  }
}
