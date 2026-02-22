import React from "react";
import { View, Pressable, useColorScheme } from "react-native";
import { AppText as Text } from "./common/AppText";
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
import { useTranslation } from "react-i18next";

type MenuItem = {
  icon: React.ComponentType<{ size: number; color: string }>;
  labelKey: string;
  route: Route;
};

const getMenuItems = (t: (key: string) => string): MenuItem[] => [
  { icon: User, labelKey: "edit_profile", route: ROUTES.EDIT_PROFILE },
  { icon: Settings, labelKey: "settings", route: ROUTES.SETTINGS },
  { icon: HelpCircle, labelKey: "help_support", route: ROUTES.HELP_SUPPORT },
];

export default function ProfileMenu() {
  const { t } = useTranslation();
  const menuItems = getMenuItems(t);
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
            key={item.labelKey}
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
                {t(item.labelKey)}
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
          <View className="w-10 h-10 rounded-xl bg-brand dark:bg-brand-500 flex items-center justify-center">
            <Star size={20} color="#FFF" />
          </View>

          <Text className="font-medium text-primary-950 dark:text-primary-50">
            {t("rate_us")}
          </Text>
        </View>

        <ChevronRight size={20} color={chevronColor} />
      </Pressable>
    </Animated.View>
  );
}
