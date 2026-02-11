import { Prisma } from "@prisma/client";

export function buildSqlSelect(fields?: string[], alias?: string) {
  if (!fields?.length) return Prisma.sql`*`;

  const prefix = alias ? `${alias}.` : "";

  const parts = fields.map((field) => Prisma.raw(`${prefix}"${field}"`));

  return Prisma.join(parts, ", ");
}
