import { useAuthStore } from "@/store";
import { USER_ROLE } from "@/types";
import { Tabs } from "expo-router";
import { Home, Briefcase, MessageCircle, User } from "lucide-react-native";
import { useColorScheme } from "react-native";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { user } = useAuthStore();

  // Colors based on your Tailwind config
  const colors = {
    light: {
      background: "#F2F2F2",
      card: "#FFFFFF",
      text: "#1A1A1A",
      textSecondary: "#666666",
      border: "#E6E6E6",
      active: "#1A1A1A",
    },
    dark: {
      background: "#121212",
      card: "#1A1A1A",
      text: "#F2F2F2",
      textSecondary: "#999999",
      border: "#333333",
      active: "#F2F2F2",
    },
  };

  const theme = isDark ? colors.dark : colors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display:
            user?.profileCompleted && user?.role === USER_ROLE.FREELANCER
              ? "flex"
              : "none",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          borderBottomColor: theme.border,
          position: "absolute",
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
          bottom: 20,
        },
        tabBarActiveTintColor: theme.active,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Home size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color, focused }) => (
            <Briefcase
              size={24}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, focused }) => (
            <MessageCircle
              size={24}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="freelancer-onboarding" // 👈 CRITICAL
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
