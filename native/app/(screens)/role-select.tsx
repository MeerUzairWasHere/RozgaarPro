import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import { Search, Wrench, Briefcase } from "lucide-react-native";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants";

export default function RoleSelectScreen() {
  const router = useRouter();

  const handleSelectRole = (role: "customer" | "worker") => {
    // you can persist role here later
    router.replace(ROUTES.LOGIN);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Animated.View entering={FadeIn} style={styles.iconBox}>
          <Briefcase size={32} color="#fff" />
        </Animated.View>

        <Animated.Text entering={FadeInDown.delay(100)} style={styles.title}>
          Welcome to RozgaarPro
        </Animated.Text>

        <Animated.Text entering={FadeInDown.delay(200)} style={styles.subtitle}>
          How would you like to use the app?
        </Animated.Text>
      </View>

      {/* Role Cards */}
      <View style={styles.cards}>
        {/* Customer */}
        <Animated.View entering={FadeInLeft.delay(300)}>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => handleSelectRole("customer")}
          >
            <View style={[styles.cardIcon, styles.primaryBg]}>
              <Search size={28} color="#2563eb" />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>I need a worker</Text>
              <Text style={styles.cardText}>
                Find and hire skilled professionals for your home or business
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Worker */}
        <Animated.View entering={FadeInRight.delay(400)}>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => handleSelectRole("worker")}
          >
            <View style={[styles.cardIcon, styles.accentBg]}>
              <Wrench size={28} color="#9333ea" />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>I am a worker</Text>
              <Text style={styles.cardText}>
                Get discovered by customers and find work nearby
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.Text entering={FadeIn.delay(600)} style={styles.footerText}>
        By continuing, you agree to our{" "}
        <Text style={styles.link}>Terms of Service</Text>
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 24,
  },

  header: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 40,
  },

  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748b",
  },

  cards: {
    flex: 1,
    gap: 16,
  },

  card: {
    flexDirection: "row",
    gap: 16,
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryBg: {
    backgroundColor: "#dbeafe",
  },

  accentBg: {
    backgroundColor: "#ede9fe",
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 4,
  },

  cardText: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },

  footerText: {
    textAlign: "center",
    fontSize: 13,
    color: "#64748b",
    paddingVertical: 24,
  },

  link: {
    color: "#2563eb",
    fontWeight: "500",
  },
});
