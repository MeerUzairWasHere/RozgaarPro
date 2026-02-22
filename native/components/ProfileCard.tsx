import React from "react";
import clsx from "clsx";
import Animated, { FadeInUp } from "react-native-reanimated";
import { View, useColorScheme } from "react-native";
import { Text } from "react-native";
import { User, Shield, Phone, MapPin } from "lucide-react-native";
import { useAuthStore, useLocationStore } from "@/store";
import { USER_ROLE } from "@/types";

export default function ProfileCard() {
  const { user } = useAuthStore();
  const { location } = useLocationStore();
  const isDark = useColorScheme() === "dark";

  return (
    <Animated.View
      entering={FadeInUp.duration(600)}
      className={clsx(
        "rounded-3xl p-6 m-6 border shadow-lg",
        "bg-white border-primary-100",
        "dark:bg-primary-900 dark:border-primary-800",
      )}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center gap-4 mb-4">
        {/* Avatar */}
        <View className="w-20 h-20 rounded-2xl flex items-center justify-center bg-brand dark:bg-brand-500">
          <User size={40} color="#FFF" />
        </View>

        {/* User Info */}
        <View className="flex-1">
          <Text className="text-xl font-bold mb-1 text-primary-950 dark:text-primary-50">
            {user?.name}
          </Text>

          <View className="flex-row items-center gap-2">
            {/* Verified Badge */}
            {user?.isVerified && (
              <View className="flex-row items-center gap-1 px-2 py-1 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
                <Shield size={12} color={isDark ? "#86efac" : "#16a34a"} />
                <Text className="text-xs font-medium text-green-700 dark:text-green-400">
                  Verified
                </Text>
              </View>
            )}

            {/* Role Badge */}
            <Text className="text-xs font-medium text-primary-700 dark:text-primary-200">
              {user?.role === USER_ROLE.FREELANCER && "Primary Skill"}
              {/* TODO: Add Skill here */}
            </Text>
          </View>
        </View>
      </View>

      {/* Contact Info */}
      <View className="flex-row items-center gap-4 pt-2 border-t border-primary-100 dark:border-primary-800">
        <View className="flex-row items-center gap-1.5">
          <Phone size={14} color={isDark ? "#93c5fd" : "#3b82f6"} />
          <Text className="text-sm text-primary-600 dark:text-primary-400">
            +91-{user?.phone}
          </Text>
        </View>

        <View className="flex-row items-center gap-1.5">
          <MapPin size={14} color={isDark ? "#86efac" : "#16a34a"} />
          <Text className="text-sm text-primary-600 dark:text-primary-400">
            {location}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
