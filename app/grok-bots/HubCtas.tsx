'use client'

import Link from 'next/link'
import { track } from '@/lib/analytics'

// Thin client-only wrappers around the Grok Bot hub CTAs so the
// Google Analytics + Google Ads events fire on click. Kept out of
// the server-component page.tsx so the page stays static-renderable.

export function TemplateDownloadButton({
  source,
  className,
  children,
}: {
  source: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <a
      href="/templates/skillzy-grok-bot-bundle.zip"
      download
      onClick={() => track.grokBotTemplateDownload(source)}
      className={className}
    >
      {children}
    </a>
  )
}

export function HubCtaLink({
  href,
  cta,
  className,
  children,
}: {
  href: string
  cta: 'browse' | 'sell' | 'guide' | 'template'
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={() => track.grokBotHubCta(cta)}
      className={className}
    >
      {children}
    </Link>
  )
}
