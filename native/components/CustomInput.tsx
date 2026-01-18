import { View, Text, TextInput } from "react-native";
import { cn } from "@/utils/utils";

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
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
  return (
    <View className="flex-row items-center border-2 border-slate-200 rounded-2xl px-4 h-14 space-x-3">
      {icon}
      {label && <Text className="label">{label}</Text>}
      <TextInput
      
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#888"
        className={cn("flex-1 text-base ml-2 mb-1 primary-text", className)}
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
