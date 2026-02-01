import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function FreelancerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log(id);

  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold dark:text-primary">Freelancer ID</Text>
      <Text className="dark:text-primary">{id}</Text>
    </View>
  );
}
