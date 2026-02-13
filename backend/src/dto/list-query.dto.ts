export enum FilterOperator {
  EQUAL_TO = 1,
  NOT_EQUAL_TO = 2,
  GREATER_THAN = 3,
  GREATER_THAN_OR_EQUAL = 4,
  LESS_THAN = 5,
  LESS_THAN_OR_EQUAL = 6,
  IN = 7,
  NOT_IN = 8,
  CONTAINS = 9,
  STARTS_WITH = 10,
  ENDS_WITH = 11,
  BETWEEN = 12,
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface ListFilter {
  alias?: string;
  field: string;
  operator: FilterOperator;
  value: unknown;
}

export interface ListSort {
  field: string;
  direction: SortDirection;
  alias?: string;
}

export interface ListSearchField {
  alias?: string;
  field: string;
}

export interface ListSearch {
  term: string;
  fields: ListSearchField[];
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
