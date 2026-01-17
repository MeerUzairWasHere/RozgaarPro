import { Skill } from "@prisma/client";
import { ISkillService } from "../interfaces";
import { SkillRepository } from "../repositories/skill.repository";

export class SkillService implements ISkillService {
  constructor(private skillRepository: SkillRepository) {}

  getAllAvailableSkills(): Promise<Skill[]> {
    return this.skillRepository.findMany();
  }
}
