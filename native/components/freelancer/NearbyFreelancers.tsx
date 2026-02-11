import { View, FlatList } from "react-native";
import SectionHeader from "../SectionHeader";
import { useLocationStore } from "@/store";
import { useGetAllVisibleFreelancers } from "@/mutations";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import FreelancerCard from "./FreelancerCard";
import { NearbyWorkersSkeletonList } from "../Skeletons";

export default function NearbyFreelancers() {
  const { coordinates } = useLocationStore();

  const { data: freelancers } = useGetAllVisibleFreelancers({
    location: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
    pagination: {
      page: 1,
      pageSize: 5,
    },
  });

  const tabBarHeight = useBottomTabBarHeight();

  if (!freelancers)
    return (
      <View className="px-4">
        <SectionHeader
          title="Nearby Freelancers"
          onActionPress={() => console.log("See all pressed")}
        />
        <NearbyWorkersSkeletonList />
      </View>
    );

  return (
    <FlatList
      data={freelancers?.data}
      keyExtractor={(item) => item.freelancer_id}
      renderItem={({ item }) => <FreelancerCard freelancer={item} />}
      ListHeaderComponent={
        <SectionHeader
          title="Nearby Freelancers"
          onActionPress={() => console.log("See all pressed")}
        />
      }
      scrollEnabled={false}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: tabBarHeight + 20,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}
