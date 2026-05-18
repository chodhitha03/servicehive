import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        brand: {
          50: "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#868e96",
          700: "#495057",
          800: "#343a40",
          900: "#212529"
        },
        ink: {
          900: "#ffffff",
          800: "#f8f9fa",
          700: "#e9ecef",
          600: "#ced4da",
          500: "#adb5bd",
          400: "#868e96",
          300: "#495057",
          200: "#343a40",
          100: "#212529",
          50: "#000000"
        }
      },
      boxShadow: {
        soft: "0 0 0 1px rgba(255,255,255,0.05)",
        card: "0 0 0 1px rgba(255,255,255,0.05), 0 4px 6px rgba(0,0,0,0.2)",
        glow: "0 0 20px rgba(255,255,255,0.05)"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards"
      }
    }
  },
  plugins: []
} satisfies Config;