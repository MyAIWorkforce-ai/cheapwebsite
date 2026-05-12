import type { Config } from "tailwindcss";

/*
 * Navy + gold variant.
 *
 * Concept: navy canvas, warm cream cards/pills floating on it, gold for
 * flourish. Existing components are built around the bg-brand-cream-card
 * pattern (cards) and text-brand-ink (dark text on those cards). Both of
 * those carry through unchanged — cards still look like cream paper. What
 * changes is the page background (set in globals.css) and the bg-brand-navy
 * zones, which now sit even deeper than the canvas so they still read as
 * separate strips.
 */
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
          // dark wells (sit deeper than canvas)
          navy: '#060F1B',
          'navy-deep': '#03080F',
          'navy-soft': '#0F2238',

          // white cards + pills
          cream: '#FFFFFF',
          'cream-card': '#FFFFFF',
          'cream-deep': '#F1F1F1',

          // text on white cards
          ink: '#0B1B2E',
          muted: '#5F6B7E',
          hairline: '#E2E2E2',

          // gold accent — richer on dark backgrounds
          gold: '#D9B062',
          'gold-soft': '#E7C683',
          'gold-dark': '#B98E3F',
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
