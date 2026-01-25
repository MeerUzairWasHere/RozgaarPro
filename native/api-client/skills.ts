import { api } from "@/lib/axios";
import { Skill, SkillsFilterCategories } from "@/types";

export const skillsApiClient = {
  getAllSkills: async (): Promise<Skill[]> => {
    const { data } = await api.get<Skill[]>("/skills");
    return data;
  },
  getSkillsFilterCategories: async (): Promise<SkillsFilterCategories[]> => {
    const { data } =
      await api.get<SkillsFilterCategories[]>("/skills/categories");
    return data;
  },
};
