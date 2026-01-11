import { Stack } from "expo-router";
import ToastManager from "toastify-react-native";
import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ToastManager position="bottom" toastOptions={{ duration: 3000 }} />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
