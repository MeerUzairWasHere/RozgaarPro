import { useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Modal,
  Switch,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import { AppText as Text } from "@/components";
import { useTranslation } from "react-i18next";
import {
  Globe,
  ChevronRight,
  Moon,
  Bell,
  Lock,
  Shield,
  Trash2,
} from "lucide-react-native";
import { AppHeader } from "@/components";
import { useThemeStore } from "@/store";
import { useAppLanguage } from "@/src/i18n/useAppLanguage";
import type { LanguageCode } from "@/src/i18n/languages";

const isRTL = I18nManager.isRTL;

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
  const { t } = useTranslation();
  const { language, setLanguage, LANGUAGES } = useAppLanguage();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const colorScheme = useThemeStore((state) => state.colorScheme);
  const setColorScheme = useThemeStore((state) => state.setColorScheme);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const isDark = colorScheme === "dark";
  const chevronColor = isDark ? "#B3A5F5" : "#6B4EEA";
  const iconColor = isDark ? "#B3A5F5" : "#6B4EEA";

  const currentLang = LANGUAGES[language];

  const handleSelectLanguage = async (code: LanguageCode) => {
    await setLanguage(code);
    setLanguageModalVisible(false);
  };

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
      <AppHeader showBack title={t("settings")} />

      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Appearance */}
        <View className="mb-6">
          <SectionTitle label={t("appearance")} />
          <SettingsCard>
            <SettingsRow
              icon={Moon}
              iconColor={iconColor}
              title={t("dark_mode")}
              subtitle={t("dark_mode_desc")}
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
          <SectionTitle label={t("notifications")} />
          <SettingsCard className="divide-y divide-primary-200 dark:divide-primary-800">
            <SettingsRow
              icon={Bell}
              iconColor={iconColor}
              title={t("push_notifications")}
              subtitle={t("push_notifications_desc")}
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
              title={t("sms_alerts")}
              subtitle={t("sms_alerts_desc")}
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
          <SectionTitle label={t("privacy_security")} />
          <SettingsCard className="divide-y divide-primary-200 dark:divide-primary-800">
            <SettingsRow
              icon={Lock}
              iconColor={iconColor}
              title={t("change_password")}
              onPress={handleChangePassword}
              right={<ChevronRight size={20} color={chevronColor} />}
            />
            <SettingsRow
              icon={Shield}
              iconColor={iconColor}
              title={t("privacy_policy")}
              onPress={handlePrivacyPolicy}
              right={<ChevronRight size={20} color={chevronColor} />}
            />
          </SettingsCard>
        </View>

        {/* Language */}
        <View className="mb-6">
          <SectionTitle label={t("language")} />
          <SettingsCard>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setLanguageModalVisible(true)}
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              className="flex-row items-center justify-between p-4"
            >
              <View
                className="flex-row items-center gap-3 flex-1"
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              >
                <View className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-xl items-center justify-center">
                  <Globe size={20} color={iconColor} />
                </View>
                <View className="flex-1">
                  <Text
                    className="font-medium text-primary-950 dark:text-primary-50"
                    style={{ textAlign: isRTL ? "right" : "left" }}
                  >
                    {t("app_language")}
                  </Text>
                  <Text
                    className="text-xs text-primary-600 dark:text-primary-400 mt-0.5"
                    style={{ textAlign: isRTL ? "right" : "left" }}
                  >
                    {currentLang?.nativeLabel ??
                      currentLang?.label ??
                      language}
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={chevronColor} />
            </TouchableOpacity>
          </SettingsCard>
        </View>

        {/* Danger Zone */}
        <View className="mb-2">
          <SectionTitle label={t("danger_zone")} destructive />
          <SettingsCard className="border-accent-red/30 dark:border-accent-red/30">
            <SettingsRow
              icon={Trash2}
              iconColor={iconColor}
              title={t("delete_account")}
              subtitle={t("delete_account_desc")}
              onPress={handleDeleteAccount}
              right={<ChevronRight size={20} color="#dc2626" />}
              destructive
            />
          </SettingsCard>
        </View>
      </ScrollView>

      {/* Language picker modal */}
      <Modal
        visible={languageModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setLanguageModalVisible(false)}
        statusBarTranslucent
      >
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}
          onPress={() => setLanguageModalVisible(false)}
        >
          <Pressable
            style={{
              backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingTop: 16,
              paddingBottom: 32,
              paddingHorizontal: 16,
            }}
            onPress={() => {}}
          >
            <Text
              className="text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-4 px-1"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("app_language_desc")}
            </Text>
            {(Object.keys(LANGUAGES) as LanguageCode[]).map((code) => {
              const info = LANGUAGES[code];
              const isSelected = language === code;
              return (
                <Pressable
                  key={code}
                  onPress={() => handleSelectLanguage(code)}
                  className="flex-row items-center justify-between py-4 px-3 rounded-xl active:opacity-80 mb-1"
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    backgroundColor: isSelected
                      ? isDark
                        ? "rgba(179,165,245,0.15)"
                        : "rgba(107,78,234,0.1)"
                      : "transparent",
                  }}
                >
                  <Text
                    className="text-base font-medium text-primary-950 dark:text-primary-50 flex-1"
                    style={{ textAlign: isRTL ? "right" : "left" }}
                  >
                    {info.nativeLabel}
                  </Text>
                  {isSelected && (
                    <View className="w-6 h-6 rounded-full bg-brand dark:bg-brand-500 items-center justify-center">
                      <Text className="text-white text-xs font-bold">✓</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
