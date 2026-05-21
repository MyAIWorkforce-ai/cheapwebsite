/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't disclose the framework via X-Powered-By.
  poweredByHeader: false,

  // Next.js instrumentation hook (Sentry, etc.).
  experimental: {
    instrumentationHook: true,
  },

  // Production security headers, applied to every route.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

// Wrap with Sentry only when both DSN and auth token are present.
// Otherwise, ship the plain config — Sentry init in the runtime files
// already no-ops when DSN is missing, so error capture degrades gracefully.
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(nextConfig, {
  // The org + project are only used for sourcemap upload at build time.
  // Setting them via env vars keeps the repo clean of account names.
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  // Suppress all source map upload logs unless an auth token is present.
  silent: !process.env.SENTRY_AUTH_TOKEN,
  // Don't upload sourcemaps if there's no auth token — Sentry still works,
  // just shows minified stack traces. Better than failing the build.
  dryRun: !process.env.SENTRY_AUTH_TOKEN,
  // Hide sourcemaps from the public bundle to avoid leaking source.
  hideSourceMaps: true,
  // Tunnel Sentry events through Skillzy so ad-blockers don't drop them.
  tunnelRoute: '/monitoring',
})
