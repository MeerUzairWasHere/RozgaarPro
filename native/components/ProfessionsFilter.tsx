import React from "react";
import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";
import { useGetProfessionsFilterList } from "@/mutations";

type SkillFilterProps = {
  onCategoryPress?: (categoryId: string) => void;
  selectedCategory?: string;
};

export default function SkillFilter({
  onCategoryPress,
  selectedCategory,
}: SkillFilterProps) {
  const { data, isLoading } = useGetProfessionsFilterList();

  // Show skeleton while loading
  if (isLoading) {
    return <SkillFilterSkeleton />;
  }

  return (
    <View className="px-4 mb-6">
      <Text className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-4">
        What do you need?
      </Text>

      <View className="flex-row flex-wrap -mx-1.5">
        {data?.map((profession) => (
          <View key={profession.id} className="w-1/3 px-1.5 mb-3">
            <TouchableOpacity
              className={clsx(
                "items-center rounded-xl py-4 px-2 border shadow-sm dark:shadow-none",
                selectedCategory === profession.id
                  ? "border-primary-900 dark:border-primary-50 border-2 bg-primary-50 dark:bg-primary-800"
                  : "border-primary-100 dark:border-primary-800 bg-white dark:bg-primary-900",
              )}
              onPress={() => onCategoryPress?.(profession.id)}
              activeOpacity={0.7}
            >
              <Text className="text-sm font-medium text-primary-900 dark:text-primary-50 text-center mb-1">
                {profession.name}
              </Text>
              <Text className="text-xs text-primary-600 dark:text-primary-400 text-center">
                {profession._count.freelancers} nearby
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const SkillFilterSkeleton = () => {
  return (
    <View className="px-4 mb-6">
      {/* Title skeleton */}
      <View className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4" />

      <View className="flex-row flex-wrap -mx-1.5">
        {/* Render 6 skeleton cards (2 rows of 3) */}
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} className="w-1/3 px-1.5 mb-3">
            <View className="rounded-xl py-4 px-2 border border-gray-100 dark:border-gray-800 bg-white dark:bg-primary-900">
              {/* Profession name skeleton */}
              <View className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-2" />
              {/* Count skeleton */}
              <View className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded mx-auto" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
