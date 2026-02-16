import { getJobRequestRoute } from "@/constants";
import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  freelancerId: string;
};

export default function ActionButtons({ freelancerId }: Props) {
  return (
    <View className="flex-row gap-3">
      <TouchableOpacity
        onPress={() => router.push(getJobRequestRoute(freelancerId))}
        className="flex-1 bg-brand-600 dark:bg-brand-500 rounded-2xl py-4 items-center shadow-lg"
      >
        <View className="flex-row items-center gap-2">
          <Text className="text-white font-bold text-base">Hire Now</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
