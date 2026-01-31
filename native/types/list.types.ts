// operators supported by backend
export type FilterOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "in"
  | "contains"
  | "startsWith"
  | "endsWith";

// single WHERE condition
export interface ListFilter {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

// ORDER BY
export interface ListSort {
  field: string;
  direction: "asc" | "desc";
}

// pagination block
export interface Pagination {
  page: number;
  pageSize: number;
}

// search block (optional)
export interface ListSearch {
  term: string;
  fields?: string[];
}

// generic list query
export interface ListQuery {
  pagination?: Pagination;
  filters?: ListFilter[];
  sort?: ListSort[];
  search?: ListSearch;
  fields?: string[];
  location?: GeoLocation;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

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
