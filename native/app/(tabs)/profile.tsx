import CustomTouchableOpacityButton from "@/components/CustomTouchableOpacityButton";
import { useLogout } from "@/hooks/useAuthMutation";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <SafeAreaView className="bg-primary dark:bg-primary-950 h-screen">
      <View className="flex justify-center items-center ">
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
