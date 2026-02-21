import { Modal, View, Pressable, useColorScheme, Text } from "react-native";
import { Star, MapPin, ShieldCheck } from "lucide-react-native";
import { useState } from "react";
import { ListFilter, ListSort, FilterOperator, SortDirection } from "@/types";
import CustomTouchableOpacityButton from "./CustomTouchableOpacityButton";

type SortOption = "rating" | "distance_km" | "experience";
type RatingOption = "any" | "3" | "4" | "4.8";
type DistanceOption = "any" | "3" | "5" | "7" | "10";
type ExperienceOption = "any" | "3" | "5" | "7" | "10";

type Props = {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: ListFilter[], sort: ListSort[]) => void;
};

const FilterDrawer = ({ visible, onClose, onApplyFilters }: Props) => {
  // Add this function to count active filters

  const colorScheme = useColorScheme();

  // Filter states
  const [selectedSort, setSelectedSort] = useState<SortOption>("rating");
  const [selectedRating, setSelectedRating] = useState<RatingOption>("any");
  const [selectedDistance, setSelectedDistance] =
    useState<DistanceOption>("any");
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceOption>("any");

  const buildFiltersAndSort = (): {
    filters: ListFilter[];
    sort: ListSort[];
  } => {
    const filters: ListFilter[] = [];
    const sort: ListSort[] = [];

    // Add rating filter
    if (selectedRating !== "any") {
      filters.push({
        field: "rating",
        operator: FilterOperator.GREATER_THAN_OR_EQUAL,
        value: parseFloat(selectedRating),
      });
    }

    // Add distance filter (in kilometers)
    if (selectedDistance !== "any") {
      filters.push({
        field: "distance_km",
        operator: FilterOperator.LESS_THAN_OR_EQUAL,
        value: parseFloat(selectedDistance), // Convert km to meters
      });
    }

    // Add experience filter (in years)
    if (selectedExperience !== "any") {
      filters.push({
        field: "experience",
        operator: FilterOperator.GREATER_THAN_OR_EQUAL,
        value: parseInt(selectedExperience),
      });
    }

    // Add sort
    switch (selectedSort) {
      case "rating":
        sort.push({
          field: "rating",
          direction: SortDirection.DESC,
        });
        break;
      case "distance_km":
        sort.push({
          field: "distance_km",
          direction: SortDirection.ASC,
        });
        break;
      case "experience":
        sort.push({
          field: "experience",
          direction: SortDirection.DESC,
        });
        break;
    }

    return { filters, sort };
  };

  const handleApplyFilters = () => {
    const { filters, sort } = buildFiltersAndSort();
    onApplyFilters(filters, sort);
    onClose();
  };

  const handleClearAll = () => {
    setSelectedSort("rating");
    setSelectedRating("any");
    setSelectedDistance("any");
    setSelectedExperience("any");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <Pressable style={{ flex: 1 }} onPress={onClose} />

      {/* Bottom drawer */}
      <View
        style={{
          backgroundColor: colorScheme === "dark" ? "#121212" : "#F2F2F2",
          padding: 20,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          minHeight: 500,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-semibold dark:text-primary-50 text-primary-900">
            Filters
          </Text>
        </View>

        {/* SORT BY */}
        <View className="mt-6">
          <Text className="text-sm font-semibold mb-3 dark:text-primary-50 text-primary-900">
            Sort By
          </Text>

          <View className="flex-row flex-wrap gap-2">
            <Pressable
              onPress={() => setSelectedSort("rating")}
              className={`flex-row items-center gap-2 px-4 py-2.5 rounded-xl ${
                selectedSort === "rating"
                  ? "bg-brand"
                  : "bg-primary-200 dark:bg-primary-800"
              }`}
            >
              <Star size={14} fill="#FFA500" color="#FFA500" />

              <Text
                className={`text-sm font-medium ${
                  selectedSort === "rating"
                    ? "text-white"
                    : "dark:text-primary-50 text-primary-900"
                }`}
              >
                Top Rated
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedSort("distance_km")}
              className={`flex-row items-center gap-2 px-4 py-2.5 rounded-xl ${
                selectedSort === "distance_km"
                  ? "bg-brand"
                  : "bg-primary-200 dark:bg-primary-800"
              }`}
            >
              <MapPin
                size={14}
                color={selectedSort === "distance_km" ? "#86efac" : "#16a34a"}
              />
              <Text
                className={`text-sm font-medium ${
                  selectedSort === "distance_km"
                    ? "text-white"
                    : "dark:text-primary-50 text-primary-900"
                }`}
              >
                Nearest
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedSort("experience")}
              className={`flex-row items-center gap-2 px-4 py-2.5 rounded-xl ${
                selectedSort === "experience"
                  ? "bg-brand"
                  : "bg-primary-200 dark:bg-primary-800"
              }`}
            >
              <ShieldCheck
                size={14}
                color={selectedSort === "experience" ? "#86efac" : "#16a34a"}
              />
              <Text
                className={`text-sm font-medium ${
                  selectedSort === "experience"
                    ? "text-white"
                    : "dark:text-primary-50 text-primary-900"
                }`}
              >
                Most Experienced
              </Text>
            </Pressable>
          </View>
        </View>

        {/* MINIMUM RATING */}
        <View className="mt-6">
          <Text className="text-sm font-semibold mb-3 dark:text-primary-50 text-primary-900">
            Minimum Rating
          </Text>

          <View className="flex-row gap-2">
            {(["any", "3", "4", "4.8"] as RatingOption[]).map((value) => (
              <Pressable
                key={value}
                onPress={() => setSelectedRating(value)}
                className={`px-4 py-2.5 rounded-xl flex-row items-center gap-1 ${
                  selectedRating === value
                    ? "bg-brand"
                    : "bg-primary-200 dark:bg-primary-800"
                }`}
              >
                {value === "any" ? (
                  <Text
                    className={`text-sm font-medium ${
                      selectedRating === value
                        ? "text-white"
                        : "dark:text-primary-50 text-primary-900"
                    }`}
                  >
                    Any
                  </Text>
                ) : (
                  <>
                    <Star size={14} fill="#FFA500" color="#FFA500" />
                    <Text
                      className={`text-sm font-medium ${
                        selectedRating === value
                          ? "text-white"
                          : "dark:text-primary-50 text-primary-900"
                      }`}
                    >
                      {value}+
                    </Text>
                  </>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* MAX DISTANCE */}
        <View className="mt-6">
          <Text className="text-sm font-semibold mb-3 dark:text-primary-50 text-primary-900">
            Maximum Distance
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {(["any", "3", "5", "7", "10"] as DistanceOption[]).map((value) => {
              const label = value === "any" ? "Any" : `${value} km`;
              return (
                <Pressable
                  key={value}
                  onPress={() => setSelectedDistance(value)}
                  className={`px-4 py-2.5 rounded-xl ${
                    selectedDistance === value
                      ? "bg-brand"
                      : "bg-primary-200 dark:bg-primary-800"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      selectedDistance === value
                        ? "text-white"
                        : "dark:text-primary-50 text-primary-900"
                    }`}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/*  Minimum EXPERIENCE  */}
        <View className="mt-6">
          <Text className="text-sm font-semibold mb-3 dark:text-primary-50 text-primary-900">
            Minimum Experience
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {(["any", "3", "5", "7", "10"] as ExperienceOption[]).map(
              (value) => {
                const label = value === "any" ? "Any" : `${value} years`;
                return (
                  <Pressable
                    key={value}
                    onPress={() => setSelectedExperience(value)}
                    className={`px-4 py-2.5 rounded-xl ${
                      selectedExperience === value
                        ? "bg-brand"
                        : "bg-primary-200 dark:bg-primary-800"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        selectedExperience === value
                          ? "text-white"
                          : "dark:text-primary-50 text-primary-900"
                      }`}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              },
            )}
          </View>
        </View>

        {/* ACTION BUTTONS */}
        <View className="flex-row gap-3 mt-8">
          <CustomTouchableOpacityButton
            onPress={handleClearAll}
            className="flex-1 py-2 rounded-xl bg-primary-600 dark:bg-primary-700"
            title="Clear All"
          />
          <CustomTouchableOpacityButton
            onPress={handleApplyFilters}
            className="flex-1 py-2 rounded-xl bg-brand-600 dark:bg-brand-500"
            title="Apply Filters"
          />
        </View>
      </View>
    </Modal>
  );
};

export default FilterDrawer;
