import { ListFilter } from "../../dto";

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
