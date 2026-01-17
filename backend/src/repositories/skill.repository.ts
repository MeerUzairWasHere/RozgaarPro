import { Skill } from "@prisma/client";
import { IPrismaService } from "../interfaces";

export class SkillRepository {
  constructor(private prismaService: IPrismaService) {}

  async findMany(): Promise<Skill[]> {
    return await this.prismaService.skill.findMany();
  }
}
