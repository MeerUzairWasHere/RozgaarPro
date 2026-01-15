/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  // Enable dark mode with 'class' strategy
  // Add 'dark' class to root element to activate dark mode
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F2F2F2", // Light mode background
          50: "#F2F2F2",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
          950: "#121212",
        },
      },
    },
  },
  plugins: [],
};
