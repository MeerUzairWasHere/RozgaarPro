import { useLocationStore } from "@/store/useLocationStore";
import { MapPin } from "lucide-react-native";
import { View, Text } from "react-native";

const LocationHeader = () => {
  const { location, loading } = useLocationStore();

  return (
    <View className="flex-row items-center gap-2">
      <View className="p-2 bg-primary-100 dark:bg-primary-100 rounded-full">
        <MapPin size={18} />
      </View>
      <View className="text-left">
        <Text className="text-sm text-primary-500 dark:text-primary-200">
          Your Location
        </Text>
        <Text className="text-sm font-semibold text-primary-900 dark:text-primary-100   ">
          {loading ? "Loading..." : location || "PleasEnable location"}
        </Text>
      </View>
    </View>
  );
};
export default LocationHeader;
