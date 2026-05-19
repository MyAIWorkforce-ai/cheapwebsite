import Link from 'next/link'
import type { Twin } from '@/lib/memyselfi/twins'
import ChatPanel from './ChatPanel'

export default function TwinProfile({
  twin,
  banner,
}: {
  twin: Twin
  banner?: React.ReactNode
}) {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-64 mmi-glow" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-12">
        {banner}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-4">
              <span
                className="grid place-items-center w-16 h-16 rounded-2xl text-xl font-semibold"
                style={{ backgroundColor: twin.accent, color: '#0b0a14' }}
                aria-hidden
              >
                {twin.shortName.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <h1
                  className="font-display text-3xl sm:text-4xl flex items-center gap-2"
                  style={{ letterSpacing: '-0.02em', color: 'var(--mmi-text)' }}
                >
                  {twin.name}
                  {twin.verified && (
                    <span
                      className="text-sm rounded-full px-2 py-0.5"
                      style={{
                        color: twin.accent,
                        border: `1px solid ${twin.accent}`,
                      }}
                    >
                      verified
                    </span>
                  )}
                </h1>
                <p className="text-[15px]" style={{ color: 'var(--mmi-muted)' }}>
                  {twin.role}
                  {twin.location ? ` · ${twin.location}` : ''}
                </p>
              </div>
            </div>

            {twin.tagline && (
              <p
                className="mt-6 font-display text-xl sm:text-2xl leading-snug"
                style={{ color: 'var(--mmi-text)', letterSpacing: '-0.015em' }}
              >
                “{twin.tagline}”
              </p>
            )}

            <div className="mt-5 space-y-3">
              {twin.bio.filter(Boolean).map((p, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-relaxed"
                  style={{ color: 'var(--mmi-muted)' }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div
              className="mt-7 rounded-xl border p-4 text-[13px] leading-relaxed"
              style={{
                borderColor: 'var(--mmi-line)',
                backgroundColor: 'var(--mmi-panel)',
                color: 'var(--mmi-muted)',
              }}
            >
              This is an AI twin built on{' '}
              <Link
                href="/memyselfi"
                className="underline"
                style={{ color: 'var(--mmi-accent)' }}
              >
                memyselfi.ai
              </Link>
              . It only knows what {twin.shortName} taught it, and answers in{' '}
              {twin.shortName}’s voice. It is not a live person.
            </div>

            <Link
              href="/memyselfi/create"
              className="mt-6 inline-block text-sm font-semibold rounded-full px-5 py-3 transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
            >
              Build your own twin →
            </Link>
          </div>

          <div>
            <ChatPanel twin={twin} />
          </div>
        </div>
      </div>
    </div>
  )
}
