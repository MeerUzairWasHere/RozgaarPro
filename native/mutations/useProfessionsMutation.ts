import { QUERY_KEYS } from "@/constants";
import { Profession, ProfessionWithFreelancerCount, Skill } from "@/types";
import { professionApiClient, skillsApiClient } from "@/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetProfessions = (): UseQueryResult<Profession[]> => {
  return useQuery({
    queryKey: QUERY_KEYS.PROFESSIONS.all,
    queryFn: professionApiClient.getAllProfessions,
  });
};

export const useGetProfessionsFilterList = (): UseQueryResult<
  ProfessionWithFreelancerCount[]
> => {
  return useQuery({
    queryKey: QUERY_KEYS.PROFESSIONS.all,
    queryFn: professionApiClient.getProfessionsFilterList,
  });
};
