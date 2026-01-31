import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Search } from "lucide-react-native";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <View className="mb-4">
      <View style={{ position: "relative" }}>
        {/* Search Icon */}
        <Search
          size={20}
          color="#666666"
          style={{
            position: "absolute",
            left: 12,
            top: 12,
            zIndex: 1,
          }}
        />

        {/* Input */}
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search plumber, electrician..."
          placeholderTextColor="#9CA3AF"
          className="
            w-full h-12
            pl-12 pr-4
            rounded-2xl
            bg-white dark:bg-primary-900
            text-primary-900 dark:text-primary-50
            border border-primary-100 dark:border-primary-800
            shadow-sm
          "
        />
      </View>
    </View>
  );
}
