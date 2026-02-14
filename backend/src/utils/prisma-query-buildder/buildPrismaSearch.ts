import { ListSearch } from "../../dto";

const aliasToRelation: Record<string, string> = {
  p: "primaryProfession",
  u: "user",
};

export function buildSearch(search?: ListSearch) {
  if (!search?.term) return undefined;

  const fields = search.fields?.length ? search.fields : [];
  if (!fields.length) return undefined;

  const conditions = fields
    .map((field) => {
      // If alias exists, map to relation
      if (field.alias) {
        const relation = aliasToRelation[field.alias];
        if (!relation) return null; // invalid alias

        return {
          [relation]: {
            [field.field]: {
              contains: search.term,
              mode: "insensitive",
            },
          },
        };
      }

      // root-level field (Freelancer table)
      return {
        [field.field]: {
          contains: search.term,
          mode: "insensitive",
        },
      };
    })
    .filter(Boolean);

  if (!conditions.length) return undefined;

  return { OR: conditions };
}
