import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { currentAccount } from '@/lib/memyselfi/auth'
import { getTwinByOwner, usingRealBackend } from '@/lib/memyselfi/store'
import { logout } from '@/app/memyselfi/actions'
import PublishDraft from '@/components/memyselfi/PublishDraft'

export const metadata: Metadata = {
  title: 'Your account',
  robots: { index: false },
}

export default async function AccountPage() {
  const account = await currentAccount()
  if (!account) redirect('/memyselfi/login')

  const twin = await getTwinByOwner(account.id)

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
      <div className="flex items-start justify-between gap-6">
        <div>
          <span
            className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--mmi-accent)' }}
          >
            Your account
          </span>
          <h1
            className="mt-3 font-display text-4xl"
            style={{ letterSpacing: '-0.03em', color: 'var(--mmi-text)' }}
          >
            Hi, {account.name || 'there'}.
          </h1>
          <p className="mt-2 text-[14px]" style={{ color: 'var(--mmi-muted)' }}>
            {account.email}
          </p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm rounded-full px-4 py-2 border"
            style={{ borderColor: 'var(--mmi-line)', color: 'var(--mmi-muted)' }}
          >
            Log out
          </button>
        </form>
      </div>

      {!usingRealBackend && (
        <p
          className="mt-6 rounded-lg border px-4 py-3 text-[12.5px]"
          style={{
            borderColor: 'var(--mmi-line)',
            backgroundColor: 'var(--mmi-panel)',
            color: 'var(--mmi-muted)',
          }}
        >
          Demo mode: accounts and twins live in memory for this session. Set the
          Supabase service-role env vars to persist them.
        </p>
      )}

      <div className="mt-10">
        {twin ? (
          <div
            className="rounded-2xl border p-7"
            style={{
              borderColor: 'var(--mmi-line)',
              backgroundColor: 'var(--mmi-panel)',
            }}
          >
            <div className="flex items-center gap-4">
              <span
                className="grid place-items-center w-12 h-12 rounded-xl text-base font-semibold"
                style={{ backgroundColor: twin.accent, color: '#0b0a14' }}
              >
                {twin.shortName.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <h2
                  className="text-xl font-semibold"
                  style={{ color: 'var(--mmi-text)' }}
                >
                  {twin.name}’s twin is live
                </h2>
                <p className="text-[14px]" style={{ color: 'var(--mmi-muted)' }}>
                  {twin.knowledge.length} things it knows ·{' '}
                  updated {new Date(twin.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div
              className="mt-5 rounded-lg px-4 py-3 text-[14px] font-mono"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--mmi-line)',
                color: 'var(--mmi-text)',
              }}
            >
              memyselfi.ai/{twin.handle}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/memyselfi/${twin.handle}`}
                className="rounded-full px-5 py-2.5 text-sm font-semibold"
                style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
              >
                View it live
              </Link>
              <Link
                href="/memyselfi/create"
                className="rounded-full px-5 py-2.5 text-sm font-medium border"
                style={{ borderColor: 'var(--mmi-line)', color: 'var(--mmi-text)' }}
              >
                Edit in the builder
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <PublishDraft />
            <div
              className="rounded-2xl border p-7"
              style={{
                borderColor: 'var(--mmi-line)',
                backgroundColor: 'var(--mmi-panel)',
              }}
            >
              <h2
                className="text-xl font-semibold"
                style={{ color: 'var(--mmi-text)' }}
              >
                No twin yet.
              </h2>
              <p
                className="mt-2 text-[15px]"
                style={{ color: 'var(--mmi-muted)' }}
              >
                Five minutes of honest answers and there’s a you that never
                sleeps.
              </p>
              <Link
                href="/memyselfi/create"
                className="mt-5 inline-block rounded-full px-6 py-3 text-sm font-semibold"
                style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
              >
                Build my twin
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
