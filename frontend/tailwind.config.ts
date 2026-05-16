import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
        display: ["Outfit", "ui-sans-serif", "system-ui"]
      },
      colors: {
        brand: {
          50: "#eff6ff",
          200: "#bfdbfe",
          500: "#3b82f6",
          700: "#1d4ed8"
        },
        ink: {
          900: "#0f172a",
          700: "#334155",
          500: "#64748b"
        },
        sand: {
          50: "#f8fafc",
          200: "#e2e8f0",
          400: "#94a3b8"
        }
      },
      boxShadow: {
        soft: "0 4px 20px rgba(15, 23, 42, 0.05)",
        card: "0 2px 10px rgba(15, 23, 42, 0.03), 0 0 1px rgba(15, 23, 42, 0.1)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)"
      }
    }
  },
  plugins: []
} satisfies Config;