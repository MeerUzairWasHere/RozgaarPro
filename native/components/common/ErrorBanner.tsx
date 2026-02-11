import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AlertCircle, X } from "lucide-react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export default function ErrorBanner({
  message,
  onDismiss,
  className = "",
}: ErrorBannerProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      exiting={FadeOutUp.duration(200)}
      className={`flex-row items-center gap-3 p-4 rounded-2xl bg-accent-red/10 dark:bg-accent-red/20 border border-accent-red/30 dark:border-accent-red/40 ${className}`}
    >
      <AlertCircle size={20} color="#dc2626" />
      <View className="flex-1">
        <Text className="text-sm font-medium text-accent-red dark:text-accent-redLight">
          {message}
        </Text>
      </View>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} className="p-1">
          <X size={18} color="#dc2626" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}
