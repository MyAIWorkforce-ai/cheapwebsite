import type { MetadataRoute } from 'next'

// Web App Manifest. Lets iOS / Android save the site to the home
// screen with the right name, theme colour, and icon — `display:
// 'standalone'` launches in full-screen (no browser chrome) so it
// feels like a native app. `theme_color` colors the status bar,
// `background_color` the splash screen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Skillzy',
    short_name: 'Skillzy',
    description:
      'A marketplace for AI agent skills, guides, and ready-to-go setups. Built by humans, dropped into your agent.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#E8ECF0',
    theme_color: '#0F1729',
    categories: ['productivity', 'business', 'utilities'],
    icons: [
      {
        src: '/icon-512.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any',
      },
      {
        src: '/icon-512.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
  }
}
