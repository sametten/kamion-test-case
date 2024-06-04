import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Fonts
      fontSize: {
        "kamion-xl": ["4rem", "1.32"],
        "kamion-lg": ["3rem", "4rem"],
      },

      // Font Weight
      fontWeight: {
        "kamion-light": "300",
        "kamion-regular": "400",
        "kamion-book": "500",
        "kamion-medium": "600",
        "kamion-semibold": "700",
      },

      // Colors
      colors: {
        kamion: {
          blue: {
            100: "#ECF5FF",
            200: "#7EAFE8",
            300: "#7BB9FA",
            600: "#0085FF",
            700: "#0F5FBD",
            800: "#0A2468",
            900: "#092256",
          },
          surface: {
            50: "#FAFAFA",
            100: "#F6F6F6",
            200: "#F2F3F4",
            500: "#BDC7D1",
            600: "#93979B",
          },
          green: {
            100: "#DAF5EC",
            600: "#1FCB91",
          },
          red: {
            100: "#FFD9DE",
            600: "#E9344C",
          },
          yellow: {
            50: "#FFF7EC",
            600: "#E08404",
          },
          iris: {
            50: "#EEEEFF",
            600: "#5D5FEF",
          }
        }
      }
    },
  },
  plugins: [],
};
export default config;
