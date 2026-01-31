import { QUERY_KEYS } from "@/constants";
import {
  FreelancerProfileCompletedInput,
  Profession,
  ProfessionsFilterListInputDto,
  ProfessionWithFreelancerCount,
  Skill,
} from "@/types";
import { professionApiClient, skillsApiClient } from "@/api";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export const useGetProfessions = (): UseQueryResult<Profession[]> => {
  return useQuery({
    queryKey: QUERY_KEYS.PROFESSIONS.all,
    queryFn: professionApiClient.getAllProfessions,
  });
};

export const useGetProfessionsFilterList = (
  body: ProfessionsFilterListInputDto,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFESSIONS.details],
    queryFn: () => professionApiClient.getProfessionsFilterList(body),
    enabled: !!body, // prevent running without params
  });
};
