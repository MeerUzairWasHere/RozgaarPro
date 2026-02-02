// const EXPO_PUBLIC_GOOGLE_MAPS_API_KEY =
//   process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

// export async function getAddressFromLatLng(
//   latitude: number,
//   longitude: number,
// ): Promise<string> {
//   try {
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//     if (data.status === "OK" && data.results.length > 0) {
//       const components = data.results[0].address_components;
//       const get = (type: string) =>
//         components.find((c: any) => c.types.includes(type))?.long_name;

//       const route = get("route"); // Harwan Road
//       const sublocality = get("sublocality") || get("sublocality_level_1"); // Dara
//       const city = get("locality"); // Srinagar
//       const postalCode = get("postal_code"); // 191121

//       return [route, sublocality, city, postalCode].filter(Boolean).join(", ");
//     }

//     return "Unable to get location";
//   } catch (error) {
//     console.error("Google Geocoding error:", error);
//     return "Unable to get location";
//   }
// }

export async function getAddressFromLatLng(
  latitude: number,
  longitude: number,
): Promise<string> {
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
}

export const formatDistance = (distanceKm: number) => {
  if (!distanceKm || distanceKm <= 0) return "Nearby";

  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} m`;
  }

  return `${distanceKm.toFixed(1)} km`;
};

export const hasValidCoordinates = (coords?: {
  latitude?: number;
  longitude?: number;
}): boolean => {
  return (
    coords != null &&
    Number.isFinite(coords.latitude) &&
    Number.isFinite(coords.longitude)
  );
};
