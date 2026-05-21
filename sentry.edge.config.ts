/**
 * Sentry — edge runtime error capture.
 *
 * Catches errors in middleware + edge route handlers. If SENTRY_DSN is
 * unset, init is a no-op.
 */
import * as Sentry from '@sentry/nextjs'

const dsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
  })
}
