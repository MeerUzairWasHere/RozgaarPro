import { freelancerApiClient } from "@/api";
import { QUERY_KEYS } from "@/constants";
import { hasValidCoordinates } from "@/lib";
import {
  FREELANCER_STATUS,
  FreelancerProfileCompletedInput,
  ListQuery,
} from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const enabled = hasValidCoordinates(query.location);
  return useQuery({
    queryKey: QUERY_KEYS.FREELANCERS.listByLocation(
      query.location?.latitude ?? 0,
      query.location?.longitude ?? 0,
    ),
    queryFn: () => freelancerApiClient.getAllVisibleFreelancers(query),
    enabled,
  });
};

export const useGetSingleVisibleFreelancerDetail = ({
  freelancerId,
  query,
}: {
  freelancerId: string;
  query: ListQuery;
}) => {
  const enabled = hasValidCoordinates(query.location) && Boolean(freelancerId);

  return useQuery({
    queryKey: QUERY_KEYS.FREELANCERS.DetailByLocation(
      freelancerId!,
      query.location?.latitude ?? 0,
      query.location?.longitude ?? 0,
    ),
    queryFn: () =>
      freelancerApiClient.getSingleVisibleFreelancerDetail(freelancerId, query),
    enabled,
  });
};
