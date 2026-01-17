import { View, Text } from "react-native";
import CustomTouchableOpacityButton from "@/components/CustomTouchableOpacityButton";
import { useLogout } from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <SafeAreaView className="bg-primary dark:bg-primary-950">
      <View className="flex justify-center items-center h-screen">
        <Text className="primary-text mb-4">This is Home</Text>
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
