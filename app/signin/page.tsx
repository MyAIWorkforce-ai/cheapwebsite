import Link from 'next/link'

export const metadata = {
  title: 'Sign in — Skillzy',
  description: 'Sign in to Skillzy.',
}

export default function SignInPage() {
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
          Sign{' '}
          <em className="italic text-brand-gold font-medium">in.</em>
        </h1>
        <p className="mt-4 text-brand-muted">
          Buy once, re-download any time. Sell on your own schedule.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-brand-hairline bg-brand-cream-card py-3.5 text-sm hover:border-brand-ink transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden>
              <path fill="#EA4335" d="M12 10.2v3.9h5.45c-.24 1.4-1.7 4.12-5.45 4.12a6.21 6.21 0 1 1 0-12.42c1.94 0 3.24.83 3.99 1.54l2.72-2.62C16.95 3.13 14.7 2 12 2 6.92 2 2.83 6.08 2.83 11.16S6.92 20.33 12 20.33c6.93 0 9.18-4.86 9.18-7.83 0-.53-.06-.93-.13-1.34H12z" />
            </svg>
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-brand-hairline bg-brand-cream-card py-3.5 text-sm hover:border-brand-ink transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.73.5.66 5.58.66 11.86c0 5.02 3.25 9.27 7.76 10.78.57.11.78-.25.78-.55v-2.13c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.71.08-.69.08-.69 1.14.08 1.74 1.18 1.74 1.18 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.52-.29-5.17-1.27-5.17-5.64 0-1.25.44-2.27 1.17-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.16 1.17a10.9 10.9 0 0 1 5.76 0c2.2-1.48 3.15-1.17 3.15-1.17.63 1.58.24 2.74.12 3.03.73.8 1.16 1.82 1.16 3.07 0 4.39-2.66 5.34-5.2 5.62.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.78.55a11.36 11.36 0 0 0 7.76-10.78C23.34 5.58 18.27.5 12 .5Z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        <div className="my-8 flex items-center gap-4 label-cap text-brand-muted">
          <span className="flex-1 h-px bg-brand-hairline" />
          or
          <span className="flex-1 h-px bg-brand-hairline" />
        </div>

        <form className="flex flex-col gap-5">
          <label className="block">
            <span className="label-cap text-brand-muted">Email</span>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 placeholder:text-brand-muted/60"
            />
          </label>
          <label className="block">
            <span className="label-cap text-brand-muted">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 placeholder:text-brand-muted/60"
            />
          </label>
          <button
            type="submit"
            className="mt-3 bg-brand-gold text-brand-ink font-semibold px-6 py-3.5 text-[15px] hover:bg-brand-gold-dark transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="mt-8 text-sm text-brand-muted">
          New here?{' '}
          <Link href="/signin?mode=signup" className="text-brand-ink border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
