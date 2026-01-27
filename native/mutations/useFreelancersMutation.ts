import { freelancerApiClient } from "@/api/freelancer.api";
import { QUERY_KEYS } from "@/constants";
import {
  Freelancer,
  FREELANCER_STATUS,
  FreelancerProfileCompletedInput,
  ListQuery,
  PaginatedResponse,
} from "@/types";
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

export const useGetFreelancerStatus = (
  freelancerId: string,
): UseQueryResult<FREELANCER_STATUS> => {
  return useQuery({
    queryKey: QUERY_KEYS.FREELANCERS.detail(freelancerId),
    queryFn: () => freelancerApiClient.getFreelancerStatus(freelancerId),
    enabled: !!freelancerId,
  });
};

export const useGetAllVisibleFreelancers = (
  query: ListQuery = {},
): UseQueryResult<PaginatedResponse<Freelancer>> => {
  return useQuery({
    queryKey: [QUERY_KEYS.FREELANCERS.all, query],
    queryFn: () => freelancerApiClient.getAllVisibleFreelancers(query),
  });
};

export const useGetFreelancerDetails = (
  freelancerId: string,
): UseQueryResult<Freelancer> => {
  return useQuery({
    queryKey: QUERY_KEYS.FREELANCERS.detail(freelancerId),
    queryFn: () => freelancerApiClient.getFreelancerDetails(freelancerId),
    enabled: !!freelancerId,
  });
};
