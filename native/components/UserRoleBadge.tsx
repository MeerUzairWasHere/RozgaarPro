import { useAuthStore } from "@/store";
import { USER_ROLE } from "@/types";
import { cn } from "@/utils/utils";
import { View, Text } from "react-native";
const UserRoleBadge = () => {
  const { userRole } = useAuthStore();
  return (
    <View
      className={cn(
        `self-start px-4 py-2 rounded-full`,
        userRole === USER_ROLE.FREELANCER ? "bg-accent/10" : "bg-primary/10"
      )}
    >
      <Text
        className={cn(
          `text-sm font-medium`,
          userRole === USER_ROLE.FREELANCER ? "text-accent" : "text-primary"
        )}
      >
        {userRole === USER_ROLE.FREELANCER
          ? "Freelancer Account"
          : "Customer Account"}
      </Text>
    </View>
  );
};
export default UserRoleBadge;
