import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { Phone } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ActionButtons() {
  const isDark = useColorScheme() === "dark";

  return (
    <Animated.View entering={FadeInDown.delay(700)} className="mb-8">
      <View className="flex-row gap-3">
        <TouchableOpacity className="flex-1 bg-brand-600 dark:bg-brand-500 rounded-2xl py-4 items-center shadow-lg">
          <View className="flex-row items-center gap-2">
            <Phone size={20} color="#fff" />
            <Text className="text-white font-bold text-base">Contact</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
