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
          "w-full h-16 rounded-3xl border flex-row items-center justify-center mb-32 shadow-card",
          // destructive styling with good contrast in both modes
          "bg-accent-red/5 dark:bg-accent-red/10",
          "border-accent-red/30 dark:border-accent-redLight/40",
          logoutMutation.isPending && "opacity-60",
        )}
        style={({ pressed }) => [
          pressed ? { transform: [{ scale: 0.98 }], opacity: 0.9 } : null,
        ]}
      >
        {logoutMutation.isPending ? (
          <ActivityIndicator color="#dc2626" />
        ) : (
          <View className="flex-row gap-2 items-center justify-center">
            <LogOut size={20} color="#dc2626" />
            <Text className="font-semibold text-accent-red dark:text-accent-redLight text-base">
              Logout
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}
