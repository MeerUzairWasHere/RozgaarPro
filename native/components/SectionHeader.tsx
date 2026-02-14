import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

const SectionHeader = ({
  title,
  actionLabel = "See all",
  onActionPress,
}: SectionHeaderProps) => {
  return (
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-row items-center gap-2">
        <View className="w-1 h-5 bg-brand dark:bg-brand-400 rounded-full" />
        <Text className="text-lg font-semibold text-primary-900 dark:text-primary-50">
          {title}
        </Text>
      </View>

      {onActionPress && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
          <Text className="text-md font-medium text-brand dark:text-brand-300">
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
