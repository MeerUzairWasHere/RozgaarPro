import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { User, Shield, Phone, MapPin, User2 } from "lucide-react-native";
import clsx from "clsx";
import { useAuthStore, useLocationStore } from "@/store";
import { USER_ROLE } from "@/types";

export default function ProfileCard() {
  const { user } = useAuthStore();
  const { location } = useLocationStore();

  return (
    <Animated.View
      entering={FadeInUp.duration(600)}
      className={clsx(
        "rounded-3xl p-6 m-6 border",
        "bg-white border-primary-200",
        "dark:bg-primary-900 dark:border-primary-700",
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
        <View className="w-20 h-20 rounded-2xl flex items-center justify-center bg-primary-300 dark:bg-primary-700">
          <User size={40} color="#FFF" />
        </View>

        {/* User Info */}
        <View className="flex-1">
          <Text className="text-xl font-bold mb-1 text-primary-950 dark:text-primary-50">
            {user?.name}
          </Text>

          <View className="flex-row items-center gap-2">
            {/* Verified Badge */}
            <View className="flex-row items-center gap-1 px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-800">
              <Shield size={12} color="#666" />
              <Text className="text-xs font-medium text-primary-700 dark:text-primary-200">
                {user?.isVerified && "Verified"}
              </Text>
            </View>

            {/* Role Badge */}
            <Text className="text-xs font-medium text-primary-700 dark:text-primary-200">
              {user?.role === USER_ROLE.FREELANCER && "Primary Skill"}
              {/* TODO: Add Skill here */}
            </Text>
          </View>
        </View>
      </View>

      {/* Contact Info */}
      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-1.5">
          <Phone size={14} color="#666" />
          <Text className="text-sm text-primary-600 dark:text-primary-400">
            +91-{user?.phone}
          </Text>
        </View>

        <View className="flex-row items-center gap-1.5">
          <MapPin size={14} color="#666" />
          <Text className="text-sm text-primary-600 dark:text-primary-400">
            {location}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
