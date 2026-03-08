import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { reviewApiClient } from "@/api";
import { QUERY_KEYS } from "@/constants";
import {
  CanRateFreelancerResponse,
  CreateReviewInput,
  FreelancerReviewsResponse,
  ListQuery,
} from "@/types";

export const useCanRateFreelancer = (
  freelancerId: string | undefined,
): UseQueryResult<CanRateFreelancerResponse> => {
  return useQuery({
    queryKey: QUERY_KEYS.REVIEWS.canRate(freelancerId ?? ""),
    queryFn: () =>
      freelancerId
        ? reviewApiClient.canRateFreelancer(freelancerId)
        : Promise.resolve({ canRate: false, hasReviewed: false, reason: null }),
    enabled: !!freelancerId,
  });
};

export const useGetFreelancerReviews = (
  freelancerId: string | undefined,
  query: ListQuery = {},
): UseQueryResult<FreelancerReviewsResponse> => {
  return useQuery({
    queryKey: QUERY_KEYS.REVIEWS.byFreelancer(freelancerId ?? "", query),
    queryFn: () =>
      freelancerId
        ? reviewApiClient.listFreelancerReviews(freelancerId, query)
        : Promise.resolve({
            data: [],
            meta: {
              page: 1,
              pageSize: query.pagination?.pageSize ?? 10,
              totalItems: 0,
              totalPages: 0,
              hasNext: false,
              hasPrev: false,
            },
          }),
    enabled: !!freelancerId,
  });
};

export const useCreateReview = (): UseMutationResult<
  unknown,
  Error,
  CreateReviewInput
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => reviewApiClient.createReview(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.REVIEWS.canRate(variables.freelancerId),
      });
      queryClient.invalidateQueries({
        predicate: (q) =>
          q.queryKey[0] === QUERY_KEYS.REVIEWS.all[0] &&
          q.queryKey[2] === variables.freelancerId,
      });
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === QUERY_KEYS.FREELANCERS.all[0],
      });
    },
  });
};
