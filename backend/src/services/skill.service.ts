import { Skill } from "@prisma/client";
import { IPrismaService, ISkillService } from "../interfaces";
import { SkillsFilterCategories } from "../dto";

export class SkillService implements ISkillService {
  constructor(private prismaService: IPrismaService) {}

  async getAllAvailableSkills(): Promise<Skill[]> {
    return this.prismaService.skill.findMany();
  }

  async getSkillsFilterCategories(): Promise<SkillsFilterCategories[]> {
    return await this.prismaService.skill.findMany({
      take: 6,
      orderBy: {
        freelancer: {
          _count: "desc",
        },
      },
      select: {
        id: true,
        name: true,
        profession: true,
        _count: {
          select: { freelancer: true },
        },
      },
    });
  }
}
