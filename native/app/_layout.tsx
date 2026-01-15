import "./global.css";
import ToastManager from "toastify-react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { handleReactQueryError } from "@/lib/reactQueryError";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: 3,
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: handleReactQueryError,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider className={colorScheme === "dark" ? "dark" : ""}>
        <ToastManager position="bottom" toastOptions={{ duration: 3000 }} />
        <Stack
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#121212" : "#F2F2F2",
            },
          }}
        />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
