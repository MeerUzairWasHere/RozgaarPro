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

export interface ListFilter {
  alias?: string;
  field: string;
  operator: FilterOperator;
  value: unknown;
}

export interface ListSort {
  field: string;
  direction: "asc" | "desc";
  alias?: string;
}

export interface ListSearch {
  term: string;
  fields?: string[];
  alias?: string;
}

export interface Pagination {
  page?: number;
  pageSize?: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ListQueryDto {
  pagination?: Pagination;
  filters?: ListFilter[];
  sort?: ListSort[];
  search?: ListSearch;
  fields?: string[];
  location?: Coordinates;
}

