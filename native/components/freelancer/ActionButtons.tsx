import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { Phone, Calendar } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ActionButtons() {
  const isDark = useColorScheme() === "dark";

  return (
    <Animated.View entering={FadeInDown.delay(700)} className="mb-32">
      <View className="flex-row gap-3">
        <TouchableOpacity className="flex-1 bg-primary-600 dark:bg-primary-500 rounded-2xl py-4 items-center shadow-lg">
          <View className="flex-row items-center gap-2">
            <Phone size={20} color="#fff" />
            <Text className="text-white font-bold text-base">Contact</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-white dark:bg-primary-900 border-2 border-primary-600 dark:border-primary-500 rounded-2xl py-4 items-center">
          <View className="flex-row items-center gap-2">
            <Calendar size={20} color={isDark ? "#a5b4fc" : "#6366f1"} />
            <Text className="text-primary-600 dark:text-primary-400 font-bold text-base">
              Book Now
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
