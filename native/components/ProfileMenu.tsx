import React from "react";
import { View, Text, Pressable } from "react-native";
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
  // { icon: Star, label: "Rate Us", route: ROUTES.RATE_US },
];

export default function ProfileMenu() {
  return (
    <Animated.View
      entering={FadeInUp.duration(400).delay(200)}
      className="flex flex-col gap-4 px-6"
    >
      {menuItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <Pressable
            key={item.label}
            onPress={() => router.push(item.route)}
            className={clsx(
              "w-full flex-row  justify-between p-4   flex-1 rounded-2xl px-6 border bg-primary border-primary-200 dark:bg-primary-900 dark:border-primary-700 items-center",
            )}
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                <Icon size={20} color="#FFF" />
              </View>

              <Text className="font-medium dark:text-primary ">
                {item.label}
              </Text>
            </View>

            <ChevronRight size={20} color="#666" />
          </Pressable>
        );
      })}
      <View
        className={clsx(
          "w-full flex-row  justify-between p-4   flex-1 rounded-2xl px-6 border bg-primary border-primary-200 dark:bg-primary-900 dark:border-primary-700 items-center",
        )}
      >
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
            <Star size={20} color="#FFF" />
          </View>

          <Text className="font-medium dark:text-primary">Rate Us</Text>
        </View>

        <ChevronRight size={20} color="#666" />
      </View>
    </Animated.View>
  );
}
