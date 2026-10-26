import { type Config } from "tailwindcss";

// Must match `basePath` in next.config.mjs.
const basePath =
  process.env.GITHUB_ACTIONS === "true" ? "/booking-tattoos" : "";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        shop: `url('${basePath}/images/shop.jpg')`,
      },
      colors: {
        ink: "#0b0b0c",
        bone: "#f4f1ea",
        brass: "#c2a36b",
      },
      fontFamily: {
        display: ["Domine", "serif"],
        sans: ["'Open Sans'", "sans-serif"],
      },
      letterSpacing: {
        label: "0.28em",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-25%)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
} satisfies Config;
