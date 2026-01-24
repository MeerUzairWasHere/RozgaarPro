import CustomTouchableOpacityButton from "@/components/CustomTouchableOpacityButton";
import FreelancerProfileStats from "@/components/FreelancerProfileStats";
import LogoutButton from "@/components/LogoutButton";
import ProfileCard from "@/components/ProfileCard";
import ProfileMenu from "@/components/ProfileMenu";
import { useLogout } from "@/hooks/useAuthMutation";
import { ScrollView } from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView
      contentContainerClassName="flex-grow"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bounces={true}
      className="dark:bg-primary-950"
    >
      <ProfileCard />
      <FreelancerProfileStats />
      <ProfileMenu />
      <LogoutButton />
    </ScrollView>
  );
}
