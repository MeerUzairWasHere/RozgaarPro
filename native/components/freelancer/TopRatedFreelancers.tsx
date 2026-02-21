import { View, FlatList } from "react-native";
import SectionHeader from "../SectionHeader";
import { useLocationStore } from "@/store";
import { useGetTopRatedFreelancers } from "@/mutations";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import FreelancerCard from "./FreelancerCard";
import { TopRatedFreelancersSkeletonList } from "../Skeletons";
import { router } from "expo-router";
import { ROUTES } from "@/constants";
import { SortDirection } from "@/types";
import { useTranslation } from "react-i18next";

export default function TopRatedFreelancers() {
  const { t } = useTranslation();
  const { coordinates } = useLocationStore();

  const { data: freelancers } = useGetTopRatedFreelancers({
    location: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      accuracy: coordinates.accuracy,
    },
    pagination: {
      page: 1,
      pageSize: 5,
    },
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
      <View>
        <SectionHeader title={t("top_rated_freelancers")} />
        <TopRatedFreelancersSkeletonList />
      </View>
    );

  return (
    <FlatList
      data={freelancers?.data}
      keyExtractor={(item) => item.freelancer_id}
      renderItem={({ item }) => <FreelancerCard freelancer={item} />}
      ListHeaderComponent={
        <SectionHeader title={t("top_rated_freelancers")} />
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
