import { getProduct, type Product, type ProductType, type Step } from '@/lib/catalog'
import { createServiceClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

// Bridges the two halves of the app: the static seed catalogue (demo
// showcase) and real seller listings in the database. Buyer-facing
// pages resolve products through here so a real seller's link works
// and its uploaded file can be delivered.

const TYPE_MAP: Record<string, ProductType> = {
  skill: 'Skill',
  guide: 'Guide',
  agent_setup: 'Agent Setup',
  prompt_pack: 'Prompt Pack',
  loop: 'Loop',
  mcp_server: 'MCP Server',
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function priceLabel(cents: number | null | undefined): string {
  if (!cents || cents <= 0) return 'Free'
  const dollars = cents / 100
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`
}

function howItWorksFor(type: ProductType): Step[] {
  // Consistent 4-step layout across every type so the how-it-works
  // grid never renders an empty 4th cell (was showing as an ugly
  // blank on Skill / Guide / Prompt Pack / Loop listings, which
  // only had 3 steps). Step 04 always closes on the Skillzy
  // tagline — "your agent just got smarter" — restated per-type.
  if (type === 'Guide')
    return [
      { n: '01', title: 'Buy', desc: 'One purchase, yours forever. Re-download any time.' },
      { n: '02', title: 'Read', desc: 'Built to finish in one sitting.' },
      { n: '03', title: 'Apply', desc: 'Use it. Ship the thing.' },
      { n: '04', title: 'You just got sharper', desc: 'The playbook is yours. Same guide, every future job.' },
    ]
  if (type === 'Skill')
    return [
      { n: '01', title: 'Download', desc: 'Buy once, get the file by email and on your dashboard.' },
      { n: '02', title: 'Drop it in', desc: 'Paste it into your agent. One minute.' },
      { n: '03', title: 'Run it', desc: 'Your agent picks up the new capability immediately.' },
      { n: '04', title: 'Your agent just got smarter', desc: 'One more thing off your plate — for every future job.' },
    ]
  if (type === 'Prompt Pack')
    return [
      { n: '01', title: 'Download', desc: 'Buy once, get the pack by email and on your dashboard.' },
      { n: '02', title: 'Paste + tweak', desc: 'Copy any prompt straight into Claude, ChatGPT, or your agent. Fill in the placeholders.' },
      { n: '03', title: 'Run', desc: 'Reuse forever across every job that fits.' },
      { n: '04', title: 'Your agent just got sharper', desc: 'Same quality output, one paste. Every time.' },
    ]
  if (type === 'Loop')
    return [
      { n: '01', title: 'Download', desc: 'Buy once, get the loop by email and on your dashboard.' },
      { n: '02', title: 'Wire the trigger', desc: 'Point it at your schedule, inbox, or webhook. 2 minutes.' },
      { n: '03', title: 'Runs itself', desc: 'Fires on the trigger every time. You check the output.' },
      { n: '04', title: 'One less thing on your list', desc: 'The loop handles it. Every trigger, every day.' },
    ]
  if (type === 'MCP Server')
    return [
      { n: '01', title: 'Download', desc: 'Buy once, get the server package by email and on your dashboard.' },
      { n: '02', title: 'Install', desc: 'Follow the README — usually one command or a config snippet paste into Claude / Cursor / Windsurf.' },
      { n: '03', title: 'Connect', desc: 'Your agent picks up the new tools + data sources automatically on next restart.' },
      { n: '04', title: 'Your agent just got new hands', desc: 'The MCP is live. Every future conversation can reach for these tools.' },
    ]
  // Agent Setup already has 4 steps — keeps its own copy.
  return [
    { n: '01', title: 'Download', desc: 'Buy once, get the bundle by email and on your dashboard.' },
    { n: '02', title: 'Drop it in', desc: 'Upload the files to your agent.' },
    { n: '03', title: 'Connect', desc: 'Wire up your tools with the setup notes.' },
    { n: '04', title: 'Press go', desc: 'The agent runs. You handle the people part.' },
  ]
}

/** True when the id belongs to a built-in demo/showcase listing. */
export function isSeedProductId(id: string): boolean {
  return Boolean(getProduct(id))
}

type ProfileJoin = {
  name: string | null
  handle: string | null
  stripe_payouts_enabled?: boolean | null
}

type ListingRow = {
  id: string
  slug: string
  type: string
  title: string
  tagline: string | null
  niche: string | null
  price_cents: number | null
  platform_list: string[] | null
  description: string[] | null
  what_you_get: string[] | null
  featured_tier: string | null
  created_at: string | null
  profiles: ProfileJoin | ProfileJoin[] | null
}

function mapRow(row: ListingRow): Product {
  const type = TYPE_MAP[row.type] ?? 'Skill'
  const prof = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles
  const handleRaw = (prof?.handle ?? 'creator').trim()
  const handle = handleRaw.startsWith('@') ? handleRaw : `@${handleRaw}`
  const updated = row.created_at
    ? new Date(row.created_at).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : ''
  const free = !row.price_cents || row.price_cents <= 0
  return {
    id: row.id,
    slug: row.slug,
    type,
    title: row.title,
    tagline: row.tagline ?? '',
    niche: row.niche ?? undefined,
    free,
    creator: {
      name: prof?.name ?? 'Skillzy creator',
      handle,
      bio: '',
      totalSales: 0,
      joined: updated,
      payoutsEnabled: prof?.stripe_payouts_enabled === true,
    },
    platformList: row.platform_list ?? [],
    featured: row.featured_tier === 'showcase',
    rating: 0,
    ratingCount: 0,
    price: priceLabel(row.price_cents),
    version: 'v1.0',
    updated,
    description: row.description ?? [],
    whatYouGet: row.what_you_get ?? [],
    howItWorks: howItWorksFor(type),
    reviews: [],
    faqs: [],
    relatedIds: [],
  }
}

const LISTING_COLS =
  'id, slug, type, title, tagline, niche, price_cents, platform_list, description, what_you_get, featured_tier, created_at, profiles:creator_id ( name, handle, stripe_payouts_enabled )'

/**
 * Resolve a product by seed id, DB slug, or DB uuid. Seed (demo)
 * listings win first. Only `live` DB listings are returned.
 */
export async function resolveProduct(
  idOrSlug: string,
): Promise<Product | undefined> {
  const seed = getProduct(idOrSlug)
  if (seed) return seed
  if (!hasSupabase) return undefined
  try {
    const admin = createServiceClient()
    const base = admin
      .from('listings')
      .select(LISTING_COLS)
      .eq('status', 'live')
    const filtered = UUID_RE.test(idOrSlug)
      ? base.eq('id', idOrSlug)
      : base.eq('slug', idOrSlug)
    const { data } = await filtered.limit(1).maybeSingle()
    return data ? mapRow(data as unknown as ListingRow) : undefined
  } catch {
    return undefined
  }
}

/** All live DB listings, featured first then newest, mapped to Product shape. */
export async function liveDbProducts(): Promise<Product[]> {
  if (!hasSupabase) return []
  try {
    const admin = createServiceClient()
    // featured_tier desc puts non-null tiers first (Postgres sorts
    // NULL last on desc by default), then created_at desc keeps the
    // newest non-featured listings on top within each bucket.
    const { data } = await admin
      .from('listings')
      .select(LISTING_COLS)
      .eq('status', 'live')
      .order('featured_tier', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .limit(200)
    return (data ?? []).map((r) => mapRow(r as unknown as ListingRow))
  } catch {
    return []
  }
}

export type DbCreator = {
  name: string
  handle: string // with leading @
  bio: string
  joined: string
}

/**
 * Resolve a real (DB-backed) creator profile + their live listings by
 * handle. Used by the public /creator/[handle] page so a real seller's
 * share link works, not just the demo catalogue creators.
 */
export async function dbCreatorByHandle(
  handle: string,
): Promise<{ creator: DbCreator; products: Product[] } | null> {
  if (!hasSupabase) return null
  const clean = handle.replace(/^@/, '').trim()
  if (!clean) return null
  try {
    const admin = createServiceClient()
    // Find the profile first (handle is citext-unique).
    const { data: profile } = await admin
      .from('profiles')
      .select('id, name, handle, bio, created_at')
      .eq('handle', clean)
      .maybeSingle()
    if (!profile) return null

    const { data: listingRows } = await admin
      .from('listings')
      .select(LISTING_COLS)
      .eq('creator_id', profile.id as string)
      .eq('status', 'live')
      .order('created_at', { ascending: false })
      .limit(200)

    const products = (listingRows ?? []).map((r) =>
      mapRow(r as unknown as ListingRow),
    )
    if (products.length === 0) return null

    return {
      creator: {
        name: (profile.name as string) ?? 'Skillzy creator',
        handle: `@${clean}`,
        bio: (profile.bio as string) ?? '',
        joined: profile.created_at
          ? new Date(profile.created_at as string).toLocaleDateString('en-AU', {
              month: 'short',
              year: 'numeric',
            })
          : '',
      },
      products,
    }
  } catch {
    return null
  }
}
