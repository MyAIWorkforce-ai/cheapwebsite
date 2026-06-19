'use client'

import { useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import {
  updateListing,
  addListingFiles,
  deleteListingFile,
  type EditState,
  type FilesState,
} from './actions'
import MultiSelectPopup from '@/components/MultiSelectPopup'
import { NICHE_OPTIONS, PLATFORM_OPTIONS } from '@/lib/options'

const initial: EditState = {}
const filesInitial: FilesState = {}

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

function AddFilesButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-brand-ink text-white font-semibold px-5 py-2.5 text-sm hover:bg-brand-gold hover:text-brand-ink transition-colors disabled:opacity-60"
    >
      {pending ? 'Uploading…' : 'Add files'}
    </button>
  )
}

function DeleteFileButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (
          !confirm(
            'Delete this file from the bundle? Past buyers can still re-download what they paid for.',
          )
        ) {
          e.preventDefault()
        }
      }}
      className="text-xs uppercase tracking-wider text-brand-muted hover:text-red-700 transition-colors disabled:opacity-60"
    >
      {pending ? 'Removing…' : 'Delete'}
    </button>
  )
}

function formatBytes(n: number | null): string {
  if (n == null) return '—'
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

export type EditDefaults = {
  id: string
  slug: string
  title: string
  tagline: string
  price: number
  niche: string
  platforms: string
  status: 'live' | 'pending_review' | 'removed'
  files: { id: string; name: string; size_bytes: number | null }[]
}

export default function EditForm({ defaults }: { defaults: EditDefaults }) {
  const [state, action] = useFormState(updateListing, initial)
  const [filesState, filesAction] = useFormState(
    addListingFiles,
    filesInitial,
  )
  const [niche, setNiche] = useState(defaults.niche)
  const [platforms, setPlatforms] = useState(defaults.platforms)
  const fileInput = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-12">
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
              min="9"
              step="1"
              defaultValue={defaults.price}
              className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 font-display text-2xl"
            />
          </label>
          <div className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Niche
            </span>
            <input type="hidden" name="niche" value={niche} />
            <MultiSelectPopup
              label="Pick the niches this listing fits"
              options={NICHE_OPTIONS}
              value={niche}
              onChange={setNiche}
              placeholder="Tap to choose niches"
            />
          </div>
        </div>

        <div className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Works with
          </span>
          <input type="hidden" name="platforms" value={platforms} />
          <MultiSelectPopup
            label="Pick the platforms this works with"
            options={PLATFORM_OPTIONS}
            value={platforms}
            onChange={setPlatforms}
            placeholder="Tap to choose platforms"
            selectAllLabel="All agents"
          />
        </div>

        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mb-3">
            Status
          </legend>
          <div className="flex flex-wrap gap-2">
            {(['live', 'removed'] as const).map((s) => {
              const label =
                s === 'live'
                  ? 'Live'
                  : defaults.status === 'removed'
                    ? 'Removed'
                    : 'Remove'
              return (
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
                  {label}
                </label>
              )
            })}
          </div>
        </fieldset>

        {state.error && <p className="text-sm text-red-700">{state.error}</p>}
        {state.info && (
          <p className="text-sm text-brand-gold-dark">{state.info}</p>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-brand-hairline">
          <Submit />
        </div>
      </form>

      <section className="pt-10 border-t border-brand-hairline">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Attached files
        </span>
        <h2
          className="font-display mt-3 text-3xl tracking-tight"
          style={{ letterSpacing: '-0.025em' }}
        >
          What buyers download.
        </h2>
        <p className="mt-2 text-sm text-brand-muted">
          Update the bundle any time. Edits go live the moment you save — past
          buyers always keep what they originally paid for.
        </p>

        {defaults.files.length === 0 ? (
          <p className="mt-6 text-sm text-brand-muted italic">
            No files attached yet. Add the bundle below.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-brand-hairline border-y border-brand-hairline">
            {defaults.files.map((f) => (
              <li
                key={f.id}
                className="py-3 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-sm text-brand-ink truncate">{f.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mt-0.5">
                    {formatBytes(f.size_bytes)}
                  </p>
                </div>
                <form action={deleteListingFile} className="shrink-0">
                  <input type="hidden" name="fileId" value={f.id} />
                  <input
                    type="hidden"
                    name="listingSlug"
                    value={defaults.slug}
                  />
                  <DeleteFileButton />
                </form>
              </li>
            ))}
          </ul>
        )}

        <form action={filesAction} className="mt-8 space-y-4">
          <input type="hidden" name="listingId" value={defaults.id} />
          <input type="hidden" name="listingSlug" value={defaults.slug} />
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Add more files
            </span>
            <input
              ref={fileInput}
              type="file"
              name="bundle"
              multiple
              className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border file:border-brand-ink file:bg-transparent file:text-brand-ink file:text-sm file:font-semibold hover:file:bg-brand-gold/20 file:cursor-pointer cursor-pointer"
            />
            <p className="mt-2 text-xs text-brand-muted">
              50 MB per file. Same name as an existing file overwrites it.
            </p>
          </label>
          {filesState.error && (
            <p className="text-sm text-red-700">{filesState.error}</p>
          )}
          {filesState.info && (
            <p className="text-sm text-brand-gold-dark">{filesState.info}</p>
          )}
          <AddFilesButton />
        </form>
      </section>
    </div>
  )
}
