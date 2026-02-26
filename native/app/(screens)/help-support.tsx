import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  useColorScheme,
  Linking,
} from "react-native";
import {
  Phone,
  MessageCircle,
  Mail,
  CircleHelp,
  ChevronRight,
  FileText,
  Shield,
} from "lucide-react-native";
import { AppHeader } from "@/components";

const isRTL = false;

const SUPPORT_PHONE = "+918899080590";
const SUPPORT_EMAIL = "support@rozgaarpro.com";
const SUPPORT_WHATSAPP = "918899080590";

function SectionTitle({ label }: { label: string }) {
  return (
    <Text
      className="text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-3 px-1"
      style={{ textAlign: isRTL ? "right" : "left" }}
    >
      {label}
    </Text>
  );
}

export default function HelpSupport() {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const chevronColor = isDark ? "#9ca3af" : "#6b7280";
  const iconMuted = isDark ? "#9ca3af" : "#6b7280";

  const faqs: { q: string; a: string }[] = [
    {
      q: "How do I find a worker?",
      a: "Search by category or location on the home screen.",
    },
    {
      q: "How do I get verified?",
      a: "Upload your ID in your profile. Verification takes 24-48 hours.",
    },
    {
      q: "Is RozgaarPro free?",
      a: "Yes, finding and contacting workers is completely free.",
    },
    {
      q: "How do I report a problem?",
      a: "Contact us through any channel listed below.",
    },
  ];

  const handleCall = () => {
    Linking.openURL(`tel:${SUPPORT_PHONE}`);
  };

  const handleWhatsApp = async () => {
    const url = `https://wa.me/${SUPPORT_WHATSAPP}`;

    try {
      await Linking.openURL(url);
    } catch (err: any) {
      // // Ignore the known false-negative error
      // if (__DEV__) {
      //   console.log("WhatsApp open warning:", err?.message);
      // }
    }
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
  };

  const handleTerms = () => {
    // TODO: Open Terms URL or screen
  };

  const handlePrivacy = () => {
    // TODO: Open Privacy URL or screen
  };

  const handleCommunityGuidelines = () => {
    // TODO: Open Community Guidelines URL or screen
  };

  return (
    <View className="flex-1 bg-primary-50 dark:bg-primary-950">
      <AppHeader showBack title="Help & Support" />

      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerClassName="pb-20"
        showsVerticalScrollIndicator={false}
      >
        {/* Contact Us */}
        <View className="mb-6">
          <SectionTitle label="Contact Us" />
          <View
            className="flex-row gap-3"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            <Pressable
              onPress={handleCall}
              className="flex-1 items-center gap-2 p-4 bg-white dark:bg-primary-900 rounded-2xl border border-primary-200 dark:border-primary-800 active:opacity-90"
            >
              <View className="w-12 h-12 rounded-xl bg-accent-green/10 dark:bg-accent-green/20 items-center justify-center">
                <Phone size={22} color="#16a34a" />
              </View>
              <Text
                className="text-sm font-medium text-primary-950 dark:text-primary-50"
                style={{ textAlign: "center" }}
              >
                Call Us
              </Text>
            </Pressable>
            <Pressable
              onPress={handleWhatsApp}
              className="flex-1 items-center gap-2 p-4 bg-white dark:bg-primary-900 rounded-2xl border border-primary-200 dark:border-primary-800 active:opacity-90"
            >
              <View className="w-12 h-12 rounded-xl bg-accent-green/10 dark:bg-accent-green/20 items-center justify-center">
                <MessageCircle size={22} color="#16a34a" />
              </View>
              <Text
                className="text-sm font-medium text-primary-950 dark:text-primary-50"
                style={{ textAlign: "center" }}
              >
                WhatsApp
              </Text>
            </Pressable>
            <Pressable
              onPress={handleEmail}
              className="flex-1 items-center gap-2 p-4 bg-white dark:bg-primary-900 rounded-2xl border border-primary-200 dark:border-primary-800 active:opacity-90"
            >
              <View className="w-12 h-12 rounded-xl bg-brand/10 dark:bg-brand-500/20 items-center justify-center">
                <Mail size={22} color={isDark ? "#B3A5F5" : "#6B4EEA"} />
              </View>
              <Text
                className="text-sm font-medium text-primary-950 dark:text-primary-50"
                style={{ textAlign: "center" }}
              >
                Email
              </Text>
            </Pressable>
          </View>
        </View>

        {/* FAQ */}
        <View className="mb-6">
          <SectionTitle label="Frequently Asked Questions" />
          <View className="bg-white dark:bg-primary-900 rounded-2xl border border-primary-200 dark:border-primary-800 overflow-hidden">
            {faqs.map((faq, index) => {
              const isExpanded = expandedFaqIndex === index;
              return (
                <View
                  key={index}
                  className="border-b border-primary-200 dark:border-primary-800 last:border-b-0"
                >
                  <Pressable
                    onPress={() =>
                      setExpandedFaqIndex(isExpanded ? null : index)
                    }
                    className="flex-row items-center justify-between p-4 active:opacity-80"
                    style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                  >
                    <View
                      className="flex-row items-center gap-3 flex-1"
                      style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                    >
                      <CircleHelp
                        size={18}
                        color={isDark ? "#B3A5F5" : "#6B4EEA"}
                      />
                      <Text
                        className="font-medium text-primary-950 dark:text-primary-50 text-sm flex-1"
                        style={{ textAlign: isRTL ? "right" : "left" }}
                      >
                        {faq.q}
                      </Text>
                    </View>
                    <ChevronRight
                      size={18}
                      color={chevronColor}
                      style={{
                        transform: [{ rotate: isExpanded ? "90deg" : "0deg" }],
                      }}
                    />
                  </Pressable>
                  {isExpanded && (
                    <View
                      className="px-4 pb-4"
                      style={{
                        paddingStart: isRTL ? 16 : 16,
                        paddingEnd: isRTL ? 44 : 44,
                      }}
                    >
                      <Text
                        className="text-sm text-primary-600 dark:text-primary-400"
                        style={{ textAlign: isRTL ? "right" : "left" }}
                      >
                        {faq.a}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Quick Links */}
        <View className="mb-6">
          <SectionTitle label="Quick Links" />
          <View className="bg-white dark:bg-primary-900 rounded-2xl border border-primary-200 dark:border-primary-800 overflow-hidden divide-y divide-primary-200 dark:divide-primary-800">
            <Pressable
              onPress={handleTerms}
              className="flex-row items-center justify-between p-4 active:opacity-80"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <View
                className="flex-row items-center gap-3 flex-1"
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              >
                <FileText size={18} color={iconMuted} />
                <Text
                  className="font-medium text-primary-950 dark:text-primary-50 text-sm"
                  style={{ textAlign: isRTL ? "right" : "left" }}
                >
                  Terms of Service
                </Text>
              </View>
              <ChevronRight size={18} color={chevronColor} />
            </Pressable>
            <Pressable
              onPress={handlePrivacy}
              className="flex-row items-center justify-between p-4 active:opacity-80"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <View
                className="flex-row items-center gap-3 flex-1"
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              >
                <Shield size={18} color={iconMuted} />
                <Text
                  className="font-medium text-primary-950 dark:text-primary-50 text-sm"
                  style={{ textAlign: isRTL ? "right" : "left" }}
                >
                  Privacy Policy
                </Text>
              </View>
              <ChevronRight size={18} color={chevronColor} />
            </Pressable>
            <Pressable
              onPress={handleCommunityGuidelines}
              className="flex-row items-center justify-between p-4 active:opacity-80"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <View
                className="flex-row items-center gap-3 flex-1"
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              >
                <FileText size={18} color={iconMuted} />
                <Text
                  className="font-medium text-primary-950 dark:text-primary-50 text-sm"
                  style={{ textAlign: isRTL ? "right" : "left" }}
                >
                  Community Guidelines
                </Text>
              </View>
              <ChevronRight size={18} color={chevronColor} />
            </Pressable>
          </View>
        </View>

        <Text
          className="text-center text-xs text-primary-500 dark:text-primary-400 pt-4"
          style={{ textAlign: "center" }}
        >
          RozgaarPro Support · Available 9 AM – 9 PM IST
        </Text>
      </ScrollView>
    </View>
  );
}
