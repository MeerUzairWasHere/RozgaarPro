import {
  AppHeader,
  FreelancerCard,
  ListFilterHeader,
  FreelancerListSkeleton,
  FilterDrawer,
  FreelancerCardSkeleton,
} from "@/components";

import { useLocationStore } from "@/store";
import { FlatList, ActivityIndicator } from "react-native";
import { useGetAllVisibleFreelancers } from "@/mutations";
import { extractInfiniteList } from "@/utils";
import { useState } from "react";
import { ListFilter, ListSort } from "@/types";

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

  return (
    <>
      <AppHeader showBack title="All visible freelancers" />

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
              <FreelancerCardSkeleton />
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
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 20,
            flexGrow: 1,
          }}
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
