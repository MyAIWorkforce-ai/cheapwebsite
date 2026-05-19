import Link from 'next/link'

export default function Wordmark({
  className = '',
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const scale =
    size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-xl'
  return (
    <Link
      href="/memyselfi"
      aria-label="memyselfi.ai — home"
      className={`inline-flex items-baseline font-medium tracking-tight ${scale} ${className}`}
      style={{ letterSpacing: '-0.02em' }}
    >
      <span style={{ color: 'var(--mmi-text)' }}>memyself</span>
      <span style={{ color: 'var(--mmi-accent)' }}>i</span>
      <span style={{ color: 'var(--mmi-muted)' }} className="font-normal">
        .ai
      </span>
    </Link>
  )
}
