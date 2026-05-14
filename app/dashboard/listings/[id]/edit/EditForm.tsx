'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { updateListing, type EditState } from './actions'

const initial: EditState = {}

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-brand-gold text-brand-ink font-semibold px-7 py-3.5 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'Saving…' : 'Save changes'}
    </button>
  )
}

export type EditDefaults = {
  id: string
  title: string
  tagline: string
  price: number
  niche: string
  platforms: string
  status: 'live' | 'pending_review' | 'removed'
}

export default function EditForm({ defaults }: { defaults: EditDefaults }) {
  const [state, action] = useFormState(updateListing, initial)
  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="id" value={defaults.id} />

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
          Title
        </span>
        <input
          type="text"
          name="title"
          required
          defaultValue={defaults.title}
          className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 font-display text-2xl"
          style={{ letterSpacing: '-0.018em' }}
        />
      </label>

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
          Tagline
        </span>
        <textarea
          name="tagline"
          rows={2}
          defaultValue={defaults.tagline}
          className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg"
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Price (USD)
          </span>
          <input
            type="number"
            name="price"
            required
            min="1"
            step="1"
            defaultValue={defaults.price}
            className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 font-display text-2xl"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Niche
          </span>
          <input
            type="text"
            name="niche"
            defaultValue={defaults.niche}
            placeholder="Real Estate, Builders, …"
            className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
          />
        </label>
      </div>

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
          Platforms (comma-separated)
        </span>
        <input
          type="text"
          name="platforms"
          defaultValue={defaults.platforms}
          placeholder="Claude, OpenClaw, n8n"
          className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
        />
      </label>

      <fieldset>
        <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mb-3">
          Status
        </legend>
        <div className="flex flex-wrap gap-2">
          {(['live', 'pending_review', 'removed'] as const).map((s) => (
            <label
              key={s}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-brand-hairline cursor-pointer hover:border-brand-ink transition-colors text-sm"
            >
              <input
                type="radio"
                name="status"
                value={s}
                defaultChecked={s === defaults.status}
                className="accent-brand-ink"
              />
              {s === 'live' ? 'Live' : s === 'pending_review' ? 'Pending review' : 'Removed'}
            </label>
          ))}
        </div>
      </fieldset>

      {state.error && <p className="text-sm text-red-700">{state.error}</p>}
      {state.info && <p className="text-sm text-brand-gold-dark">{state.info}</p>}

      <div className="flex items-center gap-4 pt-4 border-t border-brand-hairline">
        <Submit />
      </div>
    </form>
  )
}
