import { Pagination } from "../../dto";

const MAX_PAGE_SIZE = 100;

export function buildPagination(pagination?: Pagination) {
  const page = Math.max(1, pagination?.page ?? 1);
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, pagination?.pageSize ?? 25),
  );

  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
}
