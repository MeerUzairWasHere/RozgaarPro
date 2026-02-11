import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  title?: string;
  message?: string;
  buttonText?: string;
  onPress?: () => void;
};

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the data.",
  buttonText = "Try Again",
  onPress,
}: Props) {
  return (
    <View className="flex-1 items-center justify-center px-6 bg-primary dark:bg-primary-950">
      <View className="rounded-3xl p-8 items-center shadow-lg bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-800">
        {/* Icon */}
        <View className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full items-center justify-center mb-4">
          <Text className="text-3xl">⚠️</Text>
        </View>

        {/* Title */}
        <Text className="text-lg font-semibold text-primary-950 dark:text-primary-50 mb-2 text-center">
          {title}
        </Text>

        {/* Message */}
        <Text className="text-sm text-primary-600 dark:text-primary-400 text-center mb-6">
          {message}
        </Text>

        {/* Action button */}
        {onPress && (
          <TouchableOpacity
            onPress={onPress}
            className="px-8 py-3.5 bg-brand dark:bg-brand-500 rounded-full shadow-sm active:opacity-80"
          >
            <Text className="text-white font-semibold">{buttonText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
