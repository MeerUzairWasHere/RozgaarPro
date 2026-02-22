import "./global.css";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";
import { useFonts } from "@expo-google-fonts/noto-nastaliq-urdu/useFonts";
import {
  NotoNastaliqUrdu_400Regular,
  NotoNastaliqUrdu_500Medium,
  NotoNastaliqUrdu_600SemiBold,
  NotoNastaliqUrdu_700Bold,
} from "@expo-google-fonts/noto-nastaliq-urdu";
import { useAuthStore, useThemeStore } from "@/store";
import { initI18n } from "@/src/i18n";

export default function RootLayout() {
  const storedScheme = useThemeStore((state) => state.colorScheme);
  const { setColorScheme: setNativeWindScheme } = useColorScheme();
  const [i18nReady, setI18nReady] = useState(false);

  const [fontsLoaded] = useFonts({
    NotoNastaliqUrdu_400Regular,
    NotoNastaliqUrdu_500Medium,
    NotoNastaliqUrdu_600SemiBold,
    NotoNastaliqUrdu_700Bold,
  });

  useEffect(() => {
    initI18n()
      .then(() => setI18nReady(true))
      .catch(() => setI18nReady(true));
  }, []);

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

  if (!i18nReady || !fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#121212" }} />;
  }

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
