import { Calendar, Star } from "lucide-react-native";
import React from "react";
import { View, Text, useColorScheme } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ReviewsSection() {
  const isDark = useColorScheme() === "dark";
  return (
    <Animated.View entering={FadeInDown.delay(600)} className="mb-6">
      <View className="flex-row items-center gap-2 mb-3">
        <View className="w-1 h-6 bg-primary-600 dark:bg-primary-400 rounded-full" />
        <Text className="text-xl font-bold text-primary-950 dark:text-primary-50">
          Recent Reviews
        </Text>
      </View>

      <View className="bg-white dark:bg-primary-900 rounded-2xl p-5 border border-primary-100 dark:border-primary-800">
        {/* Review Header */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-2">
            <View className="flex-row gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} color="#FFA500" fill="#FFA500" />
              ))}
            </View>
            <Text className="text-xs font-semibold text-primary-500 dark:text-primary-400">
              5.0
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Calendar size={12} color={isDark ? "#9ca3af" : "#6b7280"} />
            <Text className="text-xs text-primary-500 dark:text-primary-400">
              2 days ago
            </Text>
          </View>
        </View>

        {/* Review Text */}
        <Text className="text-primary-700 dark:text-primary-300 leading-6 mb-4">
          "Excellent work! Very professional and completed the job on time.
          Would definitely hire again. Great attention to detail and
          communication throughout."
        </Text>

        {/* Reviewer */}
        <View className="flex-row items-center gap-3 pt-4 border-t border-primary-100 dark:border-primary-800">
          <View className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-full items-center justify-center">
            <Text className="text-sm font-bold text-primary-600 dark:text-primary-300">
              SC
            </Text>
          </View>
          <View>
            <Text className="font-semibold text-primary-950 dark:text-primary-50 text-sm">
              Satisfied Customer
            </Text>
            <Text className="text-xs text-primary-500 dark:text-primary-400">
              Verified Client
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
