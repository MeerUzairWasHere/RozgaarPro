import { Prisma } from "@prisma/client";
import { ListSort } from "../../dto";

export function buildSqlOrderBy(sort?: ListSort[]) {
  if (!sort?.length) return Prisma.empty;

  const parts: Prisma.Sql[] = [];

  for (const s of sort) {
    const alias = s.alias ? `${s.alias}.` : "";
    const column = Prisma.raw(`${alias}"${s.field}"`);
    const direction = s.direction.toUpperCase();

    parts.push(Prisma.sql`${column} ${Prisma.raw(direction)}`);
  }

  return Prisma.sql`ORDER BY ${Prisma.join(parts, ", ")}`;
}
