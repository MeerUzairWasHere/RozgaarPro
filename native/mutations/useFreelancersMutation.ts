import { useInfiniteQuery } from "@tanstack/react-query";
import { freelancerApiClient } from "@/api";
import { QUERY_KEYS } from "@/constants";
import { hasValidCoordinates } from "@/lib";
import { FREELANCER_STATUS, ListQuery } from "@/types";

import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export const useCompleteFreelancerProfile = (): UseMutationResult<
  string,
  Error,
  FormData
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

export const useGetTopRatedFreelancers = (query: ListQuery = {}) => {
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
          pageSize: query.pagination?.pageSize ?? 15,
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

export const useGetAllVisibleFreelancersBySearch = (query: ListQuery = {}) => {
  const hasLocation = hasValidCoordinates(query.location);
  const searchTerm = query.search?.term?.trim() ?? "";

  const enabled = hasLocation && searchTerm.length >= 3;

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.FREELANCERS.listQuery(query),
    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      freelancerApiClient.getAllVisibleFreelancers({
        ...query,
        pagination: {
          page: pageParam,
          pageSize: query.pagination?.pageSize ?? 15,
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

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.FREELANCERS.listQuery(query),
    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      freelancerApiClient.getAllVisibleFreelancers({
        ...query,
        pagination: {
          page: pageParam,
          pageSize: query.pagination?.pageSize ?? 15,
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

export const useGetSingleVisibleFreelancerDetail = (query: ListQuery) => {
  const enabled =
    hasValidCoordinates(query.location) &&
    Boolean(query.filters?.some((f) => f.field === "freelancerId"));

  return useQuery({
    queryKey: QUERY_KEYS.FREELANCERS.listQuery(query),
    queryFn: () =>
      freelancerApiClient.getSingleVisibleFreelancerDetail(
        query.filters?.find((f) => f.field === "freelancerId")?.value as string,
        query,
      ),
    enabled,
  });
};
