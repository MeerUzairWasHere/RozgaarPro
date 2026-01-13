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

        // Semantic color tokens for light/dark mode
        // These will automatically adapt when you add dark mode
        background: {
          DEFAULT: "#F2F2F2", // Light mode background
          secondary: "#E6E6E6", // Secondary surfaces
        },
        foreground: {
          DEFAULT: "#1A1A1A", // Light mode text
          muted: "#666666", // Muted text
        },
        border: {
          DEFAULT: "#CCCCCC", // Light mode borders
        },

        // You can add accent colors here in the future
        // accent: {
        //   DEFAULT: "#your-accent-color",
        //   light: "#lighter-variant",
        //   dark: "#darker-variant",
        // },
      },

      // Background colors that adapt to dark mode
      backgroundColor: {
        app: "var(--color-background)",
        card: "var(--color-background-secondary)",
      },

      // Text colors that adapt to dark mode
      textColor: {
        default: "var(--color-foreground)",
        muted: "var(--color-foreground-muted)",
      },

      // Border colors that adapt to dark mode
      borderColor: {
        default: "var(--color-border)",
      },
    },
  },
  plugins: [],
};
