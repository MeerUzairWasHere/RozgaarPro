import { View } from "react-native";
import { Text } from "react-native";

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
    <View style={{ width: size, height: size }} className={className}>
      <Text
        style={{ fontSize: size / 2.2 }}
        className="dark:text-white text-2xl font-semibold"
      >
        {initials}
      </Text>
    </View>
  );
};

export default InitialAvatar;
