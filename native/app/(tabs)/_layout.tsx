import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function ScreensLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#121212" : "#F2F2F2",
        },
      }}
    />
  );
}
