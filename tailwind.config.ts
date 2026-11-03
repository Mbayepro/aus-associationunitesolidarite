import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aus: {
          blue: {
            DEFAULT: "#124B9C",
            50: "#EFF6FF",
            100: "#DBEAFE",
            200: "#BFDBFE",
            500: "#2563EB",
            600: "#1D4ED8",
            700: "#124B9C",
            800: "#0F3D80",
            900: "#0B2B5C",
          },
          red: {
            DEFAULT: "#DC2626",
            50: "#FEF2F2",
            100: "#FEE2E2",
            500: "#EF4444",
            600: "#DC2626",
            700: "#B91C1C",
          },
          orange: {
            DEFAULT: "#EA580C",
            50: "#FFF7ED",
            100: "#FFEDD5",
            500: "#F97316",
            600: "#EA580C",
            700: "#C2410C",
          },
          green: {
            DEFAULT: "#16A34A",
            50: "#F0FDF4",
            100: "#DCFCE7",
            500: "#22C55E",
            600: "#16A34A",
            700: "#15803D",
          },
        },
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(40px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.92)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%) skewX(-20deg)" },
          "100%": { transform: "translateX(220%) skewX(-20deg)" },
        },
        "page-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "zoom-in": {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(-12deg)" },
          "40%": { transform: "rotate(10deg)" },
          "60%": { transform: "rotate(-6deg)" },
          "80%": { transform: "rotate(4deg)" },
        },
        "draw-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        blob: "blob 14s ease-in-out infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        marquee: "marquee 35s linear infinite",
        shimmer: "shimmer 2.8s ease-in-out infinite",
        "spin-slow": "spin 24s linear infinite",
        "spin-slower": "spin 40s linear infinite reverse",
        "page-in": "page-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.3s ease-out both",
        "zoom-in": "zoom-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-down": "slide-down 0.3s ease-out both",
        wiggle: "wiggle 2.5s ease-in-out infinite",
        "draw-line": "draw-line 1.2s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

