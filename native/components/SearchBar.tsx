import React, { useState, useEffect } from "react";
import { View, TextInput, useColorScheme } from "react-native";
import { Search } from "lucide-react-native";
import { useLocationStore } from "@/store";
import { useGetAllVisibleFreelancersBySearch } from "@/mutations";

export default function SearchBar() {
  const { coordinates } = useLocationStore();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const isDark = useColorScheme() === "dark";

  // debounce input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading } = useGetAllVisibleFreelancersBySearch({
    location: coordinates,
    search: debouncedQuery
      ? {
          term: debouncedQuery,
          fields: [
            { alias: "p", field: "name" },
            { alias: "u", field: "name" },
          ],
        }
      : undefined,
    pagination: {
      pageSize: 15,
      page: 1,
    },
  });

  return (
    <View className="mb-4">
      <View style={{ position: "relative" }}>
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

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search plumber, electrician or freelancer..."
          placeholderTextColor="#9CA3AF"
          className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white dark:bg-primary-900 text-primary-900 dark:text-primary-50 border-2 border-primary-100 dark:border-primary-800 shadow-sm"
        />
      </View>
    </View>
  );
}
