import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import clsx from "clsx";
import { useAuthStore } from "@/store";
import { USER_ROLE } from "@/types";

export default function FreelancerProfileStats() {
  const { user } = useAuthStore();

  if (user?.role === USER_ROLE.USER) return;

  return (
    <Animated.View
      entering={FadeInUp.duration(400).delay(100)}
      className="flex-row gap-3 mb-6 px-6"
    >
      <StatItem value="24" label="Jobs Done" valueClassName="text-primary" />
      <StatItem value="4.8" label="Rating" valueClassName="text-primary" />
      <StatItem value="₹45K" label="Earned" valueClassName="text-primary" />
    </Animated.View>
  );
}

type StatItemProps = {
  value: string;
  label: string;
  valueClassName?: string;
};

function StatItem({ value, label, valueClassName }: StatItemProps) {
  return (
    <View
      className={clsx(
        "flex-1 rounded-2xl p-4 border",
        "bg-white border-primary-200",
        "dark:bg-primary-900 dark:border-primary-700",
        "items-center ",
      )}
    >
      <Text
        className={clsx(
          "text-2xl text-primary-950 dark:text-primary-50 font-bold",
          valueClassName,
        )}
      >
        {value}
      </Text>
      <Text className="text-sm primary-text mt-1 text-center">{label}</Text>
    </View>
  );
}
