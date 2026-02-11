import { AppHeader, FreelancerCard, ListFilterHeader } from "@/components";
import { FreelancerListSkeleton } from "@/components/Skeletons";
import { useLocationStore } from "@/store";
import { FlatList, ActivityIndicator } from "react-native";
import { useGetAllVisibleFreelancers } from "@/mutations";
import { extractInfiniteList } from "@/utils";

const AllVisibleFreelancers = () => {
  const { coordinates } = useLocationStore();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllVisibleFreelancers({
      location: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    });

  const { items, totalItems } = extractInfiniteList(data);

  if (isLoading) {
    return <FreelancerListSkeleton />;
  }

  return (
    <>
      <AppHeader showBack title="All visible freelancers" />
      <ListFilterHeader freelancersCount={totalItems} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.freelancer_id}
        renderItem={({ item }) => <FreelancerCard freelancer={item} />}
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
          flexGrow: 1, // add this
        }}
      />
    </>
  );
};

export default AllVisibleFreelancers;
