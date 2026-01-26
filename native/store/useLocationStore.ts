import { getAddressFromLatLng } from "@/lib/location";
import * as Location from "expo-location";
import { create } from "zustand";

type LocationCoords = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
};

type LocationState = {
  // State
  location: string | null;
  coordinates: LocationCoords;
  loading: boolean;
  error: string | null;
  permissionGranted: boolean;

  // Actions
  getCurrentLocation: () => Promise<void>;
  setLocation: (coords: LocationCoords) => Promise<void>;
  setLocationText: (text: string) => void;
  resetLocation: () => void;
};

export const useLocationStore = create<LocationState>()((set, get) => ({
  // Initial state
  location: null,
  coordinates: {
    latitude: 0,
    longitude: 0,
    accuracy: null,
  },
  loading: false,
  error: null,
  permissionGranted: false,

  // Get current location with reverse geocoding
  getCurrentLocation: async () => {
    try {
      set({ loading: true, error: null });
      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        set({
          error: "Permission to access location was denied",
          loading: false,
        });
        return;
      }

      // Get current position
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      const { latitude, longitude, accuracy } = position.coords;
      // Convert to address text
      const location = await getAddressFromLatLng(latitude, longitude);
      set({
        coordinates: { latitude, longitude, accuracy },
        location,
        loading: false,
        error: null,
        permissionGranted: true,
      });
    } catch (error) {
      console.error("Location error:", error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to get location",
        loading: false,
      });
    }
  },

  // Set location with coordinates and auto-convert to text
  setLocation: async (coords: LocationCoords) => {
    try {
      set({ loading: true, coordinates: coords });

      // Convert coordinates to address text
      const location = await getAddressFromLatLng(
        coords.latitude,
        coords.longitude,
      );

      set({
        location,
        loading: false,
      });
    } catch (error) {
      console.error("Geocoding error:", error);
      set({
        location: null,
        loading: false,
      });
    }
  },

  // Set location text directly (without geocoding)
  setLocationText: (text: string) => set({ location: text }),

  // Clear location data
  resetLocation: () =>
    set({
      location: null,
      coordinates: {
        latitude: 0,
        longitude: 0,
        accuracy: null,
      },
      error: null,
      permissionGranted: false,
      loading: false,
    }),
}));
