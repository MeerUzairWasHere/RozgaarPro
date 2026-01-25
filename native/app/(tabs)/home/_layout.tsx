import { useAuthStore } from "@/store";
import { Slot } from "expo-router";
import { View, Text, ScrollView } from "react-native";

export default function HomeLayout() {
  const { user } = useAuthStore();

  return (
    <ScrollView className="dark:bg-black">
      <Slot />
      <View className="p-20">
        <Text className="primary-text mb-4">This is Home</Text>
        <Text className="primary-text mb-4">Name: {user?.name}</Text>
        <Text className="primary-text mb-4">Role: {user?.role}</Text>
        <Text className="primary-text mb-4">
          Profile Completed: {user?.profileCompleted ? "yes" : "no"}
        </Text>
      </View>
    </ScrollView>
  );
}
