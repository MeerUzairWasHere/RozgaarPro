import { View, FlatList } from "react-native";
import SectionHeader from "../SectionHeader";
import { useLocationStore } from "@/store";
import { useGetRandomVisibleFreelancers } from "@/mutations";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import FreelancerCard from "./FreelancerCard";
import { NearbyWorkersSkeletonList } from "../Skeletons";
import { router } from "expo-router";
import { ROUTES } from "@/constants";
import { FilterOperator, SortDirection } from "@/types";

export default function NearbyFreelancers() {
  const { coordinates } = useLocationStore();

  const { data: freelancers } = useGetRandomVisibleFreelancers({
    location: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
    pagination: {
      page: 1,
      pageSize: 5,
    },
    filters: [
      {
        field: "distance_km",
        operator: FilterOperator.LESS_THAN_OR_EQUAL,
        value: 5,
      },
    ],
    sort: [
      {
        field: "rating",
        direction: SortDirection.DESC,
      },
    ],
  });

  const tabBarHeight = useBottomTabBarHeight();

  if (!freelancers)
    return (
      <View className="px-4">
        <SectionHeader
          title="Nearby Freelancers"
          onActionPress={() => router.push(ROUTES.ALL_VISIBLE_FREELANCERS)}
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
          onActionPress={() => router.push(ROUTES.ALL_VISIBLE_FREELANCERS)}
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
