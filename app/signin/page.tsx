import Link from 'next/link'

export const metadata = {
  title: 'Sign in — Skillzy',
  description: 'Sign in to Skillzy to buy, sell, and re-download your skills and agent setups.',
}

export default function SignInPage() {
  return (
    <div className="px-5 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="max-w-sm mx-auto">
        <h1 className="text-3xl font-extrabold text-brand-ink tracking-tight text-center">
          Sign in to Skillzy
        </h1>
        <p className="mt-3 text-center text-brand-muted text-sm">
          Buy once, re-download anytime. Sell anytime.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-brand-line rounded-full py-3 font-semibold text-brand-ink hover:border-brand-ink transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.45c-.24 1.4-1.7 4.12-5.45 4.12a6.21 6.21 0 1 1 0-12.42c1.94 0 3.24.83 3.99 1.54l2.72-2.62C16.95 3.13 14.7 2 12 2 6.92 2 2.83 6.08 2.83 11.16S6.92 20.33 12 20.33c6.93 0 9.18-4.86 9.18-7.83 0-.53-.06-.93-.13-1.34H12z"
              />
            </svg>
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-brand-line rounded-full py-3 font-semibold text-brand-ink hover:border-brand-ink transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.73.5.66 5.58.66 11.86c0 5.02 3.25 9.27 7.76 10.78.57.11.78-.25.78-.55v-2.13c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.71.08-.69.08-.69 1.14.08 1.74 1.18 1.74 1.18 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.52-.29-5.17-1.27-5.17-5.64 0-1.25.44-2.27 1.17-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.16 1.17a10.9 10.9 0 0 1 5.76 0c2.2-1.48 3.15-1.17 3.15-1.17.63 1.58.24 2.74.12 3.03.73.8 1.16 1.82 1.16 3.07 0 4.39-2.66 5.34-5.2 5.62.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.78.55a11.36 11.36 0 0 0 7.76-10.78C23.34 5.58 18.27.5 12 .5Z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        <div className="my-8 flex items-center gap-3 text-xs text-brand-muted">
          <span className="flex-1 h-px bg-brand-line" />
          OR
          <span className="flex-1 h-px bg-brand-line" />
        </div>

        <form className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-brand-ink">
            Email
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-xl border border-brand-line px-4 py-3 text-base focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
            />
          </label>
          <label className="text-sm font-semibold text-brand-ink">
            Password
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-xl border border-brand-line px-4 py-3 text-base focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
            />
          </label>
          <button
            type="submit"
            className="mt-2 bg-brand-yellow text-brand-ink font-bold px-6 py-3.5 rounded-full hover:bg-brand-yellow-dark transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-muted">
          New here?{' '}
          <Link href="/signin?mode=signup" className="font-semibold text-brand-purple hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
