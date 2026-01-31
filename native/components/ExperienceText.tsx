import { experienceLevels } from "@/constants";
import { EXPERIENCE_LEVEL } from "@/types";
import { Text } from "react-native";

export const experienceToLevel = (experience: number): EXPERIENCE_LEVEL => {
  if (experience < 1) return EXPERIENCE_LEVEL.LESS_THAN_ONE_YEAR;
  if (experience <= 3) return EXPERIENCE_LEVEL.ONE_TO_THREE_YEARS;
  if (experience <= 5) return EXPERIENCE_LEVEL.THREE_TO_FIVE_YEARS;
  if (experience <= 10) return EXPERIENCE_LEVEL.FIVE_TO_TEN_YEARS;
  return EXPERIENCE_LEVEL.MORE_THAN_TEN_YEARS;
};

export const getExperienceTitle = (experience: number): string => {
  const level = experienceToLevel(experience);

  return (
    experienceLevels.find((l) => l.value === level)?.title ??
    "Experience not specified"
  );
};

const ExperienceText = ({ experience }: { experience: number }) => {
  return (
    <Text className="text-xs text-primary-600 dark:text-primary-400">
      • {getExperienceTitle(experience)}
    </Text>
  );
};

export default ExperienceText;
