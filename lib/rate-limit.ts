/**
 * Rate limiter with two backends:
 *
 *   1. Upstash Redis (REST) — if UPSTASH_REDIS_REST_URL and
 *      UPSTASH_REDIS_REST_TOKEN are both set in env. Counters survive
 *      Vercel cold-starts so daily limits actually mean daily.
 *   2. In-process Map — fallback, soft limit per Vercel function
 *      instance. Fine for casual abuse, not bulletproof.
 *
 * The caller doesn't care which backend ran. Use:
 *
 *   const r = await checkRateLimit('draft:ip:1.2.3.4', { max: 10, windowSec: 86400 })
 *   if (!r.ok) return 429 with r.reason
 *
 * Counters are atomic via Redis INCR + EXPIRE in the Upstash path.
 */
import { Redis } from '@upstash/redis'

let upstash: Redis | null | undefined

function getUpstash(): Redis | null {
  if (upstash !== undefined) return upstash
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    upstash = null
    return null
  }
  try {
    upstash = new Redis({ url, token })
    return upstash
  } catch {
    upstash = null
    return null
  }
}

// In-memory fallback. Survives only while the Vercel function instance
// is warm.
type Counter = { count: number; resetAt: number }
const inMemory: Map<string, Counter> =
  (globalThis as { __skzRate?: Map<string, Counter> }).__skzRate ?? new Map()
;(globalThis as { __skzRate?: Map<string, Counter> }).__skzRate = inMemory

export type RateLimitResult =
  | { ok: true; remaining: number; backend: 'upstash' | 'memory' }
  | { ok: false; reason: string; backend: 'upstash' | 'memory' }

export async function checkRateLimit(
  key: string,
  { max, windowSec, reason }: { max: number; windowSec: number; reason?: string },
): Promise<RateLimitResult> {
  const fallbackReason =
    reason ??
    "You've hit today's limit. Try again later, or sign in to keep going."

  const r = getUpstash()
  if (r) {
    try {
      // Atomic increment, set TTL only on the first hit so the window is
      // bound to the first request in this period.
      const count = await r.incr(key)
      if (count === 1) {
        await r.expire(key, windowSec)
      }
      if (count > max) {
        return { ok: false, reason: fallbackReason, backend: 'upstash' }
      }
      return { ok: true, remaining: Math.max(0, max - count), backend: 'upstash' }
    } catch {
      // Fall through to in-memory on Upstash error so the site doesn't
      // wedge if Upstash is briefly unreachable.
    }
  }

  // In-memory fallback.
  const now = Date.now()
  let entry = inMemory.get(key)
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + windowSec * 1000 }
    inMemory.set(key, entry)
  }
  if (entry.count >= max) {
    return { ok: false, reason: fallbackReason, backend: 'memory' }
  }
  entry.count++
  return { ok: true, remaining: Math.max(0, max - entry.count), backend: 'memory' }
}

export function callerIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]?.trim() || 'unknown'
  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}
