import { useGetSingleVisibleFreelancerDetail } from "@/mutations";
import { useLocationStore } from "@/store";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function FreelancerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { coordinates } = useLocationStore();

  const { data } = useGetSingleVisibleFreelancerDetail({
    freelancerId: id,
    query: { location: coordinates },
  });

  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold dark:text-primary">
        Freelancer Detail
      </Text>
      <Text className="dark:text-primary">{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}
