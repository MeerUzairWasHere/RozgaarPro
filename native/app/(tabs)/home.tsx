import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store";
import { Redirect } from "expo-router";
import { ROUTES } from "@/constants";
import { USER_ROLE } from "@/types";

export default function HomeScreen() {
  const { user, isAuthenticated } = useAuthStore();

  if (
    isAuthenticated &&
    !user?.profileCompleted &&
    user?.role === USER_ROLE.FREELANCER
  ) {
    return <Redirect href={ROUTES.FREELANCER_ONBOARDING} />;
  }

  return (
    <SafeAreaView className="bg-primary dark:bg-primary-950">
      <View className="flex justify-center items-center h-screen">
        <Text className="primary-text mb-4">This is Home</Text>
        <Text className="primary-text mb-4">Name: {user?.name}</Text>
        <Text className="primary-text mb-4">Role: {user?.role}</Text>
        <Text className="primary-text mb-4">
          Profile Completed: {user?.profileCompleted ? "yes" : "no"}
        </Text>
      </View>
    </SafeAreaView>
  );
}
