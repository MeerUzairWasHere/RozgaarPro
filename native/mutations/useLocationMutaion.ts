import { QUERY_KEYS } from "@/constants";
import { ListQuery } from "@/types";
import { locationApiClient } from "@/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { hasValidCoordinates } from "@/lib";

export const useGetAddressFromCoordinates = (
  query: ListQuery,
  options?: {
    enabled?: boolean;
  },
): UseQueryResult<string> => {
  const hasValidCoords = hasValidCoordinates(query?.location);
  const enabled = hasValidCoords && (options?.enabled ?? true);

  return useQuery({
    queryKey: QUERY_KEYS.LOCATIONS.listQuery(query),
    queryFn: () => locationApiClient.getAddressFromLatLng(query),
    enabled,
  });
};
