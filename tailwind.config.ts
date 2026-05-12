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
          purple: '#7C3AED',
          'purple-dark': '#6D28D9',
          yellow: '#FACC15',
          'yellow-dark': '#EAB308',
          ink: '#0F172A',
          muted: '#64748B',
          line: '#E2E8F0',
        },
      },
      maxWidth: {
        page: '1200px',
      },
    },
  },
  plugins: [],
};
export default config;
