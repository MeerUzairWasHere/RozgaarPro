import { ListFilter } from "../dto";

const MAX_PAGE_SIZE = 100;

export function buildPagination(pagination?: {
  page?: number;
  pageSize?: number;
}) {
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

export function buildWhere(
  filters?: ListFilter[],
  baseWhere: Record<string, any> = {},
) {
  if (!filters?.length) return baseWhere;

  const where = { ...baseWhere };

  for (const filter of filters) {
    where[filter.field] = mapOperator(filter);
  }

  return where;
}

function mapOperator(filter: ListFilter) {
  switch (filter.operator) {
    case "eq":
      return filter.value;
    case "neq":
      return { not: filter.value };
    case "gt":
      return { gt: filter.value };
    case "gte":
      return { gte: filter.value };
    case "lt":
      return { lt: filter.value };
    case "lte":
      return { lte: filter.value };
    case "in":
      return { in: filter.value };
    case "contains":
      return { contains: filter.value, mode: "insensitive" };
    case "startsWith":
      return { startsWith: filter.value };
    case "endsWith":
      return { endsWith: filter.value };
    default:
      throw new Error(`Unsupported operator: ${filter.operator}`);
  }
}

export function buildOrderBy(
  sort?: { field: string; direction: "asc" | "desc" }[],
) {
  if (!sort?.length) return undefined;

  return sort.map((s) => ({
    [s.field]: s.direction,
  }));
}

export function buildSelect(fields?: string[]) {
  if (!fields?.length) return undefined;

  return fields.reduce<Record<string, true>>((acc, field) => {
    acc[field] = true;
    return acc;
  }, {});
}

export function buildSearch(search?: { term: string; fields?: string[] }) {
  if (!search?.term) return undefined;

  const fields = search.fields?.length ? search.fields : [];

  if (!fields.length) return undefined;

  return {
    OR: fields.map((field) => ({
      [field]: {
        contains: search.term,
        mode: "insensitive",
      },
    })),
  };
}
