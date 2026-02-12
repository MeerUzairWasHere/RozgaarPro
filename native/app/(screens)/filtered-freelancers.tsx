import {
  AppHeader,
  FilterDrawer,
  FreelancerCard,
  FreelancerListSkeleton,
  ListFilterHeader,
} from "@/components";
import { useGetFilteredVisibleFreelancers } from "@/mutations";
import { useLocationStore } from "@/store";
import { FilterOperator, ListFilter, ListSort } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { FlatList, ActivityIndicator } from "react-native";
import { extractInfiniteList } from "@/utils";
import { useState, useMemo } from "react";

export default function FreelancerFilterView() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [additionalFilters, setAdditionalFilters] = useState<ListFilter[]>([]);
  const [activeSort, setActiveSort] = useState<ListSort[]>([]);

  const { professionId, professionName } = useLocalSearchParams<{
    professionId: string;
    professionName: string;
  }>();

  const { coordinates } = useLocationStore();

  const allFilters = useMemo(() => {
    const professionFilter: ListFilter = {
      field: "primaryProfessionId",
      operator: FilterOperator.EQUAL_TO,
      value: professionId,
    };

    const hasDistanceFilter = additionalFilters.some(
      (f) => f.field === "distance_km",
    );

    const distanceFilter: ListFilter = {
      field: "distance_km",
      operator: FilterOperator.LESS_THAN_OR_EQUAL,
      value: 5,
    };

    return [
      professionFilter,
      ...(hasDistanceFilter ? [] : [distanceFilter]),
      ...additionalFilters,
    ];
  }, [professionId, additionalFilters]);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetFilteredVisibleFreelancers({
      location: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
      filters: allFilters,
      sort: activeSort,
    });

  const { items } = extractInfiniteList(data);

  const handleApplyFilters = (filters: ListFilter[], sort: ListSort[]) => {
    setAdditionalFilters(filters);
    setActiveSort(sort);
  };

  if (isLoading) {
    return <FreelancerListSkeleton professionName={professionName} />;
  }

  // Calculate active filter count
  const activeFilterCount = additionalFilters.length + activeSort.length;

  return (
    <>
      <AppHeader showBack title={`${professionName}s Nearby`} />

      <ListFilterHeader
        freelancersCount={items.length}
        onFilterPress={() => setIsFilterOpen(true)}
        label={professionName}
        activeFilterCount={activeFilterCount} // Pass the count
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
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
}
