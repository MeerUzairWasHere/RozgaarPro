import React from "react";
import {
  View,
  Text,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Search, X } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAuthStore } from "@/store";

const BRAND_HERO = { light: "#6B4EEA", dark: "#5A3DD6" };

type Props = {
  query: string;
  onChangeQuery: (text: string) => void;
};

export default function HomeHero({ query, onChangeQuery }: Props) {
  const isDark = useColorScheme() === "dark";
  const brandColor = isDark ? BRAND_HERO.dark : BRAND_HERO.light;
  const { user } = useAuthStore();
  const displayName = user?.name?.trim() || "there";
  const isSearching = query.trim().length > 0;

  return (
    <Animated.View
      entering={FadeInDown.duration(400)}
      style={[styles.outer, { backgroundColor: brandColor }]}
    >
      <View style={styles.inner}>
        {/* Top row: greeting + notification */}
        <View style={styles.topRow}>
          <Text className="text-white text-base" numberOfLines={1}>
            Hello, {displayName} 👋
          </Text>
        </View>

        {/* Main title */}
        <Text
          className="text-white text-2xl font-bold leading-tight mt-1"
          style={styles.title}
        >
          Let's find best talent for you
        </Text>

        {/* Search bar - overlaps into content area */}
        <View style={styles.searchWrap}>
          <View
            style={[
              styles.searchBox,
              isDark ? styles.searchBoxDark : styles.searchBoxLight,
            ]}
          >
            <Search
              size={20}
              color={isDark ? "#9CA3AF" : "#6B7280"}
              style={styles.searchIcon}
            />
            <TextInput
              value={query}
              onChangeText={onChangeQuery}
              placeholder="Search service"
              placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
              style={[
                styles.input,
                isDark ? styles.inputDark : styles.inputLight,
              ]}
            />
            {isSearching && (
              <TouchableOpacity
                onPress={() => onChangeQuery("")}
                style={styles.clearBtn}
                hitSlop={8}
              >
                <X size={18} color={isDark ? "#9CA3AF" : "#6B7280"} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginHorizontal: -16,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  inner: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    maxWidth: "90%",
  },
  searchWrap: {
    marginTop: 20,
    marginBottom: 4,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    minHeight: 52,
    paddingHorizontal: 14,
  },
  searchBoxLight: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  searchBoxDark: {
    backgroundColor: "#1A1A1A",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    paddingRight: 8,
  },
  inputLight: {
    color: "#1A1A1A",
  },
  inputDark: {
    color: "#F2F2F2",
  },
  clearBtn: {
    padding: 4,
  },
});
