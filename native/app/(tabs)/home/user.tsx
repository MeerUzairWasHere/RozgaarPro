import {
  SearchBar,
  ProfessionsFilter,
  SectionHeader,
  NearbyFreelancers,
} from "@/components";
import { ScrollView, View } from "react-native";

const UserHomeScreen = () => {
  return (
    <ScrollView>
      <View className="px-4 pt-4">
        <SearchBar />
        <SectionHeader title="What do you need?" />
        <ProfessionsFilter />
      </View>
      <NearbyFreelancers />
    </ScrollView>
  );
};

export default UserHomeScreen;
