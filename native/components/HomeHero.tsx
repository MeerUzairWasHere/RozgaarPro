import React from "react";
import { View, Text, useColorScheme } from "react-native";
import { Zap } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const BRAND_HERO = { light: "#6B4EEA", dark: "#5A3DD6" };

export default function HomeHero() {
  const isDark = useColorScheme() === "dark";
  const brandColor = isDark ? BRAND_HERO.dark : BRAND_HERO.light;

  return (
    <Animated.View
      entering={FadeInDown.duration(500)}
      className="rounded-3xl overflow-hidden mb-6 p-4"
      style={{
        backgroundColor: brandColor,
        shadowColor: brandColor,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-1">
            <Zap size={22} color="#FFF" fill="#FFF" strokeWidth={2.5} />
            <Text className="text-white/90 text-sm font-semibold uppercase tracking-wide">
              Quick Help
            </Text>
          </View>
          <Text className="text-2xl font-bold text-white leading-tight">
            Help in minutes,{"\n"}not hours
          </Text>
          <Text className="text-white/85 text-sm mt-2">
            Skilled pros near you • Verified • Ready now
          </Text>
        </View>
        <View
          className="w-20 h-20 rounded-2xl items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          <Zap size={40} color="#FFF" fill="#FFF" strokeWidth={2} />
        </View>
      </View>
    </Animated.View>
  );
}
