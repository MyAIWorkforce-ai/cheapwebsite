// Sidebar trust badge for listing pages. Restating the no-window,
// human-reviewed refund stance the rest of the site uses.
export default function GuaranteeBadge() {
  return (
    <div className="border border-brand-hairline bg-brand-cream-card p-5">
      <div className="flex items-start gap-3">
        <span aria-hidden className="text-brand-gold text-lg leading-none mt-0.5">
          ✦
        </span>
        <div>
          <p className="font-display text-lg tracking-tight" style={{ letterSpacing: '-0.018em' }}>
            Backed by a human.
          </p>
          <p className="mt-1.5 text-sm text-brand-muted leading-relaxed">
            If the listing doesn’t work as described, email{' '}
            <a
              href="mailto:help@skillzy.ai"
              className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold"
            >
              help@skillzy.ai
            </a>{' '}
            with your order number. A real person reviews every request — no
            forms, no friction.
          </p>
        </div>
      </div>
    </div>
  )
}
