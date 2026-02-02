import { ProfileApprovedCard } from "@/components";
import { useGetCurrentUser } from "@/mutations";
import { useAuthStore } from "@/store";
import { useEffect } from "react";

const FreelancerHomeScreen = () => {
  const { data } = useGetCurrentUser();
  const { setUser } = useAuthStore();

  useEffect(() => {
    setUser(data || null);
  }, [data]);

  return (
    <>
      <ProfileApprovedCard />
    </>
  );
};
export default FreelancerHomeScreen;
