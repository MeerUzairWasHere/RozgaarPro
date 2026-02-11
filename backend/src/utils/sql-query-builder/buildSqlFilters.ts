import { Prisma } from "@prisma/client";
import { FilterOperator, ListFilter } from "../../dto";
import { ENUM_FIELDS } from "../constants";

export function buildSqlFilters(filters?: ListFilter[]) {
  if (!filters?.length) return Prisma.empty;

  const conditions: Prisma.Sql[] = [];

  for (const filter of filters) {
    const alias = filter.alias ? `${filter.alias}.` : "";
    const column = Prisma.raw(`${alias}"${filter.field}"`);
    const enumType = ENUM_FIELDS[filter.field];

    // helper for enum-safe value
    const value = enumType
      ? Prisma.sql`${filter.value}::${Prisma.raw(enumType)}`
      : Prisma.sql`${filter.value}`;

    switch (filter.operator) {
      case FilterOperator.EQUAL_TO:
        conditions.push(Prisma.sql`${column} = ${value}`);
        break;

      case FilterOperator.NOT_EQUAL_TO:
        conditions.push(Prisma.sql`${column} != ${value}`);
        break;

      case FilterOperator.GREATER_THAN:
        conditions.push(Prisma.sql`${column} > ${filter.value}`);
        break;

      case FilterOperator.GREATER_THAN_OR_EQUAL:
        conditions.push(Prisma.sql`${column} >= ${filter.value}`);
        break;

      case FilterOperator.LESS_THAN:
        conditions.push(Prisma.sql`${column} < ${filter.value}`);
        break;

      case FilterOperator.LESS_THAN_OR_EQUAL:
        conditions.push(Prisma.sql`${column} <= ${filter.value}`);
        break;

      case FilterOperator.IN:
        if (!Array.isArray(filter.value)) continue;
        conditions.push(
          Prisma.sql`${column} IN (${Prisma.join(filter.value)})`,
        );
        break;

      case FilterOperator.NOT_IN:
        if (!Array.isArray(filter.value)) continue;
        conditions.push(
          Prisma.sql`${column} NOT IN (${Prisma.join(filter.value)})`,
        );
        break;

      case FilterOperator.CONTAINS:
        conditions.push(
          Prisma.sql`${column} ILIKE ${"%" + filter.value + "%"}`,
        );
        break;

      case FilterOperator.STARTS_WITH:
        conditions.push(Prisma.sql`${column} ILIKE ${filter.value + "%"}`);
        break;

      case FilterOperator.ENDS_WITH:
        conditions.push(Prisma.sql`${column} ILIKE ${"%" + filter.value}`);
        break;

      case FilterOperator.BETWEEN:
        if (!Array.isArray(filter.value) || filter.value.length !== 2) {
          throw new Error("BETWEEN requires [min, max]");
        }

        conditions.push(
          Prisma.sql`${column} BETWEEN ${filter.value[0]} AND ${filter.value[1]}`,
        );
        break;

      default:
        throw new Error(`Unsupported operator: ${filter.operator}`);
    }
  }

  if (!conditions.length) return Prisma.empty;

  return Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`;
}
