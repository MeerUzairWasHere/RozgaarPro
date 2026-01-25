import { Skill } from "@prisma/client";
import { SkillsFilterCategories } from "../dto";

export interface ISkillService {
  getAllAvailableSkills(): Promise<Skill[]>;
  getSkillsFilterCategories(): Promise<SkillsFilterCategories[]>;
}
