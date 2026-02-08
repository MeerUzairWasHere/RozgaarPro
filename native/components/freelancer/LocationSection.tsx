import React from "react";
import { View, Text, useColorScheme } from "react-native";
import { MapPin } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { formatDistance } from "@/lib";

type Props = {
  location?: string;
  distance: number;
};

export default function LocationSection({ location, distance }: Props) {
  const isDark = useColorScheme() === "dark";

  return (
    <Animated.View entering={FadeInDown.delay(500)} className="mb-6">
      <View className="flex-row items-center gap-2 mb-3">
        <View className="w-1 h-6 bg-primary-600 dark:bg-primary-400 rounded-full" />
        <Text className="text-xl font-bold text-primary-950 dark:text-primary-50">
          Location
        </Text>
      </View>

      <View className="bg-white dark:bg-primary-900 rounded-2xl p-5 border border-primary-100 dark:border-primary-800">
        <View className="flex-row items-start gap-4">
          <View className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-2xl items-center justify-center">
            <MapPin size={20} color={isDark ? "#a5b4fc" : "#6366f1"} />
          </View>

          <View className="flex-1">
            <Text className="font-semibold text-primary-950 dark:text-primary-50 text-base mb-1">
              {location || "Location not available"}
            </Text>
            <Text className="text-sm text-primary-600 dark:text-primary-400">
              Approximately {formatDistance(distance)} from your location
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
