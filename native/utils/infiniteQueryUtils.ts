export function extractInfiniteList<T>(
  data:
    | {
        pages: {
          data: T[];
          meta?: { totalItems?: number };
        }[];
      }
    | undefined,
) {
  if (!data?.pages) {
    return {
      items: [] as T[],
      totalItems: 0,
    };
  }

  return {
    items: data.pages.flatMap((p) => p.data),
    totalItems: data.pages[0]?.meta?.totalItems ?? 0,
  };
}
