import { Prisma } from "@prisma/client";
import { ListFilter } from "../../dto";

type SqlExpressionBuilder = (filter: ListFilter) => Prisma.Sql;

export const COMPUTED_FIELD_BUILDERS: Record<
  string,
  (filter: ListFilter, ctx: any) => Prisma.Sql
> = {
  distance_km: (filter, ctx) => {
    const { latitude, longitude } = ctx;

    return Prisma.sql`
      get_distance_km(
        ${latitude},
        ${longitude},
        fl.latitude,
        fl.longitude
      ) 
    `;
  },
};
