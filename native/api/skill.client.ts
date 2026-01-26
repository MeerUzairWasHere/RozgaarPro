import { api } from "@/lib/axios";
import { Skill } from "@/types";

export const skillsApiClient = {
  getAllSkills: async (): Promise<Skill[]> => {
    const { data } = await api.get<Skill[]>("/skills");
    return data;
  },

  getSkillsByProfession: async ({
    professionId,
  }: {
    professionId: string;
  }): Promise<Skill[]> => {
    const { data } = await api.get<Skill[]>(
      `/professions/${professionId}/skills`,
    );
    return data;
  },
};
