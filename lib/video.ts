// Creator walkthrough videos are linked, never hosted — no storage, no
// transcoding, no egress bill. We only accept a short allowlist of hosts
// we can safely embed in an <iframe>, and we rebuild the embed URL
// ourselves rather than trusting whatever the creator pasted.

const ALLOWED_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'loom.com',
  'www.loom.com',
  'vimeo.com',
  'www.vimeo.com',
  'player.vimeo.com',
])

// Validate + canonicalise a pasted link. Returns the cleaned https URL,
// or null if it is not a well-formed link on an allowed video host.
export function normalizeVideoUrl(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null
  let u: URL
  try {
    u = new URL(trimmed)
  } catch {
    return null
  }
  if (u.protocol !== 'https:') return null
  if (!ALLOWED_HOSTS.has(u.hostname.toLowerCase())) return null
  u.hash = ''
  return u.toString()
}

// Turn a watch/share link into an embeddable one. Returns null when we
// cannot confidently build an embed (the caller should fall back to a
// plain link rather than embed something unexpected).
export function videoEmbedUrl(raw: string): string | null {
  const clean = normalizeVideoUrl(raw)
  if (!clean) return null
  const u = new URL(clean)
  const host = u.hostname.toLowerCase().replace(/^(www\.|m\.)/, '')

  if (host === 'youtu.be') {
    const id = u.pathname.slice(1).split('/')[0]
    return id ? `https://www.youtube.com/embed/${id}` : null
  }
  if (host === 'youtube.com') {
    const v = u.searchParams.get('v')
    if (v) return `https://www.youtube.com/embed/${v}`
    const m = u.pathname.match(/^\/(?:embed|shorts)\/([\w-]+)/)
    return m ? `https://www.youtube.com/embed/${m[1]}` : null
  }
  if (host === 'loom.com') {
    const m = u.pathname.match(/\/(?:share|embed)\/([\w-]+)/)
    return m ? `https://www.loom.com/embed/${m[1]}` : null
  }
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    if (host === 'player.vimeo.com') return clean
    const m = u.pathname.match(/\/(\d+)/)
    return m ? `https://player.vimeo.com/video/${m[1]}` : null
  }
  return null
}
