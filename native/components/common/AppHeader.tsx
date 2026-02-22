import { Bell } from "lucide-react-native";
import React from "react";
import { View, TouchableOpacity, useColorScheme } from "react-native";
import { Text } from "react-native";
import BackButton from "./BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationHeader from "./LocationHeader";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showLocation?: boolean;
  showNotification?: boolean;
}

export default function AppHeader({
  title,
  showBack = false,
  showLocation = false,
  showNotification = false,
}: HeaderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <>
      <SafeAreaView
        className="border-b border-primary-200 dark:border-primary-800"
        style={{ backgroundColor: isDark ? "#121212" : "#F2F2F2" }}
        edges={["top"]}
      >
        <View className="flex-row items-center justify-between px-4 py-3">
          <View className="flex-row items-center gap-3">
            {showBack && <BackButton />}
            {showLocation && <LocationHeader lightBackground={!isDark} />}
            {title && (
              <Text
                className={
                  isDark
                    ? "text-lg font-semibold text-white"
                    : "text-lg font-semibold text-primary-900"
                }
              >
                {title}
              </Text>
            )}
          </View>

          {showNotification && (
            <TouchableOpacity
              className={
                isDark
                  ? "p-2 rounded-full relative bg-white/20"
                  : "p-2 rounded-full relative bg-primary-200/80"
              }
            >
              <Bell size={24} color={isDark ? "#FFFFFF" : "#1A1A1A"} />
              <View
                className={
                  isDark
                    ? "absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-accent-red rounded-full border-2 border-[#121212]"
                    : "absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-accent-red rounded-full border-2 border-[#F2F2F2]"
                }
              />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
