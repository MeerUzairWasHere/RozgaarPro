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
      <Text className="text-lg font-semibold text-primary-900 dark:text-primary-50">
        {title}
      </Text>

      {onActionPress && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
          <Text className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
