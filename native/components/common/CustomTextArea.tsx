import { View, TextInput, useColorScheme } from "react-native";
import { AppText as Text } from "./AppText";
import { cn } from "@/utils";

interface CustomTextAreaProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  error?: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "decimal-pad";
  className?: string;
  returnKeyType?: "done" | "next" | "go" | "search" | "send";
  onSubmitEditing?: () => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  ref?: React.RefObject<TextInput | null>;
}

const CustomTextArea = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  label,
  error,
  keyboardType = "default",
  className = "",
  returnKeyType,
  autoCapitalize = "sentences",
  autoCorrect = true,
  onSubmitEditing,
  numberOfLines = 4,
  maxLength,
  ref,
}: CustomTextAreaProps) => {
  const isDark = useColorScheme() === "dark";
  const hasError = !!error;

  return (
    <View className="gap-1.5">
      {label && (
        <Text
          className={cn(
            "flex-1 text-xl ml-2 mb-1 text-primary-950 dark:text-primary-50",
            className,
          )}
        >
          {label}
        </Text>
      )}

      <View
        className={cn(
          "border-2 rounded-2xl px-4 py-3 bg-white dark:bg-primary-900",
          hasError
            ? "border-accent-red dark:border-accent-redLight"
            : "border-primary-200 dark:border-primary-800",
        )}
      >
        <TextInput
          autoCapitalize={autoCapitalize}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
          className={cn(
            "text-base text-primary-950 dark:text-primary-50 h-20",
            className,
          )}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoCorrect={autoCorrect}
          multiline={true}
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          maxLength={maxLength}
          ref={ref}
        />
      </View>

      {hasError && (
        <Text className="text-xs text-accent-red dark:text-accent-redLight px-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomTextArea;
