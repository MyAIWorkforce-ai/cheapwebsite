import { redirect } from 'next/navigation'
import { hasSupabase } from '@/lib/env'
import { getUser } from '@/lib/auth'
import SignUpForm from './SignUpForm'

export const metadata = {
  title: 'Create an account',
  description:
    'Join Skillzy to buy, sell, and re-download skills, guides, and ready-to-go agent setups.',
  keywords: ['Skillzy sign up', 'create account', 'AI agent marketplace account'],
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: { next?: string }
}) {
  const next =
    searchParams.next && searchParams.next.startsWith('/')
      ? searchParams.next
      : undefined
  const user = await getUser()
  if (user) redirect(next ?? '/dashboard')

  return (
    <div className="paper px-6 lg:px-10 py-20 sm:py-28">
      <div className="max-w-md mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          New here
        </span>
        <h1
          className="font-display mt-4 text-5xl tracking-tight"
          style={{ letterSpacing: '-0.03em' }}
        >
          Get an <em className="italic text-brand-gold font-medium">account.</em>
        </h1>
        <p className="mt-4 text-brand-muted">
          One account works for buying, selling, and re-downloading.
        </p>

        <SignUpForm demoMode={!hasSupabase} next={next} />
      </div>
    </div>
  )
}
