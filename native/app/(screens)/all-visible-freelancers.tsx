import {
  AppHeader,
  CustomTouchableOpacityButton,
  FreelancerCard,
  ListFilterHeader,
} from "@/components";
import { FreelancerListSkeleton } from "@/components/Skeletons";
import { useGetFilteredVisibleFreelancers } from "@/mutations";
import { useLocationStore } from "@/store";
import { Filter } from "lucide-react-native";
import { View, Text, FlatList } from "react-native";
const AllVisibleFreelancers = () => {
  const { coordinates } = useLocationStore();

  const { data: freelancers } = useGetFilteredVisibleFreelancers({
    location: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
    pagination: {
      page: 1,
      pageSize: 5,
    },
  });

  if (!freelancers) return <FreelancerListSkeleton />;

  return (
    <>
      <AppHeader showBack={true} title="All visible freelancers" />
      <ListFilterHeader freelancersCount={freelancers?.meta.totalItems || 0} />
      <FlatList
        data={freelancers?.data}
        keyExtractor={(item) => item.freelancer_id}
        renderItem={({ item }) => <FreelancerCard freelancer={item} />}
        scrollEnabled={true}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};
export default AllVisibleFreelancers;
