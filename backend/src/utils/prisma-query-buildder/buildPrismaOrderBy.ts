import { ListSort } from "../../dto";

export function buildOrderBy(sort?: ListSort[]) {
  if (!sort?.length) return undefined;

  return sort.map((s) => ({
    [s.field]: s.direction,
  }));
}
