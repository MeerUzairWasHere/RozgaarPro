import React from "react";
import { View, useColorScheme } from "react-native";
import { AppText as Text } from "./common/AppText";
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
  const isDark = useColorScheme() === "dark";

  const isFreelancer = useAuthStore(
    (s) => s.user?.role === USER_ROLE.FREELANCER,
  );

  if (!isFreelancer || !data) return null;

  const statusConfig = STATUS_CONFIG[data];
  if (!statusConfig) return null;

  const { title, subtitle, icon: Icon, showStats } = statusConfig;

  const isApproved = data === FREELANCER_STATUS.APPROVED;

  return (
    <View className="px-4 py-4">
      <Animated.View
        entering={FadeInUp.duration(500)}
        className={`rounded-2xl p-4 border shadow-lg ${
          isApproved
            ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900"
            : "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900"
        }`}
      >
        {/* Header */}
        <View className="flex-row items-center gap-3">
          <View
            className={`w-10 h-10 rounded-full items-center justify-center ${
              isApproved ? "bg-green-500/20" : "bg-amber-500/20"
            }`}
          >
            <Icon
              size={22}
              color={
                isApproved
                  ? isDark
                    ? "#86efac"
                    : "#16a34a"
                  : isDark
                    ? "#fcd34d"
                    : "#f59e0b"
              }
            />
          </View>

          <View className="flex-1">
            <Text
              className={`font-semibold ${isApproved ? "text-green-800 dark:text-green-200" : "text-amber-800 dark:text-amber-200"}`}
            >
              {title}
            </Text>
            <Text
              className={`text-sm ${isApproved ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}
            >
              {subtitle}
            </Text>
          </View>
        </View>

        {/* Footer */}
        {showStats && (
          <View
            className={`flex-row items-center justify-between rounded-xl px-4 py-2 mt-3 ${
              isApproved ? "bg-green-100/50 dark:bg-green-900/30" : "bg-amber-100/50 dark:bg-amber-900/30"
            }`}
          >
            <Text
              className={`text-sm ${isApproved ? "text-green-700 dark:text-green-300" : "text-amber-700 dark:text-amber-300"}`}
            >
              Profile views today
            </Text>
            <Text
              className={`text-lg font-bold ${isApproved ? "text-green-800 dark:text-green-200" : "text-amber-800 dark:text-amber-200"}`}
            >
              12
            </Text>
            {/* TODO: wire real analytics */}
          </View>
        )}
      </Animated.View>
    </View>
  );
}
