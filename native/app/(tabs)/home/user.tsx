import { FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FreelancerCard, HomeHeader } from "@/components";
import {
  useDebouncedValue,
  useFreelancerSearch,
  usePullToRefresh,
} from "@/hooks";

const UserHomeScreen = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 400);

  const {
    items,
    isSearching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFreelancerSearch(debouncedQuery);

  const height = useBottomTabBarHeight();

  const { refreshing, onRefresh } = usePullToRefresh();

  return (
    <FlatList
      data={isSearching ? items : []}
      keyExtractor={(item, index) => item?.freelancer_id ?? index.toString()}
      renderItem={({ item, index }) =>
        isSearching ? <FreelancerCard freelancer={item} /> : null
      }
      ListHeaderComponent={
        <HomeHeader
          query={query}
          setQuery={setQuery}
          isSearching={isSearching}
          isLoading={isLoading}
          itemsLength={items.length}
        />
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
