import type { Metadata } from 'next'
import CreateFlow from '@/components/memyselfi/CreateFlow'
import { currentAccount } from '@/lib/memyselfi/auth'

export const metadata: Metadata = {
  title: 'Build your twin',
  description:
    'Tell memyselfi who you are, how you think, and how you sound. Get an AI that answers as you.',
}

export default async function CreatePage() {
  const account = await currentAccount()

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
      <header className="max-w-2xl">
        <span
          className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: 'var(--mmi-accent)' }}
        >
          Build my twin
        </span>
        <h1
          className="mt-4 font-display text-4xl sm:text-5xl"
          style={{ letterSpacing: '-0.03em', color: 'var(--mmi-text)' }}
        >
          You, in your own words.
        </h1>
        <p
          className="mt-4 text-lg leading-relaxed"
          style={{ color: 'var(--mmi-muted)' }}
        >
          No prompts to engineer. Just answer like you’d answer a curious
          stranger. It learns from exactly that.
        </p>
      </header>

      <div className="mt-12">
        <CreateFlow loggedIn={Boolean(account)} />
      </div>
    </div>
  )
}
