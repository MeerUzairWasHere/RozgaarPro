import {
  AppHeader,
  FreelancerCard,
  ListFilterHeader,
  FreelancerListSkeleton,
  FilterDrawer,
  FreelancerCardSkeleton,
  EmptyState,
} from "@/components";

import { useLocationStore } from "@/store";
import { FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { useGetAllVisibleFreelancers } from "@/mutations";
import { extractInfiniteList } from "@/utils";
import { useState } from "react";
import { ListFilter, ListSort } from "@/types";
import { usePullToRefresh } from "@/hooks";
import Animated, { FadeInUp } from "react-native-reanimated";

const AllVisibleFreelancers = () => {
  const { coordinates } = useLocationStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ListFilter[]>([]);
  const [activeSort, setActiveSort] = useState<ListSort[]>([]);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllVisibleFreelancers({
      location: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        accuracy: coordinates.accuracy,
      },
      filters: activeFilters,
      sort: activeSort,
    });

  const { items } = extractInfiniteList(data);

  const handleApplyFilters = (filters: ListFilter[], sort: ListSort[]) => {
    setActiveFilters(filters);
    setActiveSort(sort);
  };

  // Calculate active filter count
  const activeFilterCount = activeFilters.length + activeSort.length;

  const { refreshing, onRefresh } = usePullToRefresh();

  return (
    <>
      <AppHeader showBack title="All Visible Freelancers" />

      <ListFilterHeader
        freelancersCount={items.length}
        onFilterPress={() => setIsFilterOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      {isLoading ? (
        <FreelancerListSkeleton />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.freelancer_id}
          renderItem={({ item }) =>
            isLoading ? (
              <FreelancerCardSkeleton key={item.freelancer_id} />
            ) : (
              <FreelancerCard freelancer={item} />
            )
          }
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={{ marginVertical: 16 }} />
            ) : null
          }
          ListEmptyComponent={
            !isLoading ? (
              <EmptyState title="No visible freelancers found" />
            ) : null
          }
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 20,
            flexGrow: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <FilterDrawer
        visible={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
};

export default AllVisibleFreelancers;
