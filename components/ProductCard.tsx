import Link from 'next/link'

export type ProductType = 'Skill' | 'Guide' | 'Agent Setup'

export type Product = {
  id: string
  type: ProductType
  title: string
  creator: string
  rating: number
  ratingCount?: number
  price: string
  emoji: string
  accent: string // tailwind bg-* class
}

const typeBadgeColor: Record<ProductType, string> = {
  Skill: 'bg-slate-100 text-brand-ink',
  Guide: 'bg-brand-yellow text-brand-ink',
  'Agent Setup': 'bg-brand-purple text-white',
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/marketplace/${product.id}`}
      className="group block bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-purple/40 hover:shadow-[0_8px_30px_-12px_rgba(124,58,237,0.25)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5"
    >
      <div
        className={`relative aspect-[5/3] ${product.accent} flex items-center justify-center`}
      >
        <span className="text-5xl sm:text-6xl select-none" aria-hidden>
          {product.emoji}
        </span>
        <span
          className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${typeBadgeColor[product.type]}`}
        >
          {product.type}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-brand-ink leading-snug line-clamp-2 min-h-[2.75rem] group-hover:text-brand-purple transition-colors">
          {product.title}
        </h3>
        <p className="mt-1 text-xs text-brand-muted">by {product.creator}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-xs text-brand-muted">
            <svg
              aria-hidden
              className="w-3.5 h-3.5 text-brand-yellow-dark"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 0 0 .95.69h4.165c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 0 0-.364 1.118l1.287 3.96c.3.922-.756 1.688-1.539 1.118l-3.37-2.448a1 1 0 0 0-1.176 0l-3.37 2.448c-.783.57-1.838-.196-1.539-1.118l1.287-3.96a1 1 0 0 0-.363-1.118L2.06 9.387c-.783-.57-.38-1.81.588-1.81h4.165a1 1 0 0 0 .95-.69l1.286-3.96Z" />
            </svg>
            <span className="font-semibold text-brand-ink">
              {product.rating.toFixed(1)}
            </span>
            {product.ratingCount != null && (
              <span>({product.ratingCount})</span>
            )}
          </span>
          <span className="text-sm font-bold text-brand-ink">{product.price}</span>
        </div>
      </div>
    </Link>
  )
}
