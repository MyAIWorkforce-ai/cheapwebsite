/**
 * Sentry — server-side error capture (Node runtime).
 *
 * Catches uncaught errors in server components, server actions, route
 * handlers running on Node. If SENTRY_DSN is unset, init is a no-op.
 */
import * as Sentry from '@sentry/nextjs'

const dsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
  })
}
