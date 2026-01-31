import { freelancerApiClient } from "@/api/freelancer.api";
import { QUERY_KEYS } from "@/constants";
import {
  NearbyFreelancer,
  FREELANCER_STATUS,
  FreelancerProfileCompletedInput,
  ListQuery,
  PaginatedResponse,
  Freelancer,
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

export const useGetAllVisibleFreelancers = (query: ListQuery = {}) => {
  const hasValidLocation =
    query.location?.latitude !== 0 && query.location?.longitude !== 0;

  return useQuery({
    queryKey: QUERY_KEYS.FREELANCERS.listByLocation(
      query.location?.latitude ?? 0,
      query.location?.longitude ?? 0,
    ),
    queryFn: () => freelancerApiClient.getAllVisibleFreelancers(query),
    enabled: hasValidLocation, // 🔥 KEY LINE
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
