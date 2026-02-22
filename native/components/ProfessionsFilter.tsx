import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { useGetProfessionsFilterList } from "@/mutations";
import { useLocationStore } from "@/store";
import { ProfessionsFilterFilterSkeleton } from "./Skeletons";
import { router } from "expo-router";
import { ROUTES } from "@/constants";
import SectionHeader from "./SectionHeader";

export default function ProfessionsFilter() {
  const {
    coordinates: { latitude, longitude, accuracy },
  } = useLocationStore();

  const { data } = useGetProfessionsFilterList({
    location: { latitude, longitude, accuracy },
  });

  if (!data) {
    return (
      <>
        <SectionHeader title="What do you need?" />
        <ProfessionsFilterFilterSkeleton />
      </>
    );
  }

  if (data.length === 0) return null;

  return (
    <View>
      <SectionHeader title="What do you need?" />

      <View className="flex-row flex-wrap -mx-1.5">
        {data?.map(({ profession_id, profession_name, count }) => (
          <View key={profession_id} className="w-1/3 px-1.5 mb-3">
            <TouchableOpacity
              className="items-center rounded-xl py-4 px-2 border-2 shadow-sm dark:shadow-none border-primary-100 dark:border-primary-800 bg-white dark:bg-primary-900"
              onPress={() =>
                router.push({
                  pathname: ROUTES.FILTERED_FREELANCERS,
                  params: {
                    professionId: profession_id,
                    professionName: profession_name,
                  },
                })
              }
              activeOpacity={0.7}
            >
              <Text className="text-md font-medium text-center mb-1 text-primary-900 dark:text-primary-50">
                {profession_name}
              </Text>
              <Text className="text-sm text-brand-600 dark:text-brand-400 text-center">
                {`${count} nearby`}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
