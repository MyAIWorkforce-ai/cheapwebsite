import type { Metadata } from 'next'
import TwinProfile from '@/components/memyselfi/TwinProfile'
import LocalTwinView from '@/components/memyselfi/LocalTwinView'
import { getTwin } from '@/lib/memyselfi/twins'
import { getTwinByHandle } from '@/lib/memyselfi/store'

type Params = { params: { handle: string } }

async function resolve(handle: string) {
  return getTwin(handle) ?? (await getTwinByHandle(handle))
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const twin = await resolve(params.handle)
  if (!twin) {
    return { title: `@${params.handle}`, robots: { index: false } }
  }
  return {
    title: `${twin.name} — talk to my twin`,
    description: twin.tagline || `Chat with ${twin.name}’s AI twin.`,
    openGraph: {
      title: `${twin.name} — talk to my twin`,
      description: twin.tagline || `Chat with ${twin.name}’s AI twin.`,
    },
  }
}

export default async function TwinPage({ params }: Params) {
  const twin = await resolve(params.handle)

  if (!twin) {
    // Not in the seed set or the backend — it may be an unpublished draft
    // living in the visitor's browser.
    return <LocalTwinView handle={params.handle.toLowerCase()} />
  }

  return <TwinProfile twin={twin} />
}
