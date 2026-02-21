import { Tabs } from "expo-router";
import {
  Home,
  Briefcase,
  MessageCircle,
  User,
  Search,
} from "lucide-react-native";
import { useColorScheme } from "react-native";
import { AppHeader } from "@/components";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store";
import { USER_ROLE } from "@/types";

export default function TabsLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const user = useAuthStore((state) => state.user);
  const colors = {
    light: {
      background: "#F5F5F7",
      card: "#FFFFFF",
      tabBar: "#6B4EEA",
      text: "#1A1A1A",
      textSecondary: "#666666",
      textOnBrand: "#FFFFFF",
      border: "#E6E6E6",
      active: "#6B4EEA",
    },
    dark: {
      background: "#121212",
      card: "#1A1A1A",
      tabBar: "#5A3DD6",
      text: "#F2F2F2",
      textSecondary: "#999999",
      textOnBrand: "#FFFFFF",
      border: "#333333",
      active: "#B3A5F5",
    },
  };

  const theme = isDark ? colors.dark : colors.light;

  return (
    <Tabs
      screenOptions={{
        // Enable header for all tabs
        sceneStyle: {
          backgroundColor: theme.background,
        },
        headerShown: true,
        // Default header component
        header: () => <AppHeader showLocation={true} showNotification={true} />,
        tabBarStyle: {
          display: "flex",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          backgroundColor: theme.tabBar,
          borderTopWidth: 0,
          position: "absolute",
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: "#6B4EEA",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
          bottom: 20,
        },
        tabBarActiveTintColor: theme.textOnBrand,
        tabBarInactiveTintColor: "rgba(255,255,255,0.6)",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("home"),
          tabBarIcon: ({ color, focused }) => (
            <Home size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      {user?.role === USER_ROLE.FREELANCER && (
        <Tabs.Screen
          name="explore-freelancers"
          options={{
            href: user?.role === USER_ROLE.FREELANCER ? null : undefined,
            title: t("search"),
            tabBarIcon: ({ color, focused }) => (
              <Search size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
            ),
            header: () => (
              <AppHeader showNotification={true} showLocation={true} />
            ),
          }}
        />
      )}
      <Tabs.Screen
        name="messages"
        options={{
          title: t("messages"),
          tabBarIcon: ({ color, focused }) => (
            <MessageCircle
              size={24}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
          header: () => (
            <AppHeader title={t("messages")} showNotification={true} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("profile"),
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
          header: () => (
            <AppHeader title={t("profile")} showNotification={true} />
          ),
        }}
      />
    </Tabs>
  );
}
