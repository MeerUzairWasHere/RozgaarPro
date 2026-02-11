import {
  FreelancerProfileStats,
  LogoutButton,
  ProfileCard,
  ProfileMenu,
} from "@/components";
import { ScrollView } from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView
      className="flex-1 bg-primary dark:bg-primary-950"
      contentContainerClassName="flex-grow"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bounces={true}
    >
      <ProfileCard />
      <FreelancerProfileStats />
      <ProfileMenu />
      <LogoutButton />
    </ScrollView>
  );
}
