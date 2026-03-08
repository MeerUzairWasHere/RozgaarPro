import { api } from "@/lib";
import {
  CanRateFreelancerResponse,
  CreateReviewInput,
  FreelancerReviewsResponse,
  ListQuery,
} from "@/types";

export const reviewApiClient = {
  canRateFreelancer: async (
    freelancerId: string,
  ): Promise<CanRateFreelancerResponse> => {
    const { data } = await api.get<CanRateFreelancerResponse>(
      `/reviews/freelancers/${freelancerId}/can-rate`,
    );

    return data;
  },

  createReview: async (payload: CreateReviewInput) => {
    const { data } = await api.post("/reviews", payload);
    return data;
  },

  listFreelancerReviews: async (
    freelancerId: string,
    query: ListQuery,
  ): Promise<FreelancerReviewsResponse> => {
    const { data } = await api.post<FreelancerReviewsResponse>(
      `/reviews/freelancers/${freelancerId}/list`,
      query,
    );

    return data;
  },
};
