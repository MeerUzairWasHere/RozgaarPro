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

    switch (filter.operator) {
      case "eq":
        if (enumType) {
          conditions.push(
            Prisma.sql`${column} = ${Prisma.sql`${filter.value}::${Prisma.raw(enumType)}`}`,
          );
        } else {
          conditions.push(Prisma.sql`${column} = ${filter.value}`);
        }
        break;

      case "neq":
        if (enumType) {
          conditions.push(
            Prisma.sql`${column} != ${Prisma.sql`${filter.value}::${Prisma.raw(enumType)}`}`,
          );
        } else {
          conditions.push(Prisma.sql`${column} != ${filter.value}`);
        }
        break;

      case "in":
        if (!Array.isArray(filter.value)) continue;
        conditions.push(
          Prisma.sql`${column} IN (${Prisma.join(filter.value)})`,
        );
        break;

      default:
        throw new Error(`Unsupported operator: ${filter.operator}`);
    }
  }

  if (!conditions.length) return Prisma.empty;

  return Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`;
}
