import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: {
          light: "#FAFAF7",
          dark: "#121212",
        },
        surface: {
          light: "#F1F1EC",
          dark: "#1C1C1C",
        },
        border: {
          light: "#DDDDD5",
          dark: "#2E2E2E",
        },
        text: {
          light: "#1A1A1A",
          dark: "#ECECEC",
        },
        secondary: {
          light: "#5A5A55",
          dark: "#A0A0A0",
        },
        accent: {
          DEFAULT: "#1D4ED8",
          hover: "#1E40AF",
          dark: "#6B93F5",
        },
        callout: {
          note: "#EEF2FF",
          warning: "#FEF3C7",
        },
      },
      maxWidth: {
        reading: "720px",
      },
    },
  },
  plugins: [],
};

export default config;
