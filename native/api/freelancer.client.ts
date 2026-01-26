import { api } from "@/lib/axios";
import { FREELANCER_STATUS, FreelancerProfileCompletedInput } from "@/types";

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

  getFreelancerStatus: async (): Promise<FREELANCER_STATUS> => {
    const { data } = await api.get<FREELANCER_STATUS>("/freelancers/status");
    return data;
  },
};
