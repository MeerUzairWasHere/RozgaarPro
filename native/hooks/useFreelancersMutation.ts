import { freelancerApiClient } from "@/api-client/freelancer";
import { FreelancerProfileCompletedInput } from "@/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useCompleteFreelancerProfile = (): UseMutationResult<
  string,
  Error,
  FreelancerProfileCompletedInput
> => {
  return useMutation({
    mutationFn: freelancerApiClient.createAndCompleteFreelancerProfile,
  });
};
