import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          orange: '#F97316',
          dark: '#1A1A2E',
        },
      },
    },
  },
  plugins: [],
};
export default config;
