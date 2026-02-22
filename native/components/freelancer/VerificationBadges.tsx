import React from "react";
import { View, useColorScheme } from "react-native";
import { AppText as Text } from "@/components";
import { Shield, Award, Phone } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  status: string;
  rating: number;
};

export default function VerificationBadges({ status, rating }: Props) {
  const isDark = useColorScheme() === "dark";

  return (
    <Animated.View entering={FadeInDown.delay(300)} className="mb-6">
      <View className="flex-row flex-wrap gap-2">
        {status === "APPROVED" && (
          <View className="flex-row items-center gap-2 px-4 py-2.5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-full">
            <Shield size={14} color={isDark ? "#86efac" : "#16a34a"} />
            <Text className="text-xs font-semibold text-green-700 dark:text-green-400">
              Verified
            </Text>
          </View>
        )}

        {rating >= 4.5 && (
          <View className="flex-row items-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-full">
            <Award size={14} color={isDark ? "#fcd34d" : "#f59e0b"} />
            <Text className="text-xs font-semibold text-amber-700 dark:text-amber-400">
              Top Rated
            </Text>
          </View>
        )}

        <View className="flex-row items-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-full">
          <Phone size={14} color={isDark ? "#93c5fd" : "#3b82f6"} />
          <Text className="text-xs font-semibold text-blue-700 dark:text-blue-400">
            Phone Verified
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
