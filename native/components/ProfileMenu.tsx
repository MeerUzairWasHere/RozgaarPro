import React from "react";
import { View, Text, Pressable, useColorScheme } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Route, router } from "expo-router";
import {
  User,
  Settings,
  HelpCircle,
  Star,
  ChevronRight,
} from "lucide-react-native";
import { ROUTES } from "@/constants";
import clsx from "clsx";

type MenuItem = {
  icon: any;
  label: string;
  route: Route;
};

const menuItems: MenuItem[] = [
  { icon: User, label: "Edit Profile", route: ROUTES.EDIT_PROFILE },
  { icon: Settings, label: "Settings", route: ROUTES.SETTINGS },
  { icon: HelpCircle, label: "Help & Support", route: ROUTES.HELP_SUPPORT },
];

export default function ProfileMenu() {
  const isDark = useColorScheme() === "dark";
  const chevronColor = isDark ? "#B3A5F5" : "#6B4EEA";

  return (
    <Animated.View
      entering={FadeInUp.duration(400).delay(200)}
      className="flex flex-col gap-4 px-6"
    >
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <Pressable
            key={item.label}
            onPress={() => router.push(item.route)}
            className={clsx(
              "w-full flex-row justify-between p-4 rounded-2xl border items-center shadow-sm",
              "bg-white border-primary-100 dark:bg-primary-900 dark:border-primary-800",
            )}
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-xl bg-brand dark:bg-brand-500 flex items-center justify-center">
                <Icon size={20} color="#FFF" />
              </View>

              <Text className="font-medium text-primary-950 dark:text-primary-50">
                {item.label}
              </Text>
            </View>

            <ChevronRight size={20} color={chevronColor} />
          </Pressable>
        );
      })}
      <Pressable
        className={clsx(
          "w-full flex-row justify-between p-4 rounded-2xl border items-center shadow-sm",
          "bg-white border-primary-100 dark:bg-primary-900 dark:border-primary-800",
        )}
      >
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-xl bg-amber-500 dark:bg-amber-400 flex items-center justify-center">
            <Star size={20} color="#FFF" />
          </View>

          <Text className="font-medium text-primary-950 dark:text-primary-50">Rate Us</Text>
        </View>

        <ChevronRight size={20} color={chevronColor} />
      </Pressable>
    </Animated.View>
  );
}
