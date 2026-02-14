import {
  SearchBar,
  ProfessionsFilter,
  SectionHeader,
  NearbyFreelancers,
} from "@/components";
import { RefreshControl, ScrollView, View } from "react-native";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const UserHomeScreen = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries();
    setRefreshing(false);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
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
