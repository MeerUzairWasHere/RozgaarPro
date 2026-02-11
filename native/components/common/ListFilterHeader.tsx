import CustomTouchableOpacityButton from "./CustomTouchableOpacityButton";
import { View, Text } from "react-native";
import { Filter } from "lucide-react-native";

const ListFilterHeader = ({
  freelancersCount = 0,
  onFilterPress,
  label,
}: {
  freelancersCount: number;
  onFilterPress: () => void;
  label?: string;
}) => {
  return (
    <View className="px-6 h-16 flex-row items-center justify-between border-b border-primary-200 dark:border-primary-800 dark:bg-primary-950">
      <Text className="text-xl text-brand-400">
        {freelancersCount}{" "}
        {label
          ? `${label}${freelancersCount > 1 ? "s" : ""}`
          : `freelancer${freelancersCount > 1 ? "s" : ""}`}{" "}
        found
      </Text>

      <CustomTouchableOpacityButton
        onPress={onFilterPress}
        className="flex-row items-center gap-2 px-4 h-9 py-1 rounded-full bg-brand/80 dark:bg-brand/40 relative"
        leftIcon={<Filter size={20} color="#fff" />}
        title="Filter"
      />
    </View>
  );
};

export default ListFilterHeader;
