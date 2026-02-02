import { api } from "@/lib";
import {
  Freelancer,
  FREELANCER_STATUS,
  FreelancerProfileCompletedInput,
  ListQuery,
  NearbyFreelancer,
  NearbyFreelancerDetail,
  PaginatedResponse,
} from "@/types";

export const freelancerApiClient = {
  createAndCompleteFreelancerProfile: async (
    formData: FreelancerProfileCompletedInput,
  ): Promise<string> => {
    const { data } = await api.post<string>(
      "/freelancers/complete-profile",
      formData,
    );
    return data;
  },

  getFreelancerStatus: async (
    freelancerId: string,
  ): Promise<FREELANCER_STATUS> => {
    const { data } = await api.get<FREELANCER_STATUS>(
      `/freelancers/${freelancerId}/status`,
    );

    return data;
  },

  getAllVisibleFreelancers: async (
    query: ListQuery,
  ): Promise<PaginatedResponse<NearbyFreelancer>> => {
    const { data } = await api.post<PaginatedResponse<NearbyFreelancer>>(
      "/freelancers",
      query,
    );
    return data;
  },

  getSingleVisibleFreelancerDetail: async (
    freelancerId: string,
    query: ListQuery,
  ): Promise<NearbyFreelancerDetail> => {
    const { data } = await api.post<NearbyFreelancerDetail>(
      `/freelancers/${freelancerId}`,
      query,
    );
    return data;
  },
};
