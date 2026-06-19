/**
 * GET /api/cron/seo-health
 *
 * Weekly health check on the SEO-critical surfaces: each URL returns
 * 200, has a self-referencing canonical, and a non-empty <title>.
 * Returns a JSON report; non-2xx if anything fails so an uptime/cron
 * monitor can alert.
 *
 * Auth: if CRON_SECRET is set, require it (Authorization: Bearer ...
 * or ?key=). Vercel Cron sends the configured secret.
 *
 * Deliberately a curated list, not the whole 130-URL sitemap —
 * cheap, fast, and covers every page *type*.
 */
import { NextResponse } from 'next/server'
import { SITE_URL, canonical } from '@/lib/seo'
import { env } from '@/lib/env'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PATHS = [
  '/',
  '/marketplace',
  '/for/electricians',
  '/platforms/n8n',
  '/sell',
  '/how-it-works',
  '/about',
  '/blog',
  '/blog/what-is-a-skill-md-file',
  '/sitemap.xml',
  '/robots.txt',
]

export async function GET(req: Request) {
  const url = new URL(req.url)
  // Fail closed: refuse the request entirely when CRON_SECRET is unset.
  if (!env.cronSecret) {
    return NextResponse.json(
      { error: 'CRON_SECRET not configured' },
      { status: 503 },
    )
  }
  const auth = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  const key = url.searchParams.get('key')
  if (auth !== env.cronSecret && key !== env.cronSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = await Promise.all(
    PATHS.map(async (p) => {
      const target = `${SITE_URL}${p}`
      try {
        const res = await fetch(target, { cache: 'no-store' })
        const body = res.ok ? await res.text() : ''
        const isXmlOrTxt = p.endsWith('.xml') || p.endsWith('.txt')
        const canonOk =
          isXmlOrTxt ||
          body.includes(`rel="canonical" href="${canonical(p)}"`)
        const titleOk = isXmlOrTxt || /<title>[^<]+<\/title>/.test(body)
        const ok = res.ok && canonOk && titleOk
        return {
          path: p,
          status: res.status,
          canonicalOk: canonOk,
          titleOk,
          ok,
        }
      } catch (err) {
        return {
          path: p,
          status: 0,
          canonicalOk: false,
          titleOk: false,
          ok: false,
          error: (err as Error).message,
        }
      }
    }),
  )

  const failed = results.filter((r) => !r.ok)
  return NextResponse.json(
    {
      checkedAt: new Date().toISOString(),
      total: results.length,
      failing: failed.length,
      results,
    },
    { status: failed.length > 0 ? 500 : 200 },
  )
}
