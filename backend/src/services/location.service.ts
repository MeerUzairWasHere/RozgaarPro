import { Coordinates } from "../dto";
import { ILocationService } from "../interfaces";

export class LocationService implements ILocationService {
  private readonly USER_AGENT = "rozgaarpro/1.0 (contact@rozgaarpro.com)";
  private readonly NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

  async getAddressFromCoordinates({
    latitude,
    longitude,
  }: Coordinates): Promise<string> {
    try {
      const url = `${this.NOMINATIM_BASE_URL}/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;

      const response = await fetch(url, {
        headers: {
          "User-Agent": this.USER_AGENT,
        },
      });

      if (!response.ok) {
        throw new Error(`Nominatim API error: ${response.statusText}`);
      }

      const data = await response.json();
      const address = data.address;

      if (!address) {
        return `Unable to get location for lat: ${latitude}, lng: ${longitude}`;
      }

      // 🛣️ Street name (fallback chain)
      const street =
        address.road ||
        address.pedestrian ||
        address.residential ||
        address.footway;
      const area = address.neighbourhood || address.suburb || address.village;
      const city = address.city || address.town || address.county;
      const postcode = address.postcode;

      const formattedAddress = [street, area, city, postcode]
        .filter(Boolean)
        .join(", ");

      return formattedAddress;
    } catch (error) {
      console.error("Reverse geocoding error:", error);

      return `Unable to get location for lat: ${latitude}, lng: ${longitude}`;
    }
  }
}
