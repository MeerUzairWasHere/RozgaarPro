import { View, Text, TextInput } from "react-native";
import { useState } from "react";
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
}: CustomInputProps) => {
  return (
    <View className="flex-row items-center border-2 border-slate-200 rounded-2xl px-4 h-14 space-x-3">
      {icon}
      {label && <Text className="label">{label}</Text>}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#888"
        className={cn("flex-1 text-base ml-2 mb-1 primary-text", className)}
      />
    </View>
  );
};
export default CustomInput;
