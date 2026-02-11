import { ProfileApprovedCard } from "@/components";
import { useGetCurrentUser } from "@/mutations";
import { useAuthStore } from "@/store";
import { useEffect } from "react";
import { ScrollView } from "react-native";

const FreelancerHomeScreen = () => {
  const { data } = useGetCurrentUser();
  const { setUser } = useAuthStore();

  useEffect(() => {
    setUser(data || null);
  }, [data]);

  return (
    <ScrollView
      className="flex-1 bg-primary dark:bg-primary-950"
      showsVerticalScrollIndicator={false}
    >
      <ProfileApprovedCard />
    </ScrollView>
  );
};
export default FreelancerHomeScreen;
