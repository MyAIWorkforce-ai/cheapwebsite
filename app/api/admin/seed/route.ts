/**
 * One-shot admin endpoint to seed the catalogue from lib/catalog.ts into
 * the live Supabase project. Idempotent — uses upsert so re-running is
 * safe. Protected by SUPABASE_SERVICE_ROLE_KEY: callers must send it
 * in the Authorization header.
 *
 *   curl -X POST https://www.skillzy.ai/api/admin/seed \
 *     -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY"
 *
 * Returns a JSON summary of how many profiles / listings were upserted.
 */
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createHash, timingSafeEqual } from 'node:crypto'
import { products, type Creator } from '@/lib/catalog'
import { env, hasSupabase } from '@/lib/env'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function uuidFromString(s: string): string {
  const h = createHash('sha1').update(s).digest('hex')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`
}

function priceToCents(price: string): number {
  const n = Number(price.replace(/[^0-9.]/g, ''))
  return Math.round(n * 100)
}

function typeFromLabel(label: string): 'skill' | 'guide' | 'agent_setup' {
  if (label === 'Skill') return 'skill'
  if (label === 'Guide') return 'guide'
  return 'agent_setup'
}

export async function POST(req: Request) {
  if (!hasSupabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  const auth = req.headers.get('authorization') ?? ''
  const token = auth.replace(/^Bearer\s+/i, '')
  const expected = env.supabase.serviceRoleKey
  const tokenBuf = Buffer.from(token)
  const expectedBuf = Buffer.from(expected)
  const authorized =
    Boolean(token) &&
    Boolean(expected) &&
    tokenBuf.length === expectedBuf.length &&
    timingSafeEqual(tokenBuf, expectedBuf)
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    env.supabase.url,
    env.supabase.serviceRoleKey,
    { auth: { persistSession: false } },
  )

  const log: string[] = []
  let profileCount = 0
  let listingCount = 0

  // Deduplicate creators across products.
  const creatorMap = new Map<string, Creator>()
  for (const p of products) creatorMap.set(p.creator.handle, p.creator)

  // 1. Make sure each creator has an auth.users row + a profiles row.
  const creatorIdByHandle = new Map<string, string>()
  const { data: list } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  })
  const existingByEmail = new Map(list?.users.map((u) => [u.email ?? '', u.id]) ?? [])

  for (const c of Array.from(creatorMap.values())) {
    const handle = c.handle.replace(/^@/, '')
    const email = `${handle}@seed.skillzy.ai`
    let userId = existingByEmail.get(email)

    if (!userId) {
      const id = uuidFromString(`skillzy-creator:${handle}`)
      const { data, error } = await supabase.auth.admin.createUser({
        id,
        email,
        email_confirm: true,
        user_metadata: { name: c.name, seed: true },
      })
      if (error) {
        return NextResponse.json(
          { error: `createUser ${handle}: ${error.message}`, log },
          { status: 500 },
        )
      }
      userId = data.user!.id
      log.push(`auth user created: ${handle}`)
    }

    const { error: profileError } = await supabase.from('profiles').upsert(
      {
        id: userId,
        handle,
        name: c.name,
        bio: c.bio,
      },
      { onConflict: 'id' },
    )
    if (profileError) {
      return NextResponse.json(
        { error: `profile ${handle}: ${profileError.message}`, log },
        { status: 500 },
      )
    }
    profileCount++
    creatorIdByHandle.set(c.handle, userId)
  }

  // 2. Upsert every listing.
  for (const p of products) {
    const creator_id = creatorIdByHandle.get(p.creator.handle)!
    const { error } = await supabase.from('listings').upsert(
      {
        slug: p.id,
        creator_id,
        type: typeFromLabel(p.type),
        title: p.title,
        tagline: p.tagline,
        niche: p.niche ?? null,
        platform_list: p.platformList,
        price_cents: priceToCents(p.price),
        version: p.version,
        description: p.description,
        what_you_get: p.whatYouGet,
        how_it_works: p.howItWorks,
        skill_md_preview: p.skillMdPreview ?? null,
        use_cases: p.useCases ?? null,
        faqs: p.faqs,
        related_ids: p.relatedIds,
        status: 'live',
      },
      { onConflict: 'slug' },
    )
    if (error) {
      return NextResponse.json(
        { error: `listing ${p.id}: ${error.message}`, log },
        { status: 500 },
      )
    }
    listingCount++
  }

  return NextResponse.json({
    ok: true,
    profiles: profileCount,
    listings: listingCount,
    log,
  })
}
