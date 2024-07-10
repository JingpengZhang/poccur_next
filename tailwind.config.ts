import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        page: "1170px",
      },
      colors: {
        black_06: "rgba(0,0,0,0.6)",
        white_04: "rgba(255,255,255,0.4)",
        white_06: "rgba(255,255,255,0.6)",
      },
    },
  },
  plugins: [],
};
export default config;
