import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { LogOut } from "lucide-react-native";
import clsx from "clsx";
import { useLogout } from "@/mutations";

export default function LogoutButton() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Animated.View
      entering={FadeInUp.duration(400).delay(300)}
      className="mt-6 px-6"
    >
      <Pressable
        onPress={handleLogout}
        disabled={logoutMutation.isPending}
        className={clsx(
          "w-full h-16 rounded-3xl border-2 bg-primary-50 dark:bg-primary-900 flex-row items-center justify-center mb-32",
          "border-accent-red dark:border-accent-redLight",
          "active:opacity-90",
          logoutMutation.isPending && "opacity-60",
        )}
      >
        {logoutMutation.isPending ? (
          <ActivityIndicator />
        ) : (
          <View className="flex-row gap-2 items-center justify-center">
            <LogOut size={20} color="#ef4444" />
            <Text className="font-semibold text-accent-red text-base">
              Logout
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}
