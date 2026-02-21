import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ColorSchemePreference = "light" | "dark";

type ThemeState = {
  colorScheme: ColorSchemePreference;
  setColorScheme: (scheme: ColorSchemePreference) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorScheme: "light",
      setColorScheme: (colorScheme) => set({ colorScheme }),
    }),
    {
      name: "theme-storage",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) =>
          AsyncStorage.setItem(name, JSON.stringify(value)),
        removeItem: async (name) => AsyncStorage.removeItem(name),
      },
    },
  ),
);
