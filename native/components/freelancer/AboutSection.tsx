import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  description: string | null;
  profession: string;
  experience: number;
};

export default function AboutSection({
  description,
  profession,
  experience,
}: Props) {
  const fallback = `Professional ${profession.toLowerCase()} with ${experience} years of experience. Specialized in high-quality work with attention to detail.`;

  return (
    <Animated.View entering={FadeInDown.delay(400)} className="mb-6">
      <View className="flex-row items-center gap-2 mb-3">
        <View className="w-1 h-6 bg-primary-600 dark:bg-primary-400 rounded-full" />
        <Text className="text-xl font-bold text-primary-950 dark:text-primary-50">
          About
        </Text>
      </View>

      <View className="bg-white dark:bg-primary-900 rounded-2xl p-5 border border-primary-100 dark:border-primary-800">
        <Text className="text-primary-700 dark:text-primary-300 leading-7 text-base ">
          {description || fallback}
        </Text>
      </View>
    </Animated.View>
  );
}
