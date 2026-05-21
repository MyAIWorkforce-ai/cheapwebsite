/**
 * Next.js instrumentation hook (runs once on server startup).
 * Imports the right Sentry config for the current runtime so errors
 * are captured wherever they happen.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}
