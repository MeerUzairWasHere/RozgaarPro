import { Coordinates } from "@/types";

export const locationApiClient = {
  getAddressFromLatLng: async ({
    latitude,
    longitude,
  }: Coordinates): Promise<string> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;

      const response = await fetch(url, {
        headers: {
          "User-Agent": "rozgaarpro/1.0 (contact@rozgaarpro.com)",
        },
      });

      const data = await response.json();
      const address = data.address;

      if (!address) return "Unable to get location";

      // 🛣️ Street name (fallback chain)
      const street =
        address.road ||
        address.pedestrian ||
        address.residential ||
        address.footway;
      const area = address.neighbourhood || address.suburb || address.village;
      const city = address.city || address.town || address.county;
      const postcode = address.postcode;

      return [street, area, city, postcode].filter(Boolean).join(", ");
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return "Unable to get location";
    }
  },
};
