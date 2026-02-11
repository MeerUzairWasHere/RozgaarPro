import { Prisma } from "@prisma/client";
import { ListFilter } from "../../dto";
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
      case "eq":
        conditions.push(Prisma.sql`${column} = ${value}`);
        break;

      case "neq":
        conditions.push(Prisma.sql`${column} != ${value}`);
        break;

      case "gt":
        conditions.push(Prisma.sql`${column} > ${filter.value}`);
        break;

      case "gte":
        conditions.push(Prisma.sql`${column} >= ${filter.value}`);
        break;

      case "lt":
        conditions.push(Prisma.sql`${column} < ${filter.value}`);
        break;

      case "lte":
        conditions.push(Prisma.sql`${column} <= ${filter.value}`);
        break;

      case "in":
        if (!Array.isArray(filter.value)) continue;
        conditions.push(
          Prisma.sql`${column} IN (${Prisma.join(filter.value)})`,
        );
        break;

      case "nin":
        if (!Array.isArray(filter.value)) continue;
        conditions.push(
          Prisma.sql`${column} NOT IN (${Prisma.join(filter.value)})`,
        );
        break;

      case "contains":
        conditions.push(
          Prisma.sql`${column} ILIKE ${"%" + filter.value + "%"}`,
        );
        break;

      case "startsWith":
        conditions.push(Prisma.sql`${column} ILIKE ${filter.value + "%"}`);
        break;

      case "endsWith":
        conditions.push(Prisma.sql`${column} ILIKE ${"%" + filter.value}`);
        break;

      default:
        throw new Error(`Unsupported operator: ${filter.operator}`);
    }
  }

  if (!conditions.length) return Prisma.empty;

  return Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`;
}
