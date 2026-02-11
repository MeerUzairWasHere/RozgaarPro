import { Prisma } from "@prisma/client";
import { Pagination } from "../../dto";
import { buildPagination } from "../prisma-query-buildder/buildPrismaPagination";

export function buildSqlPagination(pagination?: Pagination) {
  const { skip, take } = buildPagination(pagination);

  return Prisma.sql`LIMIT ${take} OFFSET ${skip}`;
}
