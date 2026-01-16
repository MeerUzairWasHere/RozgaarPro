import { Text, Pressable } from "react-native";
import React from "react";
import cn from "clsx";

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  className?: string;
}

const CustomPressableButton = ({
  onPress,
  title = "Click Me",
  className,
}: CustomButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
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
