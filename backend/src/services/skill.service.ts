import { Skill } from "@prisma/client";
import { IPrismaService, ISkillService } from "../interfaces";

export class SkillService implements ISkillService {
  constructor(private prismaService: IPrismaService) {}

  getAllAvailableSkills(): Promise<Skill[]> {
    return this.prismaService.skill.findMany();
  }
}
