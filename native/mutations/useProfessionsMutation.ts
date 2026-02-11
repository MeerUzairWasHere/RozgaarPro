import { QUERY_KEYS } from "@/constants";
import { ListQuery, Profession } from "@/types";
import { professionApiClient } from "@/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetProfessions = (): UseQueryResult<Profession[]> => {
  return useQuery({
    queryKey: QUERY_KEYS.PROFESSIONS.all,
    queryFn: professionApiClient.getAllProfessions,
  });
};

export const useGetProfessionsFilterList = (query: ListQuery) => {
  const hasValidLocation =
    query?.location?.latitude !== 0 && query?.location?.longitude !== 0;

  return useQuery({
    queryKey: QUERY_KEYS.PROFESSIONS.listQuery(query),
    queryFn: () => professionApiClient.getProfessionsFilterList(query),
    enabled: !!hasValidLocation, // prevent running without params
  });
};
