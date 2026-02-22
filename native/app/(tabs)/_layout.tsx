import { Tabs } from "expo-router";
import {
  Home,
  Briefcase,
  MessageCircle,
  User,
  Search,
} from "lucide-react-native";
import { useColorScheme } from "react-native";
import { PlatformPressable } from "@react-navigation/elements";
import { AppHeader } from "@/components";
import { useAuthStore } from "@/store";
import { USER_ROLE } from "@/types";

/**
 * Wraps the default tab button so the entire tab (icon + label) is one pressable.
 * Uses the same PlatformPressable as the navigator and only adds flex: 1 so the
 * hit area fills the tab cell (fixes icon-only taps not switching tabs).
 */
function TabBarButton(
  props: React.ComponentProps<typeof PlatformPressable> & { children: React.ReactNode }
) {
  const { style, ...rest } = props;
  return (
    <PlatformPressable
      {...rest}
      style={[style, { flex: 1, justifyContent: "center", alignItems: "center" }]}
    />
  );
}

export default function TabsLayout() {
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
        tabBarButton: (props) => <TabBarButton {...props} />,
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
        name="explore-freelancers"
        options={{
          href: user?.role === USER_ROLE.FREELANCER ? null : undefined,
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Search size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
          header: () => (
            <AppHeader showNotification={true} showLocation={true} />
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
          header: () => (
            <AppHeader title="Messages" showNotification={true} />
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
          header: () => (
            <AppHeader title="Profile" showNotification={true} />
          ),
        }}
      />
    </Tabs>
  );
}
