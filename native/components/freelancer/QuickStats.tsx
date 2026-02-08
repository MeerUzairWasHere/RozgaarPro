import React from "react";
import { View, Text, useColorScheme } from "react-native";
import { Star, MapPin, TrendingUp } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { formatDistance } from "@/lib";

type Props = {
  rating: number;
  experience: number;
  distance: number;
};

export default function QuickStats({ rating, experience, distance }: Props) {
  const isDark = useColorScheme() === "dark";

  return (
    <Animated.View
      entering={FadeInDown.delay(200)}
      className="bg-white dark:bg-primary-900 rounded-3xl p-5 shadow-2xl mb-6 border border-primary-100 dark:border-primary-800"
    >
      <View className="flex-row justify-around">
        {/* Rating */}
        <View className="items-center">
          <View className="flex-row items-center gap-1 mb-1">
            <Star size={18} color="#FFA500" fill="#FFA500" />
            <Text className="text-2xl font-bold text-primary-950 dark:text-primary-50">
              {rating.toFixed(1)}
            </Text>
          </View>
          <Text className="text-xs font-medium text-primary-500 dark:text-primary-400">
            124 Reviews {/* TODO: Add these */}
          </Text>
        </View>

        <View className="w-px bg-primary-200 dark:bg-primary-800" />

        {/* Experience */}
        <View className="items-center">
          <View className="flex-row items-center gap-1 mb-1">
            <TrendingUp size={18} color={isDark ? "#a5b4fc" : "#6366f1"} />
            <Text className="text-2xl font-bold text-primary-950 dark:text-primary-50">
              {experience} Years
            </Text>
          </View>
          <Text className="text-xs font-medium text-primary-500 dark:text-primary-400">
            Experience
          </Text>
        </View>

        <View className="w-px bg-primary-200 dark:bg-primary-800" />

        {/* Distance */}
        <View className="items-center">
          <View className="flex-row items-center gap-1 mb-1">
            <MapPin size={18} color={isDark ? "#86efac" : "#16a34a"} />
            <Text className="text-2xl font-bold text-primary-950 dark:text-primary-50">
              {parseFloat(formatDistance(distance))}
            </Text>
          </View>
          <Text className="text-xs font-medium text-primary-500 dark:text-primary-400">
            km away
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
