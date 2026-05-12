import Link from 'next/link'

type LogoProps = {
  variant?: 'light' | 'dark'
  href?: string | null
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({
  variant = 'light',
  href = '/',
  className = '',
  size = 'md',
}: LogoProps) {
  const wordmarkColor = variant === 'dark' ? 'text-white' : 'text-brand-ink'
  const mark = size === 'lg' ? 'w-12 h-12' : size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'
  const text =
    size === 'lg'
      ? 'text-3xl'
      : size === 'sm'
        ? 'text-base'
        : 'text-xl'
  const glyph =
    size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-lg'

  const content = (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className={`${mark} rounded-xl bg-brand-purple flex items-center justify-center text-white font-black ${glyph}`}
      >
        S
      </span>
      <span className={`font-extrabold tracking-tight ${text} ${wordmarkColor}`}>
        Skillzy
      </span>
    </span>
  )

  if (!href) return content

  return (
    <Link href={href} aria-label="Skillzy — home" className="inline-flex items-center">
      {content}
    </Link>
  )
}
