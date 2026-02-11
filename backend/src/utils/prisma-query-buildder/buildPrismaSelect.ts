export function buildSelect(fields?: string[]) {
  if (!fields?.length) return undefined;

  return fields.reduce<Record<string, true>>((acc, field) => {
    acc[field] = true;
    return acc;
  }, {});
}
