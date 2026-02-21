import { useGetAllVisibleFreelancersBySearch } from "@/mutations";
import { useLocationStore } from "@/store";
import { FilterOperator } from "@/types";
import { extractInfiniteList } from "@/utils";

export function useFreelancerSearch(query: string) {
  const { coordinates } = useLocationStore();

  const isSearching = query.trim().length >= 3;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllVisibleFreelancersBySearch({
      location: coordinates,
      search: isSearching
        ? {
            term: query,
            fields: [
              { alias: "p", field: "name" },
              { alias: "u", field: "name" },
            ],
          }
        : undefined,
      pagination: {
        pageSize: 15,
        page: 1,
      },
    });

  const { items } = extractInfiniteList(data);

  return {
    items,
    isSearching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
