import Link from 'next/link'

export const metadata = {
  title: 'Guides',
  description:
    'Creator and buyer guides for Skillzy — how to sell a Grok Bot, package a skill bundle, pick a price, and more.',
}

const guides = [
  {
    href: '/guides/sell-grok-bot',
    label: 'Creator guide',
    title: 'How to sell a Grok Bot',
    desc: 'Package the bot you trained into a drop-in bundle buyers install in 5 minutes. Template included.',
  },
]

export default function GuidesIndex() {
  return (
    <article className="paper px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Guides
        </span>
        <h1
          className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[1]"
          style={{ letterSpacing: '-0.03em' }}
        >
          Read it. Then{' '}
          <em className="italic text-brand-gold font-medium">ship it.</em>
        </h1>

        <ul className="mt-14 divide-y divide-brand-hairline border-y border-brand-hairline">
          {guides.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="block py-6 group hover:bg-brand-cream-card transition-colors px-2 -mx-2"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                  {g.label}
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl mt-1 tracking-tight group-hover:text-brand-gold transition-colors"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {g.title}
                </h2>
                <p className="mt-2 text-brand-muted max-w-prose">{g.desc}</p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-14 text-brand-muted text-sm">
          More guides coming. Want one on a specific topic?{' '}
          <a
            href="mailto:hi@skillzy.ai"
            className="text-brand-ink border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
          >
            Tell us.
          </a>
        </p>
      </div>
    </article>
  )
}
