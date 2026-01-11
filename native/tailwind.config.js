/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        /* Brand */
        primary: "#0A0A0A", // main brand (almost black)
        secondary: "#1F2937", // dark gray
        accent: "#2563EB", // blue CTA

        /* Backgrounds */
        background: "#FFFFFF",
        surface: "#F9FAFB",
        muted: "#E5E7EB",

        /* Text */
        textPrimary: "#111827",
        textSecondary: "#6B7280",
        textMuted: "#9CA3AF",

        /* Status */
        success: "#16A34A",
        warning: "#F59E0B",
        error: "#DC2626",
        info: "#0EA5E9",

        /* Borders */
        border: "#E5E7EB",
      },
    },
  },
  plugins: [],
};
