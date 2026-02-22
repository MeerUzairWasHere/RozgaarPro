import "./global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";
import { useAuthStore, useThemeStore } from "@/store";

export default function RootLayout() {
  const storedScheme = useThemeStore((state) => state.colorScheme);
  const { setColorScheme: setNativeWindScheme } = useColorScheme();

  useEffect(() => {
    setNativeWindScheme(storedScheme);
  }, [storedScheme, setNativeWindScheme]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: 3,
        refetchOnWindowFocus: false,
      },
    },
  });

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider className={storedScheme === "dark" ? "dark" : ""}>
        <Stack
          key={isAuthenticated ? "app" : "auth"} // 👈 CRITICAL
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: storedScheme === "dark" ? "#121212" : "#F2F2F2",
            },
            contentStyle: {
              backgroundColor: storedScheme === "dark" ? "#121212" : "#F2F2F2",
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
}
