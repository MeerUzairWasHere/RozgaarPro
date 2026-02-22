import { useLocationStore } from "@/store/useLocationStore";
import { MapPin } from "lucide-react-native";
import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { AppText as Text } from "./AppText";
import { useTranslation } from "react-i18next";

export interface LocationHeaderProps {
  /** When true, header background is light (#F2F2F2) – use dark text/icon */
  lightBackground?: boolean;
}

export default function LocationHeader({ lightBackground = false }) {
  const { t } = useTranslation();
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
          {t("your_location")}
        </Text>

        <Text
          className={
            lightBackground
              ? "text-sm font-semibold text-primary-900"
              : "text-sm font-semibold text-white"
          }
        >
          {loading
            ? t("updating_location")
            : location || t("tap_to_enable_location")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
