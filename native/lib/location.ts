const EXPO_PUBLIC_GOOGLE_MAPS_API_KEY =
  process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function getGoogleAddress(
  latitude: number,
  longitude: number,
): Promise<string> {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.status === "OK" && data.results.length > 0) {
      const components = data.results[0].address_components;
      const get = (type: string) =>
        components.find((c: any) => c.types.includes(type))?.long_name;

      const route = get("route"); // Harwan Road
      const sublocality = get("sublocality") || get("sublocality_level_1"); // Dara
      const city = get("locality"); // Srinagar
      const postalCode = get("postal_code"); // 191121

      return [route, sublocality, city, postalCode].filter(Boolean).join(", ");
    }

    return "Unable to get location";
  } catch (error) {
    console.error("Google Geocoding error:", error);
    return "Unable to get location";
  }
}
