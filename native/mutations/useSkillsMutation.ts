import { QUERY_KEYS } from "@/constants";
import { Skill, SkillsFilterCategories } from "@/types";
import { skillsApiClient } from "@/api-client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetSkills = (): UseQueryResult<Skill[]> => {
  return useQuery({
    queryKey: QUERY_KEYS.SKILLS.all,
    queryFn: skillsApiClient.getAllSkills,
  });
};

export const useGetSkillsFilterCategories = (): UseQueryResult<
  SkillsFilterCategories[]
> => {
  return useQuery({
    queryKey: QUERY_KEYS.SKILLS.all,
    queryFn: skillsApiClient.getSkillsFilterCategories,
  });
};
