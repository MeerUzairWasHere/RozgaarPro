import { CustomTouchableOpacityButton } from "@/components";
import { ROUTES } from "@/constants";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("forgot_password_title")}</Text>
      <CustomTouchableOpacityButton
        title={t("back")}
        onPress={() => router.replace(ROUTES.SIGN_IN)}
        className="w-96"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 24,
  },
  buttonText: {
    color: "#e70404",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "600",
  },
});
