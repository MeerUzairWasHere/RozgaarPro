import { Skill } from "@prisma/client";

export interface ISkillService {
  getAllAvailableSkills(): Promise<Skill[]>;
  getSkillsByProfession(
    professionId: string,
  ): Promise<Array<{ id: string; name: string }>>;
}
