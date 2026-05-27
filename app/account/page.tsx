import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'
import { signOut } from '@/app/signin/actions'
import { ProfileForm, EmailForm, PasswordForm } from './AccountForms'

export const metadata = {
  title: 'Account',
  description: 'Update your name, handle, email, and password on Skillzy.',
  robots: { index: false, follow: false },
}

async function loadProfile(userId: string) {
  if (!hasSupabase) return null
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('profiles')
      .select('name, handle')
      .eq('id', userId)
      .single()
    return data
  } catch {
    return null
  }
}

export default async function AccountPage() {
  const user = await getUser()
  if (hasSupabase && !user) redirect('/signin?next=/account')

  const profile = user ? await loadProfile(user.id) : null
  const email = user?.email ?? 'you@example.com'
  const name = profile?.name ?? user?.name ?? ''
  const handle = profile?.handle ?? user?.handle ?? ''

  // Does this account already have an email/password credential (vs
  // OAuth-only)? Drives "Change password" vs "Set a password" labelling
  // so a creator who signed up with a password isn't told to set one.
  let hasPassword = false
  if (hasSupabase && user) {
    try {
      const supabase = createClient()
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      const providers =
        (authUser?.app_metadata?.providers as string[] | undefined) ?? []
      hasPassword = providers.includes('email')
    } catch {
      /* default false */
    }
  }

  return (
    <div className="paper">
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href="/dashboard" className="hover:text-brand-gold transition-colors">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">Account</span>
        </nav>
      </div>

      <section className="px-6 lg:px-10 pt-10 sm:pt-14 pb-14 sm:pb-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Account
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Your{' '}
            <em className="italic text-brand-gold font-medium">settings.</em>
          </h1>
          <p className="mt-5 text-brand-muted max-w-prose">
            Name, handle, email, password — all the basics. For Stripe payout
            settings see{' '}
            <Link
              href="/dashboard/payouts"
              className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
            >
              Dashboard → Payouts
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Profile
            </span>
            <h2
              className="font-display mt-3 text-3xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Who you are.
            </h2>
            <p className="mt-3 text-sm text-brand-muted">
              Your name shows on creator profiles and reviews. Your handle is
              your public URL.
            </p>
          </header>
          <div className="lg:col-span-8 max-w-lg">
            <ProfileForm defaultName={name} defaultHandle={handle} />
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Email
            </span>
            <h2
              className="font-display mt-3 text-3xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Where things land.
            </h2>
            <p className="mt-3 text-sm text-brand-muted">
              Order confirmations and password resets go here.
            </p>
          </header>
          <div className="lg:col-span-8 max-w-lg">
            <EmailForm defaultEmail={email} />
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Password
            </span>
            <h2
              className="font-display mt-3 text-3xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Lock it down.
            </h2>
            <p className="mt-3 text-sm text-brand-muted">
              Eight characters minimum. Sign-in cookies stay valid.
            </p>
          </header>
          <div className="lg:col-span-8 max-w-lg">
            <PasswordForm alreadySet={hasPassword} />
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Session
            </span>
            <h2
              className="font-display mt-3 text-3xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Sign out.
            </h2>
            <p className="mt-3 text-sm text-brand-muted">
              Done for now? See you next time.
            </p>
          </header>
          <div className="lg:col-span-8 max-w-lg">
            <form action={signOut}>
              <button
                type="submit"
                className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                Sign out →
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
