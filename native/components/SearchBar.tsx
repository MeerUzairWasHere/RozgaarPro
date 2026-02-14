import React from "react";
import {
  View,
  TextInput,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { Search, X } from "lucide-react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  const isDark = useColorScheme() === "dark";
  const isSearching = value.trim().length > 0;

  return (
    <View className="mb-4">
      <View style={{ position: "relative" }}>
        {/* Search icon */}
        <Search
          size={20}
          color={isDark ? "#B3A5F5" : "#6B4EEA"}
          style={{
            position: "absolute",
            left: 12,
            top: 12,
            zIndex: 1,
          }}
        />

        {/* Input */}
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Search plumber, electrician or freelancer..."
          placeholderTextColor="#9CA3AF"
          className="w-full h-12 pl-12 pr-10 rounded-2xl bg-white dark:bg-primary-900 text-primary-900 dark:text-primary-50 border-2 border-primary-100 dark:border-primary-800 shadow-sm"
        />

        {/* Clear button */}
        {isSearching && (
          <TouchableOpacity
            onPress={() => onChange("")}
            style={{
              position: "absolute",
              right: 12,
              top: 12,
              zIndex: 1,
            }}
          >
            <X size={20} color={isDark ? "#B3A5F5" : "#6B4EEA"} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
