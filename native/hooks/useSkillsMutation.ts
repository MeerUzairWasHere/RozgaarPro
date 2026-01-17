import { skillsApiClient } from "@/api-client";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Skill } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetSkills = (): UseQueryResult<Skill[]> => {
  return useQuery({
    queryKey: QUERY_KEYS.SKILLS.all,
    queryFn: skillsApiClient.getAllSkills,
  });
};
