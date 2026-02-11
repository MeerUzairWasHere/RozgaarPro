import { useLocationStore } from "@/store/useLocationStore";
import { MapPin } from "lucide-react-native";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export interface LocationHeaderProps {
  /** When true, header background is light (#F2F2F2) – use dark text/icon */
  lightBackground?: boolean;
}

export default function LocationHeader({ lightBackground = false }) {
  const { location, loading, getCurrentLocation } = useLocationStore();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={getCurrentLocation}
      disabled={loading}
      className="flex-row items-center gap-2"
    >
      <View
        className={
          lightBackground
            ? "p-2 bg-primary-300/50 rounded-full"
            : "p-2 bg-white/20 rounded-full"
        }
      >
        <MapPin size={18} color={!lightBackground ? "#86efac" : "#16a34a"} />
      </View>

      <View>
        <Text
          className={
            lightBackground
              ? "text-xs text-primary-600"
              : "text-xs text-white/80"
          }
        >
          Your Location
        </Text>

        <Text
          className={
            lightBackground
              ? "text-sm font-semibold text-primary-900"
              : "text-sm font-semibold text-white"
          }
        >
          {loading
            ? "Updating location..."
            : location || "Tap to enable location"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
