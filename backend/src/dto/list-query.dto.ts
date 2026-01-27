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
  field: string;
  operator: FilterOperator;
  value: unknown;
}

export interface ListSort {
  field: string;
  direction: "asc" | "desc";
}

export interface ListSearch {
  term: string;
  fields?: string[];
}

export interface Pagination {
  page?: number;
  pageSize?: number;
}

export interface ListQueryDto {
  pagination?: Pagination;
  filters?: ListFilter[];
  sort?: ListSort[];
  search?: ListSearch;
  fields?: string[];
}

