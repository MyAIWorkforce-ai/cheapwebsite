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
          navy: '#0F1729',
          'navy-deep': '#080D1A',
          'navy-soft': '#1E293B',
          cream: '#E8ECF0',
          'cream-card': '#F2F4F8',
          'cream-deep': '#DCE1EA',
          ink: '#0F1729',
          muted: '#5F6B7E',
          hairline: '#CCD2DD',
          gold: '#C19E50',
          'gold-soft': '#DDB976',
          'gold-dark': '#9C7E3D',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        page: '1240px',
        prose: '68ch',
      },
      letterSpacing: {
        widest: '0.18em',
      },
    },
  },
  plugins: [],
};
export default config;
