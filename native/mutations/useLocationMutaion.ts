import { QUERY_KEYS } from "@/constants";
import { Coordinates } from "@/types";
import { locationApiClient } from "@/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { hasValidCoordinates } from "@/lib";

export const useGetAddressFromCoordinates = (
  coordinates: Coordinates,
  options?: {
    enabled?: boolean;
  },
): UseQueryResult<string> => {
  const hasValidCoords = hasValidCoordinates(coordinates);

  // Combine both conditions: coordinates must be valid AND external enabled flag
  const enabled = hasValidCoords && (options?.enabled ?? true);

  return useQuery({
    queryKey: QUERY_KEYS.LOCATIONS.listByLocation(
      coordinates?.latitude ?? 0,
      coordinates?.longitude ?? 0,
    ),
    queryFn: () => locationApiClient.getAddressFromLatLng(coordinates),
    enabled,
  });
};
