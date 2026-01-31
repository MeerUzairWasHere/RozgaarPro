import clsx from "clsx";
import { View, Text } from "react-native";

interface InitialAvatarProps {
  name: string;
  size?: number;
  className?: string;
}

const InitialAvatar = ({
  name,
  size = 56,
  className = "",
}: InitialAvatarProps) => {
  const initials = name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <View
      style={{ width: size, height: size }}
      className={clsx(
        "bg-primary-500 dark:bg-primary-800 rounded-xl items-center justify-center",
        ...className,
      )}
    >
      <Text
        style={{ fontSize: size / 2.2 }}
        className="text-white font-semibold"
      >
        {initials}
      </Text>
    </View>
  );
};

export default InitialAvatar;
