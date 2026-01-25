import { Bell } from "lucide-react-native";
import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import BackButton from "./BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationHeader from "./LocationHeader";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showLocation?: boolean;
  showNotification?: boolean;
}

export default function Header({
  title,
  showBack = false,
  showLocation = false,
  showNotification = false,
}: HeaderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView className="bg-white dark:bg-black" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-primary-200 dark:border-primary-800">
        <View className="flex-row items-center gap-3">
          {showBack && <BackButton />}
          {showLocation && <LocationHeader />}
          {title && (
            <Text className="text-lg font-semibold text-primary-900 dark:text-primary-100">
              {title}
            </Text>
          )}
        </View>

        {showNotification && (
          <TouchableOpacity className="p-2 rounded-full relative">
            <Bell size={24} color={isDark ? "#F2F2F2" : "#121212"} />
            <View className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-primary-950" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
