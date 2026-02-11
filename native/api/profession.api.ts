import { api } from "@/lib";
import { ListQuery, Profession, ProfessionWithFreelancerCount } from "@/types";

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

  getProfessionsFilterList: async (
    body: ListQuery,
  ): Promise<ProfessionWithFreelancerCount[]> => {
    const { data } = await api.post<ProfessionWithFreelancerCount[]>(
      "/professions/filter-list",
      body,
    );
    return data;
  },
};
