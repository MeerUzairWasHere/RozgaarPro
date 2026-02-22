import { View } from "react-native";
import { AppText as Text } from "./common/AppText";
import SearchBar from "./SearchBar";
import ProfessionsFilter from "./ProfessionsFilter";
import SectionHeader from "./SectionHeader";
import TopRatedFreelancers from "./freelancer/TopRatedFreelancers";
import EmptyState from "./common/EmptyState";
import { MAX_RADIUS_KM } from "@/constants";

type Props = {
  query: string;
  setQuery: (text: string) => void;
  isSearching: boolean;
  isLoading: boolean;
  itemsLength: number;
};

export default function HomeHeader({
  query,
  setQuery,
  isSearching,
  isLoading,
  itemsLength,
}: Props) {
  const hasTyped = query.trim().length > 0;

  return (
    <View className="pt-4">
      <SearchBar value={query} onChange={setQuery} />

      {isSearching && (
        <Text className="text-md text-brand-400 mb-4">
          {itemsLength === 0
            ? `No results for "${query}"`
            : `${itemsLength} result${itemsLength === 1 ? "" : "s"} for "${query}"`}
        </Text>
      )}

      {!hasTyped && !isSearching && (
        <>
          <ProfessionsFilter />
          <TopRatedFreelancers />
        </>
      )}

      {hasTyped && !isSearching && (
        <EmptyState
          title="Start typing to search"
          message="Search by name or profession."
        />
      )}

      {isSearching && !isLoading && itemsLength === 0 && (
        <EmptyState
          title={`No results for "${query}"`}
          message="Try a different name or profession."
        />
      )}
    </View>
  );
}
