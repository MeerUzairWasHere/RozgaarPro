import {
  SearchBar,
  ProfessionsFilter,
  FreelancerCard,
  SectionHeader,
} from "@/components";
import {
  NearbyWorkersSkeletonList,
  SkillFilterSkeleton,
} from "@/components/Skeletons";
import { useGetAllVisibleFreelancers } from "@/mutations";
import { FlatList, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { useQueryClient } from "@tanstack/react-query";
import { useLocationStore } from "@/store";

const UserHomeScreen = () => {
  const queryClient = useQueryClient();

  const globalRefresh = async () => {
    await queryClient.invalidateQueries({
      type: "active", // 👈 key part
    });
  };

  const { coordinates } = useLocationStore();

  const {
    data: freelancers,
    isFetching,
    isLoading,
  } = useGetAllVisibleFreelancers({
    location: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
  });

  const tabBarHeight = useBottomTabBarHeight();

  if (isLoading) {
    return (
      <View className="p-4">
        <SearchBar />
        <SectionHeader title="What do you need?" />
        <SkillFilterSkeleton />
        <SectionHeader
          title="Nearby Freelancers"
          onActionPress={() => console.log("See all pressed")}
        />
        <NearbyWorkersSkeletonList />
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={freelancers?.data ?? []}
        keyExtractor={(item) => item.freelancer_Id}
        renderItem={({ item }) => <FreelancerCard freelancer={item} />}
        ListHeaderComponent={
          <>
            <SearchBar />
            <SectionHeader title="What do you need?" />
            <ProfessionsFilter />
            <SectionHeader
              title="Nearby Freelancers"
              onActionPress={() => console.log("See all pressed")}
            />
          </>
        }
        refreshing={isFetching}
        onRefresh={globalRefresh}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: tabBarHeight + 20, // 🔥 IMPORTANT
        }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default UserHomeScreen;
