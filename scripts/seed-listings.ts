/**
 * Seed the listings table from the static catalogue in lib/catalog.ts.
 * Run after db/schema.sql has been applied to the Supabase project.
 *
 *   npm run seed:listings
 *
 * Reads:  NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  (from .env.local)
 * Writes: profiles + listings rows
 *
 * Idempotent — uses upsert on (id) so re-running is safe.
 */
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { products, type Creator } from '../lib/catalog'

config({ path: '.env.local' })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
})

// Catalogue creators don't have auth.users rows. The listings table requires
// creator_id -> profiles.id -> auth.users.id. For seeding the marketplace
// from static data we generate stable UUIDs from the handle and insert
// placeholder auth users via the admin API so profiles can FK to them.
import { createHash, randomUUID } from 'node:crypto'
function uuidFromString(s: string): string {
  const h = createHash('sha1').update(s).digest('hex')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`
}

async function ensureCreatorUser(c: Creator): Promise<string> {
  const handle = c.handle.replace(/^@/, '')
  const email = `${handle}@seed.skillzy.ai`
  const id = uuidFromString(`skillzy-creator:${handle}`)

  // Try to find an existing seed user by email.
  const { data: list } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 })
  const existing = list?.users.find((u) => u.email === email)
  if (existing) return existing.id

  const { data, error } = await supabase.auth.admin.createUser({
    id,
    email,
    email_confirm: true,
    user_metadata: { name: c.name, seed: true },
  })
  if (error) throw new Error(`createUser ${handle}: ${error.message}`)
  return data.user!.id
}

async function upsertProfile(userId: string, c: Creator) {
  const handle = c.handle.replace(/^@/, '')
  const { error } = await supabase.from('profiles').upsert(
    {
      id: userId,
      handle,
      name: c.name,
      bio: c.bio,
    },
    { onConflict: 'id' },
  )
  if (error) throw new Error(`profile ${handle}: ${error.message}`)
}

function priceToCents(price: string): number {
  const n = Number(price.replace(/[^0-9.]/g, ''))
  return Math.round(n * 100)
}

async function main() {
  console.log(`Seeding ${products.length} listings into ${url}`)

  // Deduplicate creators across products.
  const creatorMap = new Map<string, Creator>()
  for (const p of products) creatorMap.set(p.creator.handle, p.creator)

  const creatorIdByHandle = new Map<string, string>()
  for (const c of creatorMap.values()) {
    const id = await ensureCreatorUser(c)
    await upsertProfile(id, c)
    creatorIdByHandle.set(c.handle, id)
    console.log(`  profile  ${c.handle.padEnd(18)} -> ${id}`)
  }

  for (const p of products) {
    const creator_id = creatorIdByHandle.get(p.creator.handle)!
    const { error } = await supabase.from('listings').upsert(
      {
        id: p.id,
        creator_id,
        type: p.type,
        title: p.title,
        tagline: p.tagline,
        niche: p.niche ?? null,
        platform_list: p.platformList,
        price_cents: priceToCents(p.price),
        version: p.version,
        rating: p.rating,
        rating_count: p.ratingCount,
        description: p.description,
        what_you_get: p.whatYouGet,
        how_it_works: p.howItWorks,
        skill_md_preview: p.skillMdPreview ?? null,
        use_cases: p.useCases ?? null,
        faqs: p.faqs,
        related_ids: p.relatedIds,
        status: 'live',
      },
      { onConflict: 'id' },
    )
    if (error) throw new Error(`listing ${p.id}: ${error.message}`)
    console.log(`  listing  ${p.id}`)
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
