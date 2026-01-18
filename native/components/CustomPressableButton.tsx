import { Text, Pressable } from "react-native";
import React from "react";
import cn from "clsx";

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  className?: string;
  disabled?: boolean;
}

const CustomPressableButton = ({
  onPress,
  title = "Click Me",
  className,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={className}
      style={({ pressed }) => [pressed ? { opacity: 0.8 } : null]}
    >
      <Text className={cn("primary-text font-medium ", className)}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomPressableButton;
