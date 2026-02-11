import { Tabs } from "expo-router";
import { Home, Briefcase, MessageCircle, User } from "lucide-react-native";
import { useColorScheme } from "react-native";
import { AppHeader } from "@/components";
import { useAuthStore } from "@/store";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { user } = useAuthStore();

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
          display: user?.profileCompleted ? "flex" : "none",
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
          header: () => <AppHeader title="Find Jobs" showNotification={true} />,
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
          header: () => <AppHeader title="Messages" showNotification={true} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
          // Custom header for Profile tab
          header: () => <AppHeader title="Profile" showNotification={true} />,
        }}
      />
      <Tabs.Screen
        name="complete-profile"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
