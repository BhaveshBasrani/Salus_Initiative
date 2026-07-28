import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0C0D0E",
        foreground: "#F8F7F4",
        salus: {
          dark: "#0C0D0E",
          secondary: "#141518",
          surface: "#1C1E22",
          border: "rgba(255, 255, 255, 0.1)",
          primary: "#F8F7F4",
          subtext: "#E8E5DF",
          muted: "#96928C",
          peach: {
            DEFAULT: "#FF7E67",
            hover: "#F69A84",
            dark: "#D65A44",
          },
          coral: "#F69A84",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "1.25rem",
        md: "0.875rem",
        sm: "0.5rem",
        pill: "9999px",
      },
      boxShadow: {
        editorial: "0 20px 50px -10px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        island: "0 16px 40px -10px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.12)",
        "peach-glow": "0 8px 24px -4px rgba(255, 126, 103, 0.35)",
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
    },
  },
  plugins: [],
};

export default config;
