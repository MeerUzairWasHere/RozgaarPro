import { api } from "@/lib/axios";
import { Profession, ProfessionWithFreelancerCount } from "@/types";

export const professionApiClient = {
  getAllProfessions: async (): Promise<Profession[]> => {
    const { data } = await api.get<Profession[]>("/professions");
    return data;
  },
  getSingleProfession: async ({
    professionId,
  }: {
    professionId: string;
  }): Promise<Profession> => {
    const { data } = await api.get<Profession>(`/professions/${professionId}`);
    return data;
  },

  getProfessionsFilterList: async (): Promise<
    ProfessionWithFreelancerCount[]
  > => {
    const { data } = await api.get<ProfessionWithFreelancerCount[]>(
      "/professions/filter-list",
    );
    return data;
  },
};
