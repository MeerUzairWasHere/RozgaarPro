import { Prisma } from "@prisma/client";
import { ListSearch } from "../../dto";

export function buildSqlSearch(search?: ListSearch) {
  if (!search?.term || !search.fields?.length) return Prisma.empty;

  const alias = search.alias ? `${search.alias}.` : "";

  const parts = search.fields.map(
    (field) =>
      Prisma.sql`${Prisma.raw(`${alias}"${field}"`)} ILIKE ${
        "%" + search.term + "%"
      }`,
  );

  return Prisma.sql`AND (${Prisma.join(parts, " OR ")})`;
}
