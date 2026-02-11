import { AppHeader, FreelancerCard, ListFilterHeader } from "@/components";
import { FreelancerListSkeleton } from "@/components/Skeletons";
import { useLocationStore } from "@/store";
import { FlatList, ActivityIndicator } from "react-native";
import { useGetAllVisibleFreelancers } from "@/mutations";

const AllVisibleFreelancers = () => {
  const { coordinates } = useLocationStore();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllVisibleFreelancers({
      location: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    });

  const freelancers = data?.pages.flatMap((p) => p.data) ?? [];
  const totalItems = data?.pages[0]?.meta.totalItems ?? 0;

  if (isLoading) {
    return <FreelancerListSkeleton />;
  }

  return (
    <>
      <AppHeader showBack title="All visible freelancers" />
      <ListFilterHeader freelancersCount={totalItems} />

      <FlatList
        data={freelancers}
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
        }}
      />
    </>
  );
};

export default AllVisibleFreelancers;
