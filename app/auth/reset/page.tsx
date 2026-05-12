import { hasSupabase } from '@/lib/env'
import ResetForm from './ResetForm'

export const metadata = {
  title: 'Reset password — Skillzy',
}

export default function ResetPasswordPage() {
  return (
    <div className="paper px-6 lg:px-10 py-20 sm:py-28">
      <div className="max-w-md mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Forgot password
        </span>
        <h1
          className="font-display mt-4 text-5xl tracking-tight"
          style={{ letterSpacing: '-0.03em' }}
        >
          Reset <em className="italic text-brand-gold font-medium">it.</em>
        </h1>
        <p className="mt-4 text-brand-muted">
          We&rsquo;ll email a link. Click it to choose a new password.
        </p>

        <ResetForm demoMode={!hasSupabase} />
      </div>
    </div>
  )
}
