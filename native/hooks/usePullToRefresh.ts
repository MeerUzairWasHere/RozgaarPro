import { useState, useCallback } from "react";
import { useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";

export function usePullToRefresh(filters?: InvalidateQueryFilters) {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await queryClient.invalidateQueries(filters);
    } finally {
      setRefreshing(false);
    }
  }, [queryClient, filters]);

  return {
    refreshing,
    onRefresh,
  };
}
