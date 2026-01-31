export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function emptyPaginatedResponse<T>(
  page: number,
  pageSize: number,
): PaginatedResponse<T> {
  return {
    data: [],
    meta: {
      page,
      pageSize,
      totalItems: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
  };
}
