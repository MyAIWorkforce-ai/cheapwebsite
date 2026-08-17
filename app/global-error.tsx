'use client'

// Catastrophic-failure boundary. Renders only when the root layout itself
// throws, so it has to bring its own <html> + <body>. Kept deliberately
// minimal — no Tailwind utilities, just inline styles, because the global
// CSS might not be available at this point.
//
// CRITICAL: this page MUST NOT be indexed by search engines. On
// 2026-07-30 we discovered Google had indexed this fallback as the
// site's meta description ("Something broke. We'll be back in a
// minute. Refresh the page. If it keeps happening, email
// help@skillzy.ai.") — happened because Google crawled us during a
// transient outage and the page shipped without a <head>, letting the
// crawler use the visible text as the description. The <head> below
// fixes that at the source: <meta name="robots" content="noindex,
// nofollow" /> + a proper <title>. Even if Google re-crawls this
// during another blip, it won't get indexed.
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <html lang="en">
      <head>
        <title>Skillzy — temporary error</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="description" content="Temporary error page. Skillzy is a marketplace for AI agent skills, guides, prompt packs, and setups — visit skillzy.ai." />
      </head>
      <body
        style={{
          margin: 0,
          padding: '64px 24px',
          fontFamily: 'ui-serif, Georgia, serif',
          background: '#E8ECF0',
          color: '#0F1729',
          minHeight: '100vh',
        }}
      >
        <div style={{ maxWidth: 640, marginInline: 'auto' }}>
          <p
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#C19E50',
              margin: 0,
            }}
          >
            Something broke
          </p>
          <h1
            style={{
              fontSize: 56,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontWeight: 600,
              margin: '20px 0 0',
            }}
          >
            We&rsquo;ll be back in a minute.
          </h1>
          <p style={{ marginTop: 20, color: '#5F6B7E', fontSize: 17 }}>
            Refresh the page. If it keeps happening, email{' '}
            <a href="mailto:help@skillzy.ai" style={{ color: '#0F1729' }}>
              help@skillzy.ai
            </a>
            {error.digest && <> and quote <code>{error.digest}</code></>}.
          </p>
        </div>
      </body>
    </html>
  )
}
