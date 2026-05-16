import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        display: ["Fraunces", "ui-serif", "serif"]
      },
      colors: {
        brand: {
          50: "#f1faf9",
          200: "#a7f3d0",
          500: "#14b8a6",
          700: "#0f766e"
        },
        ink: {
          900: "#0f172a",
          700: "#334155",
          500: "#64748b"
        },
        sand: {
          50: "#fff7ed",
          200: "#fed7aa",
          400: "#fb923c"
        }
      },
      boxShadow: {
        soft: "0 12px 30px rgba(15, 23, 42, 0.12)",
        card: "0 8px 24px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;