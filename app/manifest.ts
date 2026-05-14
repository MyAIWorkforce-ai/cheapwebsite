import type { MetadataRoute } from 'next'

// Web App Manifest. Lets iOS / Android save the site to the home screen
// with the right name, theme colour, and icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Skillzy',
    short_name: 'Skillzy',
    description: 'A marketplace for skills, guides, and ready-to-go agent setups.',
    start_url: '/',
    display: 'standalone',
    background_color: '#E8ECF0',
    theme_color: '#0F1729',
    icons: [
      {
        // Reuses /icon (the file-based icon convention from app/icon.tsx).
        src: '/icon',
        sizes: '64x64',
        type: 'image/png',
      },
    ],
  }
}
