import "./global.css";
import ToastManager from "toastify-react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider className={colorScheme === "dark" ? "dark" : ""}>
      <ToastManager position="bottom" toastOptions={{ duration: 3000 }} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  );
}
