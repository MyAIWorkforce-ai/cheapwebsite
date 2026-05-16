import Link from 'next/link'

export type ProductType = 'Skill' | 'Guide' | 'Agent Setup'

export type Product = {
  id: string
  type: ProductType
  title: string
  creator: string
  platform?: string
  rating: number
  ratingCount?: number
  price: string
  featured?: boolean
  free?: boolean
  number?: string // editorial №01, etc.
}

const typeAbbrev: Record<ProductType, string> = {
  Skill: 'Skill',
  Guide: 'Guide',
  'Agent Setup': 'Agent Setup',
}

export default function ProductCard({
  product,
  variant = 'cream',
}: {
  product: Product
  variant?: 'cream' | 'emerald'
}) {
  const emerald = variant === 'emerald'
  return (
    <Link
      href={`/marketplace/${product.id}`}
      className={
        'group block h-full ' +
        (emerald
          ? 'bg-brand-navy text-brand-cream border border-brand-gold'
          : 'bg-brand-cream-card text-brand-ink border border-brand-hairline')
      }
    >
      <div className="h-full flex flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <span
            className={
              'label-cap ' +
              (emerald ? 'text-brand-gold' : 'text-brand-gold')
            }
          >
            {product.free && 'Free · '}
            {product.featured && '✿ Featured · '}
            {typeAbbrev[product.type]}
            {product.number ? ` · ${product.number}` : ''}
          </span>
          {product.platform && (
            <span
              className={
                'label-cap ' +
                (emerald ? 'text-brand-cream/60' : 'text-brand-muted')
              }
            >
              {product.platform}
            </span>
          )}
        </div>

        <h3
          className={
            'font-display mt-6 text-2xl sm:text-3xl leading-[1.1] tracking-tight ' +
            (emerald ? 'text-brand-cream' : 'text-brand-ink')
          }
          style={{ letterSpacing: '-0.018em' }}
        >
          {product.title}
        </h3>

        <p
          className={
            'mt-4 text-sm ' +
            (emerald ? 'text-brand-cream/75' : 'text-brand-muted')
          }
        >
          by{' '}
          <span className={emerald ? 'text-brand-cream' : 'text-brand-ink'}>
            {product.creator}
          </span>
        </p>

        <div className="mt-auto pt-10 flex items-end justify-between">
          <span
            className={
              'inline-flex items-center gap-1.5 text-xs ' +
              (emerald ? 'text-brand-cream/80' : 'text-brand-muted')
            }
          >
            <svg
              aria-hidden
              className={
                'w-3.5 h-3.5 ' +
                (emerald ? 'text-brand-gold-soft' : 'text-brand-gold')
              }
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 0 0 .95.69h4.165c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 0 0-.364 1.118l1.287 3.96c.3.922-.756 1.688-1.539 1.118l-3.37-2.448a1 1 0 0 0-1.176 0l-3.37 2.448c-.783.57-1.838-.196-1.539-1.118l1.287-3.96a1 1 0 0 0-.363-1.118L2.06 9.387c-.783-.57-.38-1.81.588-1.81h4.165a1 1 0 0 0 .95-.69l1.286-3.96Z" />
            </svg>
            <span className={emerald ? 'text-brand-cream' : 'text-brand-ink'}>
              {product.rating.toFixed(1)}
            </span>
            {product.ratingCount != null && <span>({product.ratingCount})</span>}
          </span>
          <span
            className={
              'font-display text-xl ' +
              (emerald ? 'text-brand-cream' : 'text-brand-ink')
            }
          >
            {product.price}
          </span>
        </div>
      </div>
    </Link>
  )
}
