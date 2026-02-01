export const getExperienceLabel = (value: number) => {
  const years = Math.floor(value);
  const months = Math.round((value - years) * 12);

  if (years === 0 && months === 0) return null;

  if (months === 12) {
    return `${years + 1} year${years + 1 > 1 ? "s" : ""}`;
  }

  return `${years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""}${
    years > 0 && months > 0 ? " " : ""
  }${months > 0 ? `${months} month${months > 1 ? "s" : ""}` : ""}`;
};
