'use client'

// Catastrophic-failure boundary. Renders only when the root layout itself
// throws, so it has to bring its own <html> + <body>. Kept deliberately
// minimal — no Tailwind utilities, just inline styles, because the global
// CSS might not be available at this point.
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <html lang="en">
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
            <a href="mailto:hi@skillzy.ai" style={{ color: '#0F1729' }}>
              hi@skillzy.ai
            </a>
            {error.digest && <> and quote <code>{error.digest}</code></>}.
          </p>
        </div>
      </body>
    </html>
  )
}
