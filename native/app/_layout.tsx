import "./global.css";
import ToastManager from "toastify-react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { handleReactQueryError } from "@/lib/reactQueryError";
import { useAuthStore } from "@/store";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
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

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider className={colorScheme === "dark" ? "dark" : ""}>
        <ToastManager position="bottom" toastOptions={{ duration: 1000 }} />
        <Stack
          key={isAuthenticated ? "app" : "auth"} // 👈 CRITICAL
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#121212" : "#F2F2F2",
            },
          }}
        >
          {isAuthenticated ? (
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen name="(auth)/sign-in" />
          )}
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
});
