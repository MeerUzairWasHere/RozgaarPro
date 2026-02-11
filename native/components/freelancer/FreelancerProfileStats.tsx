import React from "react";
import { View, Text, useColorScheme } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Briefcase, Star, IndianRupee } from "lucide-react-native";
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
      <StatItem value="24" label="Jobs Done" icon={Briefcase} accent="indigo" />
      <StatItem value="4.8" label="Rating" icon={Star} accent="amber" />
      <StatItem value="₹45K" label="Earned" icon={IndianRupee} accent="green" />
    </Animated.View>
  );
}

type StatItemProps = {
  value: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  accent: "indigo" | "amber" | "green";
};

function StatItem({ value, label, icon: Icon, accent }: StatItemProps) {
  const isDark = useColorScheme() === "dark";
  const colors = {
    indigo: isDark ? "#B3A5F5" : "#6B4EEA",
    amber: isDark ? "#fcd34d" : "#f59e0b",
    green: isDark ? "#86efac" : "#16a34a",
  };

  return (
    <View
      className={clsx(
        "flex-1 rounded-2xl p-4 border shadow-sm",
        "bg-white border-primary-100",
        "dark:bg-primary-900 dark:border-primary-800",
        "items-center",
      )}
    >
      <View className="mb-2">
        <Icon size={20} color={colors[accent]} />
      </View>
      <Text className="text-2xl text-primary-950 dark:text-primary-50 font-bold">
        {value}
      </Text>
      <Text className="text-sm text-primary-600 dark:text-primary-400 mt-1 text-center">
        {label}
      </Text>
    </View>
  );
}
