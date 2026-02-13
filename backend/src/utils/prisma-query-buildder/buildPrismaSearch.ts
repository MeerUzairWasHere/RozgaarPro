import { ListSearch } from "../../dto";

export function buildSearch(search?: ListSearch) {
  if (!search?.term) return undefined;

  const fields = search.fields?.length ? search.fields : [];

  if (!fields.length) return undefined;

  return {
    OR: fields.map((field) => ({
      [field.field]: {
        contains: search.term,
        mode: "insensitive",
      },
    })),
  };
}
