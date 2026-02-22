import { View } from "react-native";
import { AppText as Text } from "./AppText";
import CustomTouchableOpacityButton from "./CustomTouchableOpacityButton";
import { Filter } from "lucide-react-native";
import { useTranslation } from "react-i18next";

type Props = {
  freelancersCount: number;
  onFilterPress: () => void;
  label?: string;
  activeFilterCount?: number;
};

const ListFilterHeader = ({
  freelancersCount,
  onFilterPress,
  activeFilterCount = 0,
}: Props) => {
  const { t } = useTranslation();
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white dark:bg-primary-900">
      <Text className="text-sm font-pmedium text-primary-700 dark:text-primary-300">
        {freelancersCount === 0
          ? t("no_freelancers_found")
          : t("freelancers_found", { count: freelancersCount })}
      </Text>

      <View className="relative">
        <CustomTouchableOpacityButton
          onPress={onFilterPress}
          className="flex-row items-center gap-2 px-4 h-9 py-1 rounded-full bg-brand/80 dark:bg-brand/40"
          leftIcon={<Filter size={20} color="#fff" />}
          title={t("filter")}
        />

        {/* Badge - only show when filters are active */}
        {activeFilterCount > 0 && (
          <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[20px] h-5 items-center justify-center px-1.5">
            <Text className="text-white text-xs font-pbold">
              {activeFilterCount}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ListFilterHeader;
