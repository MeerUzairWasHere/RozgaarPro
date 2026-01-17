import { create } from "zustand";
import * as Location from "expo-location";

type LocationPermissionState = {
  locationStatus: Location.PermissionStatus | null;
  setLocationStatus: (status: Location.PermissionStatus) => void;
  resetLocationStatus: () => void;
};

export const usePermissionStore = create<LocationPermissionState>((set) => ({
  locationStatus: null,
  setLocationStatus: (status) => set({ locationStatus: status }),
  resetLocationStatus: () => set({ locationStatus: null }),
}));
