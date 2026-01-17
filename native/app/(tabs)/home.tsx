import { View, Text } from "react-native";
import CustomTouchableOpacityButton from "@/components/CustomTouchableOpacityButton";
import { useLogout } from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store";

export default function HomeScreen() {
  const logoutMutation = useLogout();
  const { user } = useAuthStore();
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <SafeAreaView className="bg-primary dark:bg-primary-950">
      <View className="flex justify-center items-center h-screen">
        <Text className="primary-text mb-4">This is Home</Text>
        <Text className="primary-text mb-4">Name: {user?.name}</Text>
        <Text className="primary-text mb-4">Role: {user?.role}</Text>
        <Text className="primary-text mb-4">
          Profile Completed: {user?.profileCompleted ? "yes" : "no"}
        </Text>
        <CustomTouchableOpacityButton
          title="Logout"
          onPress={handleLogout}
          isLoading={logoutMutation.isPending}
          className="w-96"
        />
      </View>
    </SafeAreaView>
  );
}
