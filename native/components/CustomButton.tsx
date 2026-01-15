import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import React from "react";
import cn from "clsx";

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  textClassName?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  onPress,
  title = "Click Me",
  className,
  textClassName,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  const colourScheme = useColorScheme();

  return (
    <TouchableOpacity
      className={cn(
        "h-14 rounded-2xl bg-primary-900  dark:bg-primary items-center justify-center overflow-hidden",
        className
      )}
      onPress={onPress}
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
              "text-primary-50 dark:text-primary-950  text-base font-semibold",
              textClassName
            )}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default CustomButton;
