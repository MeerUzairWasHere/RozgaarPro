import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { Text } from "react-native";
import React from "react";
import cn from "clsx";

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  textClassName?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const CustomTouchableOpacityButton = ({
  onPress,
  title = "Click Me",
  className,
  textClassName,
  leftIcon,
  isLoading = false,
  disabled = false,
}: CustomButtonProps) => {
  const colourScheme = useColorScheme();

  return (
    <TouchableOpacity
      className={cn(
        "h-14 rounded-2xl bg-brand dark:bg-brand-400 items-center justify-center overflow-hidden shadow-card-lg",
        disabled && "bg-primary-300 dark:bg-primary-700 opacity-60",
        className,
      )}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {leftIcon}

      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={colourScheme === "dark" ? "#000" : "#fff"}
          />
        ) : (
          <Text
            className={cn(
              "text-white text-base font-semibold",
              textClassName,
            )}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default CustomTouchableOpacityButton;
