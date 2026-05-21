/**
 * Sentry — browser-side error capture.
 *
 * Loaded on every page. If SENTRY_DSN env var is unset, Sentry.init is a
 * no-op, so missing config never crashes the app. Sample rate is dialled
 * down for performance; bump if traffic is modest and you want richer data.
 */
import * as Sentry from '@sentry/nextjs'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.0,
    replaysOnErrorSampleRate: 1.0,
    // Strip noisy known-safe errors so the inbox stays signal-heavy.
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Network request failed',
      'AbortError',
    ],
  })
}
