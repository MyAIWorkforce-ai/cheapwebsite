'use client'

import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { saveTwin, type SaveState } from '@/app/memyselfi/actions'
import { sanitizeHandle } from '@/lib/memyselfi/shape'

type Draft = {
  name?: string
  handle?: string
  role?: string
  location?: string
  tagline?: string
  bio?: string
  accent?: string
  voice?: string
  facts?: { topic: string; answer: string }[]
}

function Btn() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
      style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
    >
      {pending ? 'Publishing…' : 'Publish my saved draft'}
    </button>
  )
}

export default function PublishDraft() {
  const [draft, setDraft] = useState<Draft | null>(null)
  const [state, formAction] = useFormState<SaveState, FormData>(saveTwin, {})

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mmi:draft')
      if (!raw) return
      const d = JSON.parse(raw) as Draft
      const facts = (d.facts ?? []).filter((f) => f.topic?.trim() && f.answer?.trim())
      if (d.name?.trim() && facts.length >= 2) setDraft(d)
    } catch {
      /* ignore */
    }
  }, [])

  if (!draft) return null

  const handle = sanitizeHandle(draft.handle || draft.name || '')
  const facts = (draft.facts ?? []).filter(
    (f) => f.topic?.trim() && f.answer?.trim(),
  )

  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        borderColor: 'var(--mmi-line)',
        backgroundColor: 'var(--mmi-panel)',
      }}
    >
      <h2 className="text-lg font-semibold" style={{ color: 'var(--mmi-text)' }}>
        You have a saved draft
      </h2>
      <p className="mt-1.5 text-[14px]" style={{ color: 'var(--mmi-muted)' }}>
        “{draft.name}” → memyselfi.ai/{handle}. Publish it to go live.
      </p>
      <form action={formAction} className="mt-4">
        <input type="hidden" name="name" value={draft.name ?? ''} />
        <input type="hidden" name="handle" value={handle} />
        <input type="hidden" name="role" value={draft.role ?? ''} />
        <input type="hidden" name="location" value={draft.location ?? ''} />
        <input type="hidden" name="tagline" value={draft.tagline ?? ''} />
        <input type="hidden" name="bio" value={draft.bio ?? ''} />
        <input type="hidden" name="accent" value={draft.accent ?? '#8C7BFF'} />
        <input type="hidden" name="voice" value={draft.voice ?? ''} />
        <input type="hidden" name="facts" value={JSON.stringify(facts)} />
        {state.error && (
          <p className="mb-3 text-[13px]" style={{ color: '#ffb4b4' }}>
            {state.error}
          </p>
        )}
        <Btn />
      </form>
    </div>
  )
}
