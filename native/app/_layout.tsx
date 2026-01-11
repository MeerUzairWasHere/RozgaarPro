import { Stack } from "expo-router";
import ToastManager from "toastify-react-native";

export default function RootLayout() {
  return (
    <>
      <ToastManager position="bottom"  toastOptions={{ duration: 3000 }} />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/signup" />
        <Stack.Screen name="(auth)/forgot-password" />
        <Stack.Screen name="(screens)/onboarding" />
        <Stack.Screen name="(screens)/role-select" />
        <Stack.Screen name="(screens)/home" />
      </Stack>
    </>
  );
}
