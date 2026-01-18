import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type LocationCoords = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
};

type LocationState = {
  location: LocationCoords;
  setLocation: (coords: LocationCoords) => void;
  resetLocation: () => void;
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      location: {
        latitude: 0,
        longitude: 0,
        accuracy: null,
      },

      setLocation: (coords) =>
        set({
          location: coords,
        }),

      resetLocation: () =>
        set({
          location: {
            latitude: 0,
            longitude: 0,
            accuracy: null,
          },
        }),
    }),
    {
      name: "location-storage",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);
