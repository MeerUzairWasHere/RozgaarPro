import * as Location from "expo-location";
import { Toast } from "toastify-react-native";
import { usePermissionStore } from "@/store";

export type LocationCoords = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
};

export async function requestLocationPermission(): Promise<LocationCoords | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      usePermissionStore.getState().setLocationStatus(status);
      Toast.error("Location permission is required");
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const coords: LocationCoords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
    };

    usePermissionStore.getState().setLocationStatus(status);

    return coords;
  } catch (error) {
    console.error("Location error:", error);
    Toast.error("Failed to get location");
    usePermissionStore.getState().resetLocationStatus();
    return null;
  }
}
