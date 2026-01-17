import { api } from "@/lib/axios";
import { FreelancerProfileCompletedInput } from "@/types";

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
};
