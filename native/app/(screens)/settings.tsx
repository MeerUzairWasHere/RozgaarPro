import { useState } from "react";
import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import {
  ChevronRight,
  Moon,
  Bell,
  Lock,
  Shield,
  Trash2,
} from "lucide-react-native";
import { AppHeader } from "@/components";
import { useThemeStore } from "@/store";

const isRTL = false;

function SectionTitle({
  label,
  destructive = false,
}: {
  label: string;
  destructive?: boolean;
}) {
  return (
    <Text
      className={`text-sm font-semibold uppercase tracking-wider mb-3 px-1 ${
        destructive
          ? "text-accent-red dark:text-accent-redLight"
          : "text-primary-500 dark:text-primary-400"
      }`}
      style={{ textAlign: isRTL ? "right" : "left" }}
    >
      {label}
    </Text>
  );
}

function SettingsCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={`bg-white dark:bg-primary-900 rounded-2xl border border-primary-200 dark:border-primary-800 overflow-hidden ${className}`}
    >
      {children}
    </View>
  );
}

function SettingsRow({
  icon: Icon,
  iconColor,
  title,
  subtitle,
  onPress,
  right,
  destructive = false,
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  iconColor: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  right?: React.ReactNode;
  destructive?: boolean;
}) {
  const content = (
    <View
      className="flex-row items-center justify-between p-4 active:opacity-80"
      style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
    >
      <View
        className="flex-row items-center gap-3 flex-1"
        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
      >
        <View
          className={`w-10 h-10 rounded-xl items-center justify-center ${
            destructive
              ? "bg-accent-red/10 dark:bg-accent-red/20"
              : "bg-primary-100 dark:bg-primary-800"
          }`}
        >
          <Icon size={20} color={destructive ? "#dc2626" : iconColor} />
        </View>
        <View className="flex-1">
          <Text
            className={`font-medium ${
              destructive
                ? "text-accent-red dark:text-accent-redLight"
                : "text-primary-950 dark:text-primary-50"
            }`}
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            {title}
          </Text>
          {subtitle != null && (
            <Text
              className="text-xs text-primary-600 dark:text-primary-400 mt-0.5"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {right != null && (
        <View style={{ marginStart: isRTL ? 0 : 8, marginEnd: isRTL ? 8 : 0 }}>
          {right}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: destructive ? "rgba(220,38,38,0.08)" : "rgba(0,0,0,0.04)",
        }}
      >
        {content}
      </Pressable>
    );
  }
  return content;
}

export default function Settings() {
  const colorScheme = useThemeStore((state) => state.colorScheme);
  const setColorScheme = useThemeStore((state) => state.setColorScheme);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const isDark = colorScheme === "dark";
  const chevronColor = isDark ? "#B3A5F5" : "#6B4EEA";
  const iconColor = isDark ? "#B3A5F5" : "#6B4EEA";

  const handleChangePassword = () => {
    // TODO: Navigate to change password screen or open modal
  };

  const handlePrivacyPolicy = () => {
    // TODO: Open privacy policy URL or screen
  };

  const handleDeleteAccount = () => {
    // TODO: Show confirmation and call delete account API
  };

  return (
    <View className="flex-1 bg-primary-50 dark:bg-primary-950">
      <AppHeader showBack title="Settings" />

      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Appearance */}
        <View className="mb-6">
          <SectionTitle label="Appearance" />
          <SettingsCard>
            <SettingsRow
              icon={Moon}
              iconColor={iconColor}
              title="Dark Mode"
              subtitle="Easier on the eyes at night"
              right={
                <Switch
                  value={isDark}
                  onValueChange={(value) =>
                    setColorScheme(value ? "dark" : "light")
                  }
                  trackColor={{
                    false: isDark ? "#374151" : "#e5e7eb",
                    true: isDark ? "#7c3aed" : "#6B4EEA",
                  }}
                  thumbColor="#fff"
                />
              }
            />
          </SettingsCard>
        </View>

        {/* Notifications */}
        <View className="mb-6">
          <SectionTitle label="Notifications" />
          <SettingsCard className="divide-y divide-primary-200 dark:divide-primary-800">
            <SettingsRow
              icon={Bell}
              iconColor={iconColor}
              title="Push Notifications"
              subtitle="Get notified about new jobs"
              right={
                <Switch
                  value={pushEnabled}
                  onValueChange={setPushEnabled}
                  trackColor={{
                    false: isDark ? "#374151" : "#e5e7eb",
                    true: isDark ? "#7c3aed" : "#6B4EEA",
                  }}
                  thumbColor="#fff"
                />
              }
            />
            <SettingsRow
              icon={Bell}
              iconColor={iconColor}
              title="SMS Alerts"
              subtitle="Receive SMS for important updates"
              right={
                <Switch
                  value={smsEnabled}
                  onValueChange={setSmsEnabled}
                  trackColor={{
                    false: isDark ? "#374151" : "#e5e7eb",
                    true: isDark ? "#7c3aed" : "#6B4EEA",
                  }}
                  thumbColor="#fff"
                />
              }
            />
          </SettingsCard>
        </View>

        {/* Privacy & Security */}
        <View className="mb-6">
          <SectionTitle label="Privacy & Security" />
          <SettingsCard className="divide-y divide-primary-200 dark:divide-primary-800">
            <SettingsRow
              icon={Lock}
              iconColor={iconColor}
              title="Change Password"
              onPress={handleChangePassword}
              right={<ChevronRight size={20} color={chevronColor} />}
            />
            <SettingsRow
              icon={Shield}
              iconColor={iconColor}
              title="Privacy Policy"
              onPress={handlePrivacyPolicy}
              right={<ChevronRight size={20} color={chevronColor} />}
            />
          </SettingsCard>
        </View>

        {/* Danger Zone */}
        <View className="mb-2">
          <SectionTitle label="Danger Zone" destructive />
          <SettingsCard className="border-accent-red/30 dark:border-accent-red/30">
            <SettingsRow
              icon={Trash2}
              iconColor={iconColor}
              title="Delete Account"
              subtitle="Permanently remove your data"
              onPress={handleDeleteAccount}
              right={<ChevronRight size={20} color="#dc2626" />}
              destructive
            />
          </SettingsCard>
        </View>
      </ScrollView>
    </View>
  );
}
