import { View, Text } from "react-native";
import CustomTouchableOpacityButton from "./CustomTouchableOpacityButton";
import { Filter } from "lucide-react-native";

const ListFilterHeader = ({
  freelancersCount = 0,
}: {
  freelancersCount: number;
}) => {
  return (
    <View className="px-6 h-16 flex-row items-center justify-between border-b border-primary-200 dark:border-primary-800 dark:bg-primary-950">
      {/* Freelancers count */}
      <Text className="text-xl text-brand-400">
        {freelancersCount} workers found
      </Text>

      {/* Filter button */}
      <CustomTouchableOpacityButton
        onPress={() => console.log("Filter pressed")}
        className="flex-row items-center gap-2 px-4 h-9 py-1 rounded-full bg-brand/80 dark:bg-brand/40 relative"
        leftIcon={<Filter size={20} color="#fff" />}
        title="Filter"
      />
    </View>
  );
};
export default ListFilterHeader;
