import { FilterOperator, ListFilter } from "../../dto";

function mapOperator(filter: ListFilter) {
  switch (filter.operator) {
    case FilterOperator.EQUAL_TO:
      return filter.value;
    case FilterOperator.NOT_EQUAL_TO:
      return { not: filter.value };
    case FilterOperator.GREATER_THAN:
      return { gt: filter.value };
    case FilterOperator.GREATER_THAN_OR_EQUAL:
      return { gte: filter.value };
    case FilterOperator.LESS_THAN:
      return { lt: filter.value };
    case FilterOperator.LESS_THAN_OR_EQUAL:
      return { lte: filter.value };
    case FilterOperator.IN:
      return { in: filter.value };
    case FilterOperator.CONTAINS:
      return { contains: filter.value, mode: "insensitive" };
    case FilterOperator.STARTS_WITH:
      return { startsWith: filter.value };
    case FilterOperator.ENDS_WITH:
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
