import { env } from '@/lib/env'

// Branded header block injected at the top of every transactional
// email. Single source of truth — change here once, every template
// updates (purchase confirmation, sale notification, refund, welcome,
// founder alerts, etc.).
//
// The logo lives at /icon-512.jpg (the same file the PWA manifest uses,
// so the image is already on the CDN and cached). A bare <img> works in
// every modern email client; we keep alt + dimensions so it renders OK
// even when remote images are blocked by default.

export function brandHeaderHtml() {
  const site = (env.siteUrl || 'https://skillzy.ai').replace(/\/$/, '')
  const logo = `${site}/icon-512.jpg`
  return `<div style="margin:0 0 28px 0;">
    <a href="${site}" style="text-decoration:none;display:inline-block;">
      <img src="${logo}" alt="Skillzy" width="44" height="44" style="display:block;border-radius:8px;border:0;outline:none;" />
    </a>
  </div>`
}
