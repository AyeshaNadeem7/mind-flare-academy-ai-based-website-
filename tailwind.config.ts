import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFDF9",
          100: "#FDF9F0",
          200: "#FAF3E3", // official brand background
          300: "#F3E6C8",
          400: "#EAD7AA",
          500: "#DFC589",
        },
        navy: {
          50: "#F0F3F9",
          100: "#DCE3F0",
          200: "#B4C4DE",
          300: "#869FCA",
          700: "#2B3C61",
          800: "#22314E",
          900: "#1E2A44", // official primary navy
          950: "#141D30",
        },
        flame: {
          orange: "#F7941E", // primary flame orange
          yellow: "#FFC93C", // flame highlight yellow
          amber: "#F59E0B",
          dark: "#D97706",
        },
        teal: {
          accent: "#2BA8C4", // official brand teal
          dark: "#1D7E94",
          light: "#E0F5F9",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "flame-gradient": "linear-gradient(135deg, #F7941E 0%, #FFC93C 100%)",
        "flame-gradient-hover": "linear-gradient(135deg, #E67E0A 0%, #FBBF24 100%)",
        "navy-gradient": "linear-gradient(135deg, #1E2A44 0%, #141D30 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 243, 227, 0.4) 100%)",
      },
      boxShadow: {
        "flame-sm": "0 2px 10px rgba(247, 148, 30, 0.25)",
        "flame-md": "0 4px 20px rgba(247, 148, 30, 0.35)",
        "flame-lg": "0 10px 30px rgba(247, 148, 30, 0.45)",
        "glass": "0 8px 32px 0 rgba(30, 42, 68, 0.08)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulseSlow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
