/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        urdu: ["NotoNastaliqUrdu_400Regular", "sans-serif"],
      },
      colors: {
        // Neutral scale: backgrounds and text
        primary: {
          DEFAULT: "#F5F5F7",
          50: "#FAFAFA",
          100: "#F5F5F7",
          200: "#E6E6E6",
          300: "#CCCCCC",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
          950: "#121212",
        },
        // Brand purple – primary accent (headers, buttons, active states, links)
        brand: {
          DEFAULT: "#6B4EEA",
          50: "#F3F0FE",
          100: "#E8E4FC",
          200: "#D4CCF9",
          300: "#B3A5F5",
          400: "#8B77EF",
          500: "#6B4EEA",
          600: "#5A3DD6",
          700: "#4A2FBC",
          800: "#3D2699",
          900: "#2E1D73",
        },
        accent: {
          indigo: "#6B4EEA",
          indigoLight: "#B3A5F5",
          green: "#16a34a",
          greenLight: "#86efac",
          red: "#dc2626",
          redLight: "#fca5a5",
          amber: "#f59e0b",
          amberLight: "#fcd34d",
          blue: "#3b82f6",
          blueLight: "#93c5fd",
          orange: "#FFA500",
        },
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.06)",
        "card-lg": "0 4px 12px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
