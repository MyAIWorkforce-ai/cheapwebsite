import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AuthForm from '@/components/memyselfi/AuthForm'
import { currentAccount } from '@/lib/memyselfi/auth'

export const metadata: Metadata = {
  title: 'Create your account',
  robots: { index: false },
}

export default async function SignupPage() {
  if (await currentAccount()) redirect('/memyselfi/account')
  return (
    <div className="max-w-md mx-auto px-5 sm:px-8 py-20">
      <h1
        className="font-display text-4xl"
        style={{ letterSpacing: '-0.03em', color: 'var(--mmi-text)' }}
      >
        Claim your name.
      </h1>
      <p className="mt-3 text-[15px]" style={{ color: 'var(--mmi-muted)' }}>
        One account. One twin. One link that is you.
      </p>
      <div className="mt-9">
        <AuthForm mode="signup" />
      </div>
    </div>
  )
}
