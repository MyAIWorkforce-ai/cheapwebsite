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
          emerald: '#0F5132',
          'emerald-deep': '#0A3D26',
          'emerald-soft': '#2F7A56',
          cream: '#F6EFE0',
          'cream-card': '#FBF6EA',
          'cream-deep': '#EDE3CC',
          ink: '#161512',
          muted: '#6E6557',
          hairline: '#D9CDB4',
          mustard: '#C8932B',
          'mustard-soft': '#E0B65E',
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
