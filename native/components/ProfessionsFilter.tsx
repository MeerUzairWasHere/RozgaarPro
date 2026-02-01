import React from "react";
import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";
import { useGetProfessionsFilterList } from "@/mutations";
import { useLocationStore } from "@/store";
import { ProfessionsFilterFilterSkeleton } from "./Skeletons";

type SkillFilterProps = {
  onCategoryPress?: (categoryId: string) => void;
  selectedCategory?: string;
};

export default function ProfessionsFilter({
  onCategoryPress,
  selectedCategory,
}: SkillFilterProps) {
  const {
    coordinates: { latitude, longitude },
  } = useLocationStore();

  const { data, isLoading } = useGetProfessionsFilterList({
    latitude,
    longitude,
  });

  if (!data) {
    return <ProfessionsFilterFilterSkeleton />;
  }

  return (
    <View>
      <View className="flex-row flex-wrap -mx-1.5">
        {data?.map(({ profession_id, profession_name, count }) => (
          <View key={profession_id} className="w-1/3 px-1.5 mb-3">
            <TouchableOpacity
              className={clsx(
                "items-center rounded-xl py-4 px-2 border shadow-sm dark:shadow-none",
                selectedCategory === profession_id
                  ? "border-primary-900 dark:border-primary-50 border-2 bg-primary-50 dark:bg-primary-800"
                  : "border-primary-100 dark:border-primary-800 bg-white dark:bg-primary-900",
              )}
              onPress={() => onCategoryPress?.(profession_id)}
              activeOpacity={0.7}
            >
              <Text className="text-sm font-medium text-primary-900 dark:text-primary-50 text-center mb-1">
                {profession_name}
              </Text>
              <Text className="text-xs text-primary-600 dark:text-primary-400 text-center">
                {count} nearby
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
