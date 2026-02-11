import { View, Text, TextInput, useColorScheme } from "react-native";
import { cn } from "@/utils";

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "decimal-pad";
  className?: string;
  icon?: React.ReactNode;
  returnKeyType?: "done" | "next" | "go" | "search" | "send";
  onSubmitEditing?: () => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  submitBehavior?: "submit" | "blurAndSubmit" | "newline";
  ref?: React.RefObject<TextInput | null>;
}
const CustomInput = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
  className = "",
  icon,
  returnKeyType,
  autoCapitalize = "none",
  autoCorrect = false,
  onSubmitEditing,
  submitBehavior,
  ref,
}: CustomInputProps) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View className="flex-row items-center border-2 border-primary-200 dark:border-primary-800 rounded-2xl px-4 h-14 space-x-3 bg-white dark:bg-primary-900">
      {icon}
      {label && <Text className="label">{label}</Text>}
      <TextInput
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
        className={cn(
          "flex-1 text-base ml-2 mb-1 text-primary-950 dark:text-primary-50",
          className,
        )}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={autoCorrect}
        submitBehavior={submitBehavior}
        ref={ref}
      />
    </View>
  );
};
export default CustomInput;
