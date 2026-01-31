import { QUERY_KEYS } from "@/constants";
import { Profession, ProfessionsFilterListInputDto } from "@/types";
import { professionApiClient } from "@/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetProfessions = (): UseQueryResult<Profession[]> => {
  return useQuery({
    queryKey: QUERY_KEYS.PROFESSIONS.all,
    queryFn: professionApiClient.getAllProfessions,
  });
};

export const useGetProfessionsFilterList = (
  body: ProfessionsFilterListInputDto,
) => {
  const hasValidLocation = body?.latitude !== 0 && body?.longitude !== 0;

  return useQuery({
    queryKey: QUERY_KEYS.PROFESSIONS.listByLocation(
      body.latitude,
      body.longitude,
    ),
    queryFn: () => professionApiClient.getProfessionsFilterList(body),
    enabled: !!hasValidLocation, // prevent running without params
  });
};
