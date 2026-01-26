import { freelancerApiClient } from "@/api/freelancer.client";
import { QUERY_KEYS } from "@/constants";
import { FREELANCER_STATUS, FreelancerProfileCompletedInput } from "@/types";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export const useCompleteFreelancerProfile = (): UseMutationResult<
  string,
  Error,
  FreelancerProfileCompletedInput
> => {
  return useMutation({
    mutationFn: freelancerApiClient.createAndCompleteFreelancerProfile,
  });
};

export const useGetFreelancerStatus = (): UseQueryResult<FREELANCER_STATUS> => {
  return useQuery({
    queryKey: QUERY_KEYS.FREELANCERS.all,
    queryFn: freelancerApiClient.getFreelancerStatus,
  });
};
