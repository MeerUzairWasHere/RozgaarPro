import { Stack } from "expo-router";
import ToastManager from "toastify-react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <>
      <ToastManager position="bottom" toastOptions={{ duration: 3000 }} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
