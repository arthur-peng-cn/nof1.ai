import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
        },
        "foreground-subtle": "var(--foreground-subtle)",
        "foreground-muted": "var(--foreground-muted)",
        "accent-primary": "var(--accent-primary)",
        "border-subtle": "var(--border-subtle)",
      },
      backgroundImage: {
        "mobile-button-gradient-blue": "linear-gradient(to bottom, #e0f2fe, #bae6fd)",
        "mobile-button-gradient-purple": "linear-gradient(to bottom, #f3e8ff, #e9d5ff)",
        "mobile-button-gradient-green": "linear-gradient(to bottom, #dcfce7, #bbf7d0)",
        "mobile-button-gradient-orange": "linear-gradient(to bottom, #ffedd5, #fed7aa)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

export default config;