import { Prisma } from "@prisma/client";
import { ListSearch } from "../../dto";

export function buildSqlSearch(search?: ListSearch) {
  if (!search?.term || !search.fields?.length) {
    return Prisma.empty;
  }

  const parts = search.fields.map(({ alias, field }) => {
    const prefix = alias ? `${alias}.` : "";
    return Prisma.sql`${Prisma.raw(
      `${prefix}"${field}"`,
    )} ILIKE ${"%" + search.term + "%"}`;
  });

  return Prisma.sql`AND (${Prisma.join(parts, " OR ")})`;
}
