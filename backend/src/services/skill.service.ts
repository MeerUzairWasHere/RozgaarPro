import { Skill } from "@prisma/client";
import {
  IPrismaService,
  IProfessionService,
  ISkillService,
} from "../interfaces";

export class SkillService implements ISkillService {
  constructor(
    private prismaService: IPrismaService,
    private professionService: IProfessionService,
  ) {}

  async getAllAvailableSkills(): Promise<Skill[]> {
    return this.prismaService.skill.findMany();
  }

  async getSkillsByProfession(professionId: string) {
    await this.professionService.findProfessionByIdOrThrowError({
      professionId,
    });

    return this.prismaService.skill.findMany({
      where: { professionId },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
