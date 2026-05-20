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
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function priceLabel(cents: number | null | undefined): string {
  if (!cents || cents <= 0) return 'Free'
  const dollars = cents / 100
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`
}

function howItWorksFor(type: ProductType): Step[] {
  if (type === 'Guide')
    return [
      { n: '01', title: 'Buy', desc: 'One purchase, yours forever. Re-download any time.' },
      { n: '02', title: 'Read', desc: 'Built to finish in one sitting.' },
      { n: '03', title: 'Apply', desc: 'Use it. Ship the thing.' },
    ]
  if (type === 'Skill')
    return [
      { n: '01', title: 'Download', desc: 'Buy once, get the file by email and on your dashboard.' },
      { n: '02', title: 'Drop it in', desc: 'Paste it into your agent. One minute.' },
      { n: '03', title: 'Run it', desc: 'Your agent picks up the new capability immediately.' },
    ]
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

type ProfileJoin = { name: string | null; handle: string | null }

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
    },
    platformList: row.platform_list ?? [],
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
  'id, slug, type, title, tagline, niche, price_cents, platform_list, description, what_you_get, created_at, profiles:creator_id ( name, handle )'

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

/** All live DB listings, newest first, mapped to Product shape. */
export async function liveDbProducts(): Promise<Product[]> {
  if (!hasSupabase) return []
  try {
    const admin = createServiceClient()
    const { data } = await admin
      .from('listings')
      .select(LISTING_COLS)
      .eq('status', 'live')
      .order('created_at', { ascending: false })
      .limit(200)
    return (data ?? []).map((r) => mapRow(r as unknown as ListingRow))
  } catch {
    return []
  }
}
