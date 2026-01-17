import { Skill } from "@prisma/client";

export interface ISkillService {
  getAllAvailableSkills(): Promise<Skill[]>;
}
