import Link from 'next/link'
import { getAllPosts, readingMinutes } from '@/lib/blog'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Field Notes — Skillzy',
  description:
    'Practical writing on AI agents, automation, and the work that actually ships. No theory, no hype — notes from the field.',
  path: '/blog',
  keywords: ['AI agent blog', 'automation guides', 'SKILL.md', 'Skillzy field notes'],
})

export default function BlogIndex() {
  const posts = getAllPosts()
  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-16 sm:pt-24 pb-12 sm:pb-16 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Field Notes
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            The work that{' '}
            <em className="italic text-brand-gold font-medium">actually ships.</em>
          </h1>
          <p className="mt-6 text-xl text-brand-ink max-w-2xl leading-snug">
            Practical writing on AI agents and automation — from people who use
            this stuff to run real businesses.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20">
        <div className="max-w-page mx-auto">
          <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8"
                >
                  <div className="lg:col-span-3 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    {new Date(p.publishedAt).toLocaleDateString(undefined, {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    · {readingMinutes(p)} min
                  </div>
                  <div className="lg:col-span-9">
                    <h2
                      className="font-display text-3xl sm:text-4xl tracking-tight group-hover:text-brand-gold transition-colors"
                      style={{ letterSpacing: '-0.025em' }}
                    >
                      {p.title}
                    </h2>
                    <p className="mt-3 text-brand-muted leading-relaxed max-w-prose">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
