import Link from 'next/link'

type LogoProps = {
  href?: string | null
  className?: string
  tone?: 'emerald' | 'cream' | 'ink'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const toneClass = {
  emerald: 'text-brand-gold',
  cream: 'text-brand-cream',
  ink: 'text-brand-ink',
}

const sizeClass = {
  sm: 'text-2xl',
  md: 'text-[2.5rem] sm:text-[2.75rem]',
  lg: 'text-5xl',
  xl: 'text-6xl sm:text-7xl',
}

export default function Logo({
  href = '/',
  className = '',
  tone = 'emerald',
  size = 'md',
}: LogoProps) {
  const content = (
    <span
      className={`font-display ${sizeClass[size]} ${toneClass[tone]} font-medium leading-none ${className}`}
      style={{ letterSpacing: '-0.02em' }}
    >
      Skillzy
    </span>
  )

  if (!href) return content

  return (
    <Link href={href} aria-label="Skillzy — home" className="inline-flex items-baseline">
      {content}
    </Link>
  )
}
