import {
  SearchBar,
  ProfessionsFilter,
  SectionHeader,
  FreelancerCard,
  EmptyState,
  TopRatedFreelancers,
} from "@/components";
import {
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocationStore } from "@/store";
import { useGetAllVisibleFreelancersBySearch } from "@/mutations";
import { extractInfiniteList } from "@/utils";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const UserHomeScreen = () => {
  const queryClient = useQueryClient();
  const { coordinates } = useLocationStore();
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedQuery(query);
  //   }, 400);

  //   return () => clearTimeout(timer);
  // }, [query]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries();
    setRefreshing(false);
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllVisibleFreelancersBySearch({
      location: coordinates,
      search: debouncedQuery
        ? {
            term: debouncedQuery,
            fields: [
              { alias: "p", field: "name" },
              { alias: "u", field: "name" },
            ],
          }
        : undefined,
      pagination: {
        pageSize: 15,
        page: 1,
      },
    });

  const { items } = extractInfiniteList(data);

  const isSearching = debouncedQuery.trim().length > 0;
  const height = useBottomTabBarHeight();

  return (
    <FlatList
      data={isSearching ? items : []}
      keyExtractor={(item, index) => item?.freelancer_id ?? index.toString()}
      renderItem={({ item }) =>
        isSearching ? <FreelancerCard freelancer={item} /> : null
      }
      ListHeaderComponent={
        <View className="pt-4">
          <SearchBar value={query} onChange={setQuery} />
          {isSearching && (
            <Text className="text-md text-brand-400  mb-4">
              {items.length} result{items.length > 1 ? "s" : ""} for "{query}"
            </Text>
          )}
          {!isSearching && (
            <>
              <SectionHeader title="What do you need?" />
              <ProfessionsFilter />
              <TopRatedFreelancers />
            </>
          )}
          {isSearching && !isLoading && items.length === 0 && (
            <EmptyState
              title="No freelancers found"
              message="Try a different name or profession."
            />
          )}
        </View>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      contentContainerStyle={{
        paddingBottom: 20 + height,
        flexGrow: 1,
        paddingHorizontal: 16,
      }}
      showsVerticalScrollIndicator={false}
      onEndReached={() => {
        if (isSearching && hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.4}
      ListFooterComponent={
        isSearching && isFetchingNextPage ? (
          <ActivityIndicator style={{ marginVertical: 16 }} />
        ) : null
      }
    />
  );
};

export default UserHomeScreen;
