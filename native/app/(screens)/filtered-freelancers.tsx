import {
  CustomTouchableOpacityButton,
  FreelancerCard,
  SectionHeader,
} from "@/components";
import AppHeader from "@/components/common/AppHeader";
import { FreelancerListSkeleton } from "@/components/Skeletons";
import { useGetFilteredVisibleFreelancers } from "@/mutations";
import { useLocationStore } from "@/store";
import { FilterOperator } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { Filter } from "lucide-react-native";
import { View, Text, FlatList } from "react-native";

export default function FreelancerFilterView() {
  const { professionId, professionName } = useLocalSearchParams<{
    professionId: string;
    professionName: string;
  }>();
  const { coordinates } = useLocationStore();

  const { data: freelancers } = useGetFilteredVisibleFreelancers({
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

  if (!freelancers)
    return <FreelancerListSkeleton professionName={professionName} />;

  return (
    <>
      <AppHeader showBack={true} title={`${professionName}s Nearby`} />

      <View className="px-6 h-16 flex-row items-center justify-between border-b border-primary-200 dark:border-primary-800 dark:bg-primary-950">
        {/* Freelancers count */}
        <Text className="text-xl text-brand-400">
          {freelancers?.meta.totalItems || 0} workers found
        </Text>

        {/* Filter button */}
        <CustomTouchableOpacityButton
          onPress={() => console.log("Filter pressed")}
          className="flex-row items-center gap-2 px-4 h-9 py-1 rounded-full bg-brand/80 dark:bg-brand/40 relative"
          leftIcon={<Filter size={20} color="#fff" />}
          title="Filter"
        />
      </View>

      <FlatList
        data={freelancers?.data}
        keyExtractor={(item) => item.freelancer_id}
        renderItem={({ item }) => <FreelancerCard freelancer={item} />}
        scrollEnabled={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
