import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

type Variant = "error" | "success" | "warning" | "info";

interface StatusBannerProps {
  message: string;
  variant?: Variant;
  onDismiss?: () => void;
  className?: string;
}

const variantConfig: Record<
  Variant,
  {
    icon: React.ComponentType<any>;
    iconColor: string;
    container: string;
    text: string;
  }
> = {
  error: {
    icon: AlertCircle,
    iconColor: "#dc2626",
    container:
      "bg-accent-red/10 dark:bg-accent-red/20 border border-accent-red/30 dark:border-accent-red/40",
    text: "text-accent-red dark:text-accent-redLight",
  },
  success: {
    icon: CheckCircle,
    iconColor: "#16a34a",
    container:
      "bg-accent-green/10 dark:bg-accent-green/20 border border-accent-green/30 dark:border-accent-green/40",
    text: "text-accent-green dark:text-accent-greenLight",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "#f59e0b",
    container:
      "bg-yellow-500/10 dark:bg-yellow-500/20 border border-yellow-500/30 dark:border-yellow-500/40",
    text: "text-yellow-600 dark:text-yellow-400",
  },
  info: {
    icon: Info,
    iconColor: "#2563eb",
    container:
      "bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 dark:border-blue-500/40",
    text: "text-blue-600 dark:text-blue-400",
  },
};

export default function StatusBanner({
  message,
  variant = "info",
  onDismiss,
  className = "",
}: StatusBannerProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      exiting={FadeOutUp.duration(200)}
      className={`flex-row items-center gap-3 p-4 rounded-2xl ${config.container} ${className}`}
    >
      <Icon size={20} color={config.iconColor} />
      <View className="flex-1">
        <Text className={`text-sm font-medium ${config.text}`}>{message}</Text>
      </View>

      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} className="p-1">
          <X size={18} color={config.iconColor} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}
