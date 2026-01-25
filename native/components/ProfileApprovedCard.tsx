import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { CircleCheckBig, CircleX } from "lucide-react-native";
import { useAuthStore } from "@/store";
import { USER_ROLE } from "@/types";

export default function ProfileApprovedCard() {
  const isProfileApproved = useAuthStore((s) => s.user?.profileApproved);

  const isFreelancer = useAuthStore(
    (s) => s.user?.role === USER_ROLE.FREELANCER,
  );

  if (!isFreelancer) return null;

  return (
    <View className="px-4 py-4">
      <Animated.View
        entering={FadeInUp.duration(500)}
        className="rounded-2xl p-4
bg-primary-900
           dark:bg-primary-800"
      >
        {/* Header */}
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full items-center justify-center bg-white/20">
            {!isProfileApproved ? (
              <CircleX size={22} color="white" />
            ) : (
              <CircleCheckBig size={22} color="white" />
            )}
          </View>

          <View>
            <Text className="font-semibold text-primary-50">
              Profile{" "}
              {!isProfileApproved ? "needs to be approved." : "Approved"}
            </Text>
            <Text className="text-sm opacity-80  text-primary-200">
              You're{!isProfileApproved && " not"} visible to customers
            </Text>
          </View>
        </View>

        {/* Footer Stat */}
        {isProfileApproved && (
          <View className="flex-row items-center justify-between rounded-xl px-4 py-2 bg-white/10 mt-3">
            <Text className="text-sm text-primary-100">
              Profile views today
            </Text>
            <Text className="text-lg font-bold text-primary-50">12</Text>
            {/* TODO: Add Profile Views per day.*/}
          </View>
        )}
      </Animated.View>
    </View>
  );
}
