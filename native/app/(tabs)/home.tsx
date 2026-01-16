import { View, Text } from "react-native";
import { useAuthStore } from "@/store";
import CustomTouchableOpacityButton from "@/components/CustomTouchableOpacityButton";
import { useLogout } from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const logoutMutation = useLogout();
  const { user } = useAuthStore();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <SafeAreaView className="bg-primary dark:bg-primary-950">
      <View className="flex justify-center items-center h-screen">
        <Text>This is Home</Text>
        <Text>User: {user?.name}</Text>
        <Text>Phone: {user?.phone}</Text>
        <Text>Role: {user?.role}</Text>
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
