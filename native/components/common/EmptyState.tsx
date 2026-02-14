import { Search } from "lucide-react-native";
import { View, Text } from "react-native";

type Props = {
  title: string;
  message?: string;
};

export default function EmptyState({
  title,
  message = "Try changing your filters or search in another location.",
}: Props) {
  return (
    <View className="flex-1 items-center py-20 px-6">
      <View className="w-16 h-16 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/30 mb-4">
        <Search color="#FFF" size={32} />
      </View>

      <Text className="text-lg font-semibold text-primary-900 dark:text-primary-50 text-center">
        {title}
      </Text>

      <Text className="text-sm text-primary-600 dark:text-primary-300 text-center mt-2">
        {message}
      </Text>
    </View>
  );
}
