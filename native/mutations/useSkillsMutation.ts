import { QUERY_KEYS } from "@/constants";
import { Skill } from "@/types";
import { skillsApiClient } from "@/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetSkills = (): UseQueryResult<Skill[]> => {
  return useQuery({
    queryKey: QUERY_KEYS.SKILLS.all,
    queryFn: skillsApiClient.getAllSkills,
  });
};

export const useGetSkillsByProfession = (
  professionId: string,
): UseQueryResult<Skill[]> => {
  return useQuery({
    queryKey: QUERY_KEYS.SKILLS.detail(professionId),
    queryFn: () => skillsApiClient.getSkillsByProfession({ professionId }),
    enabled: !!professionId, // prevents running with empty id
  });
};
