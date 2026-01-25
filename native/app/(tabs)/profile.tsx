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
      contentContainerClassName="flex-grow"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bounces={true}
      className="dark:bg-black"
    >
      <ProfileCard />
      <FreelancerProfileStats />
      <ProfileMenu />
      <LogoutButton />
    </ScrollView>
  );
}
