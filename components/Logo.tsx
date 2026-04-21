import Link from 'next/link'

type LogoProps = {
  variant?: 'light' | 'dark'
  href?: string | null
  className?: string
}

export default function Logo({ variant = 'light', href = '/', className = '' }: LogoProps) {
  const wordmarkColor = variant === 'dark' ? 'text-white' : 'text-[#1A1A2E]'

  const content = (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="relative w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ring-1 ring-black/5"
        style={{
          background:
            'linear-gradient(135deg, #2563EB 0%, #1D4ED8 55%, #F97316 160%)',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-white drop-shadow-sm"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Browser window */}
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M3 9h18" />
          {/* Traffic lights */}
          <circle cx="6" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="11" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
          {/* Lightning bolt — speed */}
          <path
            d="M13 11.5 L10 16 h3 l-1 3.5 L16 14 h-3 l1 -2.5 z"
            fill="#F97316"
            stroke="#F97316"
            strokeWidth={0.6}
          />
        </svg>
      </span>
      <span className={`font-bold text-lg tracking-tight ${wordmarkColor}`}>
        CheapWebsite<span className="text-[#F97316]">.com.au</span>
      </span>
    </span>
  )

  if (!href) return content

  return (
    <Link href={href} className="flex items-center" aria-label="CheapWebsite.com.au — home">
      {content}
    </Link>
  )
}
