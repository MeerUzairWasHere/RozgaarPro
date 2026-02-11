import { useGetAllVisibleFreelancers } from "@/mutations";
import { useLocationStore } from "@/store";
import { FilterOperator } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function FreelancerFilterView() {
  const { professionId, professionName } = useLocalSearchParams<{
    professionId: string;
    professionName: string;
  }>();
  const { coordinates } = useLocationStore();

  const { data: freelancers } = useGetAllVisibleFreelancers({
    location: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
    filters: [
      {
        field: "primaryProfessionId",
        operator: FilterOperator.EQUAL_TO,
        value: professionId,
      },
    ],
  });

  
  return (
    <View className="flex-1 bg-primary dark:bg-primary-950 items-center justify-center px-6">
      <View className="bg-white dark:bg-primary-900 rounded-2xl p-8 border border-primary-100 dark:border-primary-800 shadow-lg items-center">
        <View className="w-16 h-16 rounded-2xl bg-brand dark:bg-brand-500 items-center justify-center mb-4">
          <Text className="text-3xl">✏️</Text>
        </View>
        <Text className="text-xl font-bold text-primary-950 dark:text-primary-50">
          {professionName}
        </Text>

        <Text className="text-primary-600 dark:text-primary-400 text-center mt-2">
          {professionId}
        </Text>
      </View>
    </View>
  );
}
