import { useInfiniteQuery } from "@tanstack/react-query";
import { freelancerApiClient } from "@/api";
import { QUERY_KEYS } from "@/constants";
import { hasValidCoordinates } from "@/lib";
import {
  FREELANCER_STATUS,
  FreelancerProfileCompletedInput,
  ListQuery,
  NearbyFreelancer,
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
    queryKey: QUERY_KEYS.FREELANCERS.byId(freelancerId),
    queryFn: () => freelancerApiClient.getFreelancerStatus(freelancerId),
    enabled: !!freelancerId,
  });
};

export const useGetRandomVisibleFreelancers = (query: ListQuery = {}) => {
  const enabled = hasValidCoordinates(query.location);
  return useQuery({
    queryKey: QUERY_KEYS.FREELANCERS.listQuery(query),
    queryFn: () => freelancerApiClient.getAllVisibleFreelancers(query),
    enabled,
  });
};

export const useGetAllVisibleFreelancers = (query: ListQuery = {}) => {
  const enabled = hasValidCoordinates(query.location);

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.FREELANCERS.listQuery(query),
    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      freelancerApiClient.getAllVisibleFreelancers({
        ...query,
        pagination: {
          page: pageParam,
          pageSize: query.pagination?.pageSize ?? 25,
        },
      }),

    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNext) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },

    enabled,
  });
};

export const useGetFilteredVisibleFreelancers = (query: ListQuery = {}) => {
  const enabled = hasValidCoordinates(query.location);
  return useQuery({
    queryKey: QUERY_KEYS.FREELANCERS.listQuery(query),
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
    queryKey: QUERY_KEYS.FREELANCERS.detailByLocation(
      freelancerId!,
      query.location?.latitude ?? 0,
      query.location?.longitude ?? 0,
    ),
    queryFn: () =>
      freelancerApiClient.getSingleVisibleFreelancerDetail(freelancerId, query),
    enabled,
  });
};
