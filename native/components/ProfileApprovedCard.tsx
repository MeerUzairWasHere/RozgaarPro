import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { CircleCheckBig, CircleX } from "lucide-react-native";
import { useAuthStore } from "@/store";
import { FREELANCER_STATUS, USER_ROLE } from "@/types";
import { useGetFreelancerStatus } from "@/mutations";

/* ---------------- STATUS CONFIG ---------------- */

const STATUS_CONFIG = {
  [FREELANCER_STATUS.APPROVED]: {
    title: "Profile approved",
    subtitle: "You're visible to customers",
    icon: CircleCheckBig,
    showStats: true,
  },
  [FREELANCER_STATUS.PENDING]: {
    title: "Profile under review",
    subtitle: "We're verifying your details",
    icon: CircleX,
    showStats: false,
  },
  [FREELANCER_STATUS.REJECTED]: {
    title: "Profile rejected",
    subtitle: "Update your profile to get approved",
    icon: CircleX,
    showStats: false,
  },
} as const;

/* ---------------- COMPONENT ---------------- */

export default function ProfileApprovedCard() {
  const { user } = useAuthStore();
  const { data } = useGetFreelancerStatus(user?.freelancerId ?? "");

  const isFreelancer = useAuthStore(
    (s) => s.user?.role === USER_ROLE.FREELANCER,
  );

  if (!isFreelancer || !data) return null;

  const statusConfig = STATUS_CONFIG[data];
  if (!statusConfig) return null;

  const { title, subtitle, icon: Icon, showStats } = statusConfig;

  return (
    <View className="px-4 py-4">
      <Animated.View
        entering={FadeInUp.duration(500)}
        className="rounded-2xl p-4 bg-primary-900 dark:bg-primary-800"
      >
        {/* Header */}
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full items-center justify-center bg-white/20">
            <Icon size={22} color="white" />
          </View>

          <View className="flex-1">
            <Text className="font-semibold text-primary-50">{title}</Text>
            <Text className="text-sm opacity-80 text-primary-200">
              {subtitle}
            </Text>
          </View>
        </View>

        {/* Footer */}
        {showStats && (
          <View className="flex-row items-center justify-between rounded-xl px-4 py-2 bg-white/10 mt-3">
            <Text className="text-sm text-primary-100">
              Profile views today
            </Text>
            <Text className="text-lg font-bold text-primary-50">12</Text>
            {/* TODO: wire real analytics */}
          </View>
        )}
      </Animated.View>
    </View>
  );
}
