import { redirect } from 'next/navigation'
import { hasSupabase } from '@/lib/env'
import { getUser } from '@/lib/auth'
import SignInForm from './SignInForm'

export const metadata = {
  title: 'Sign in — Skillzy',
  description: 'Sign in to Skillzy.',
}

export default async function SignInPage() {
  const user = await getUser()
  if (user) redirect('/dashboard')

  return (
    <div className="paper px-6 lg:px-10 py-20 sm:py-28">
      <div className="max-w-md mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Welcome back
        </span>
        <h1
          className="font-display mt-4 text-5xl tracking-tight"
          style={{ letterSpacing: '-0.03em' }}
        >
          Sign <em className="italic text-brand-gold font-medium">in.</em>
        </h1>
        <p className="mt-4 text-brand-muted">
          Buy once, re-download any time. Sell on your own schedule.
        </p>

        <SignInForm demoMode={!hasSupabase} />
      </div>
    </div>
  )
}
