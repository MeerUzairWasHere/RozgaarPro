import { api } from "@/lib";
import { ListQuery } from "@/types";

export const locationApiClient = {
  getAddressFromLatLng: async (query: ListQuery): Promise<string> => {
    const { data } = await api.post<string>(
      "/location/address-from-coords",
      query,
    );
    return data;
  },
};
