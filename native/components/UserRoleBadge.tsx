import { USER_ROLE } from "@/types";
import { useAuthStore } from "@/store";
import { View, Text } from "react-native";

const UserRoleBadge = () => {
  const { userRole } = useAuthStore();
  return (
    <View className="self-start px-4 py-2 rounded-full bg-primary-950 dark:bg-primary-50">
      <Text className="text-sm font-medium dark:text-primary-950 text-primary-50">
        {userRole === USER_ROLE.FREELANCER
          ? "Freelancer Account"
          : "Customer Account"}
      </Text>
    </View>
  );
};
export default UserRoleBadge;
