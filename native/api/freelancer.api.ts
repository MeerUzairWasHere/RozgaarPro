import { api } from "@/lib/axios";
import {
  Freelancer,
  FREELANCER_STATUS,
  FreelancerProfileCompletedInput,
  ListQuery,
  NearbyFreelancer,
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

  getFreelancerDetails: async (freelancerId: string): Promise<Freelancer> => {
    const { data } = await api.get<Freelancer>(`/freelancers/${freelancerId}`);
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
};
