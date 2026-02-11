import { Prisma, PrismaClient } from "@prisma/client";
import { ListFilter, ListQueryDto, ListSort, Pagination } from "../../dto";
import { buildPagination } from "../prisma-query-buildder/buildPrismaPagination";
import { buildSqlFilters } from "./buildSqlFilters";
import { buildSqlOrderBy } from "./buildSqlOrderBy";
import { PaginatedResponse } from "../../types";

export async function executePaginatedRawQuery<T>({
  prisma,
  baseQuery,
  countQuery,
  query,
  defaultFilters = [],
  defaultSort = [],
  defaultPagination = { page: 1, pageSize: 25 },
}: {
  prisma: PrismaClient;
  baseQuery: (
    sqlFilters: Prisma.Sql,
    sqlOrder: Prisma.Sql,
    take: number,
    skip: number,
  ) => Prisma.Sql;
  countQuery: (sqlFilters: Prisma.Sql) => Prisma.Sql;
  query: ListQueryDto;
  defaultFilters?: ListFilter[];
  defaultSort?: ListSort[];
  defaultPagination?: Pagination;
}): Promise<PaginatedResponse<T>> {
  const { page, pageSize, skip, take } = buildPagination(
    query.pagination ?? defaultPagination,
  );

  const sqlFilters = buildSqlFilters(
    [...defaultFilters, ...(query.filters ?? [])],
    {
      latitude: query.location?.latitude ?? 0,
      longitude: query.location?.longitude ?? 0,
    },
  );

  const sqlOrder = buildSqlOrderBy([...defaultSort, ...(query.sort ?? [])]);

  const data = await prisma.$queryRaw<T[]>(
    baseQuery(sqlFilters, sqlOrder, take, skip),
  );

  const countResult = await prisma.$queryRaw<{ count: number }[]>(
    countQuery(sqlFilters),
  );

  const totalItems = Number(countResult[0]?.count ?? 0);

  return {
    data,
    meta: {
      page,
      pageSize,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      hasNext: page * pageSize < totalItems,
      hasPrev: page > 1,
    },
  };
}
