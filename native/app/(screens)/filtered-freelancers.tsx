import {
  AppHeader,
  FilterDrawer,
  FreelancerCard,
  FreelancerListSkeleton,
  ListFilterHeader,
} from "@/components";
import { useGetFilteredVisibleFreelancers } from "@/mutations";
import { useLocationStore } from "@/store";
import { FilterOperator } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { FlatList, ActivityIndicator } from "react-native";
import { extractInfiniteList } from "@/utils";
import { useState } from "react";

export default function FreelancerFilterView() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { professionId, professionName } = useLocalSearchParams<{
    professionId: string;
    professionName: string;
  }>();

  const { coordinates } = useLocationStore();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetFilteredVisibleFreelancers({
      location: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
      filters: [
        {
          field: "primaryProfessionId",
          operator: FilterOperator.EQUAL_TO,
          value: professionId,
        },
      ],
    });

  const { items, totalItems } = extractInfiniteList(data);

  if (isLoading) {
    return <FreelancerListSkeleton professionName={professionName} />;
  }

  return (
    <>
      <AppHeader showBack title={`${professionName}s Nearby`} />

      <ListFilterHeader
        freelancersCount={totalItems}
        onFilterPress={() => setIsFilterOpen(true)}
        label={professionName}
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.freelancer_id}
        renderItem={({ item }) => <FreelancerCard freelancer={item} />}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null
        }
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      />

      <FilterDrawer
        visible={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
}
