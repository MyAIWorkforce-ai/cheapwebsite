import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPost, readingMinutes } from '@/lib/blog'
import { getProduct } from '@/lib/catalog'
import { getNiche, getPlatform, nicheSlug } from '@/lib/content'
import StructuredData from '@/components/StructuredData'
// NewsletterForm import paused with the Dispatch — restore when reviving.
// import NewsletterForm from '@/components/NewsletterForm'
import { pageMetadata, SITE_URL } from '@/lib/seo'
import { breadcrumbLd } from '@/lib/jsonld'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) return { title: 'Not found — Skillzy' }
  return pageMetadata({
    title: `${post.title} — Skillzy Field Notes`,
    description: post.excerpt.slice(0, 160),
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    ogType: 'article',
  })
}

function ListingCard({ id, label }: { id: string; label: string }) {
  const p = getProduct(id)
  if (!p) return null
  return (
    <Link
      href={`/marketplace/${p.id}`}
      className="my-8 block border border-brand-ink bg-brand-cream-card p-6 hover:bg-white transition-colors group not-prose"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
        Featured listing
      </span>
      <p
        className="font-display text-2xl mt-2 tracking-tight group-hover:text-brand-gold transition-colors"
        style={{ letterSpacing: '-0.02em' }}
      >
        {p.title}
      </p>
      <p className="mt-1.5 text-sm text-brand-muted">{p.tagline}</p>
      <span className="mt-3 inline-block text-sm border-b border-brand-ink pb-0.5">
        {label} · {p.price} →
      </span>
    </Link>
  )
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  // Topical first: posts sharing a tag, then recent ones to fill 3.
  const others = getAllPosts().filter((p) => p.slug !== post.slug)
  const sameTag = others.filter((p) =>
    p.tags.some((t) => post.tags.includes(t)),
  )
  const related = [
    ...sameTag,
    ...others.filter((p) => !sameTag.some((s) => s.slug === p.slug)),
  ].slice(0, 3)

  // Close the cluster loop: link the post out to the niche/platform
  // landing pages of the listings it features.
  const linkedProducts = post.relatedListings
    .map((id) => getProduct(id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
  const nicheLinks = Array.from(
    new Map(
      linkedProducts
        .map((p) => (p.niche ? getNiche(nicheSlug(p.niche)) : undefined))
        .filter((x): x is NonNullable<typeof x> => Boolean(x))
        .map((n) => [n.slug, n] as const),
    ).values(),
  ).slice(0, 3)
  const platformLinks = Array.from(
    new Map(
      linkedProducts
        .flatMap((p) => p.platformList)
        .map((x) => getPlatform(x.toLowerCase()))
        .filter((x): x is NonNullable<typeof x> => Boolean(x))
        .map((pl) => [pl.slug, pl] as const),
    ).values(),
  ).slice(0, 4)

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Skillzy',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  }

  return (
    <article className="paper">
      <StructuredData
        data={[
          articleLd,
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Field Notes', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href="/blog" className="hover:text-brand-gold transition-colors">
            Field Notes
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">{post.title.slice(0, 40)}…</span>
        </nav>
      </div>

      <header className="px-6 lg:px-10 pt-10 sm:pt-14 pb-10 border-b border-brand-hairline">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            {new Date(post.publishedAt).toLocaleDateString(undefined, {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}{' '}
            · {readingMinutes(post)} min read
          </div>
          <h1
            className="font-display mt-5 text-4xl sm:text-6xl tracking-tight leading-[1]"
            style={{ letterSpacing: '-0.03em' }}
          >
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-brand-muted">
            {post.author} — {post.authorRole}
          </p>
        </div>
      </header>

      {/* Top-of-post Dispatch signup paused until ~50–100 creators.
          When reviving: re-wrap in
          <div className="px-6 lg:px-10 pt-10"><div className="max-w-3xl mx-auto border border-brand-hairline bg-brand-cream-card p-5">…</div></div>
          with NewsletterForm + the "The dispatch" label/blurb. */}

      <div className="px-6 lg:px-10 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-lg leading-relaxed">
          {post.body.map((b, i) => {
            if (b.t === 'h2')
              return (
                <h2
                  key={i}
                  className="font-display text-3xl tracking-tight mt-12 mb-4"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  {b.text}
                </h2>
              )
            if (b.t === 'p')
              return (
                <p key={i} className="mt-5 text-brand-ink/90">
                  {b.text}
                </p>
              )
            if (b.t === 'ul')
              return (
                <ul key={i} className="mt-5 space-y-2 list-disc pl-6 text-brand-ink/90">
                  {b.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              )
            if (b.t === 'quote')
              return (
                <blockquote
                  key={i}
                  className="mt-8 border-l-2 border-brand-gold pl-5 font-display text-2xl italic text-brand-ink"
                >
                  {b.text}
                </blockquote>
              )
            if (b.t === 'listing')
              return <ListingCard key={i} id={b.id} label={b.label} />
            return null
          })}

          {/* Bottom-of-post Dispatch signup paused. Restore inside
              <div className="mt-14 border border-brand-hairline bg-brand-cream-card p-6">
                "Liked this? Get the next one." + "Field Notes, every
                other Friday." + <NewsletterForm />
              </div>
              when reviving the newsletter (~50–100 creators). */}
        </div>
      </div>

      {(nicheLinks.length > 0 || platformLinks.length > 0) && (
        <section className="px-6 lg:px-10 py-12 border-t border-brand-hairline">
          <div className="max-w-page mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Browse the catalogue
            </span>
            <div className="mt-5 flex flex-wrap gap-3">
              {nicheLinks.map((n) => (
                <Link
                  key={`n-${n.slug}`}
                  href={`/for/${n.slug}`}
                  className="inline-flex items-center border border-brand-ink px-4 py-2 text-sm hover:bg-brand-navy hover:text-brand-cream hover:border-brand-navy transition-colors"
                >
                  AI agents for {n.name}
                </Link>
              ))}
              {platformLinks.map((pl) => (
                <Link
                  key={`p-${pl.slug}`}
                  href={`/platforms/${pl.slug}`}
                  className="inline-flex items-center border border-brand-ink px-4 py-2 text-sm hover:bg-brand-navy hover:text-brand-cream hover:border-brand-navy transition-colors"
                >
                  Skills for {pl.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="px-6 lg:px-10 py-14 border-t border-brand-hairline">
          <div className="max-w-page mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Keep reading
            </span>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="bg-brand-cream-card p-6 hover:bg-white transition-colors group"
                >
                  <h3
                    className="font-display text-xl tracking-tight group-hover:text-brand-gold transition-colors"
                    style={{ letterSpacing: '-0.018em' }}
                  >
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-muted">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
