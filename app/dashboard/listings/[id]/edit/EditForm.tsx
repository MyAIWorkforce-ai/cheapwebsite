'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import {
  updateListing,
  addListingFiles,
  deleteListingFile,
  redraftListingFromBundle,
  applyRedraft,
  createPromoCode,
  deactivatePromoCode,
  type EditState,
  type FilesState,
  type RedraftResult,
  type PromoCodeState,
} from './actions'
import MultiSelectPopup from '@/components/MultiSelectPopup'
import { NICHE_OPTIONS, PLATFORM_OPTIONS } from '@/lib/options'

const initial: EditState = {}
const filesInitial: FilesState = {}
const redraftInitial: EditState = {}

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
  // Two-tap inline confirm instead of native confirm() — mobile
  // Safari blocks confirm() in some contexts, leaving the Delete
  // button looking broken when nothing happens on first tap.
  const [confirming, setConfirming] = useState(false)
  useEffect(() => {
    if (!confirming) return
    const t = setTimeout(() => setConfirming(false), 4000)
    return () => clearTimeout(t)
  }, [confirming])

  if (confirming) {
    return (
      <button
        type="submit"
        disabled={pending}
        className="text-xs uppercase tracking-wider text-red-700 hover:text-red-900 transition-colors disabled:opacity-60 font-semibold"
      >
        {pending ? 'Removing…' : 'Tap to confirm'}
      </button>
    )
  }
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        setConfirming(true)
      }}
      className="text-xs uppercase tracking-wider text-brand-muted hover:text-red-700 transition-colors disabled:opacity-60"
    >
      Delete
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
  // Listing type — creator can reclassify from the edit form if they
  // originally picked wrong (e.g. published as Full Agent Setup but
  // it's actually a Skill).
  type: 'skill' | 'guide' | 'agent_setup' | 'prompt_pack' | 'loop' | 'mcp_server'
  price: number
  niche: string
  platforms: string
  status: 'live' | 'pending_review' | 'removed'
  featuredTier: string | null
  files: { id: string; name: string; size_bytes: number | null }[]
  promoCodes: {
    id: string
    code: string
    maxRedemptions: number | null
    redemptionCount: number
  }[]
}

export default function EditForm({
  defaults,
  featuredFlash,
}: {
  defaults: EditDefaults
  featuredFlash?: 'success' | 'cancelled' | null
}) {
  const [state, action] = useFormState(updateListing, initial)
  const [filesState, filesAction] = useFormState(
    addListingFiles,
    filesInitial,
  )
  const [redraftApplyState, redraftApplyAction] = useFormState(
    applyRedraft,
    redraftInitial,
  )
  const [niche, setNiche] = useState(defaults.niche)
  const [platforms, setPlatforms] = useState(defaults.platforms)
  const fileInput = useRef<HTMLInputElement>(null)
  const [redraftPending, startRedraftTransition] = useTransition()
  const [redraft, setRedraft] = useState<RedraftResult | null>(null)
  const [accepted, setAccepted] = useState<Record<string, boolean>>({})
  // Per-field edits to the AI's raw suggestion — buyer of this row sees
  // the AI's draft pre-filled in a textarea, can tweak before applying.
  // Submitting uses the edited string (or the AI's original if untouched).
  const [edits, setEdits] = useState<Record<string, string>>({})

  function runRedraft() {
    startRedraftTransition(async () => {
      const result = await redraftListingFromBundle(defaults.id, defaults.slug)
      setRedraft(result)
      if (result.draft) {
        // Default everything off (untrusted-by-default) so a sloppy AI
        // suggestion can't overwrite good copy by accident.
        setAccepted({
          title: false,
          tagline: false,
          niche: false,
          platform_list: false,
          description: false,
          whatYouGet: false,
        })
        // Seed the editable fields with the AI's raw draft.
        setEdits({
          title: result.draft.title,
          tagline: result.draft.tagline,
          niche: result.draft.niche,
          platforms: result.draft.platforms.join(', '),
          description: result.draft.description.join('\n\n'),
          whatYouGet: result.draft.whatYouGet
            .map((x) => `- ${x}`)
            .join('\n'),
        })
      }
    })
  }

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

        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Listing type
          </span>
          <select
            name="type"
            defaultValue={defaults.type}
            className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg"
          >
            <option value="guide">Guide</option>
            <option value="prompt_pack">Prompt Pack</option>
            <option value="skill">Skill</option>
            <option value="mcp_server">MCP Server</option>
            <option value="loop">Loop</option>
            <option value="agent_setup">Full Agent Setup</option>
          </select>
          <span className="mt-1 block text-xs text-brand-muted">
            Wrong type at publish? Change it here — the marketplace filter
            updates on save.
          </span>
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

        {defaults.files.length > 0 && (
          <div className="mt-10 pt-8 border-t border-brand-hairline">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Re-draft from the bundle
            </span>
            <h3
              className="font-display mt-3 text-2xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Let the AI re-read what&rsquo;s in the files.
            </h3>
            <p className="mt-2 text-sm text-brand-muted">
              When the bundle changes, your listing copy can drift. Click to
              re-read everything attached above (zips included) and get a
              fresh title, tagline, niche, platforms, description, and
              what&rsquo;s-inside list — you tick which to accept.
            </p>

            <button
              type="button"
              onClick={runRedraft}
              disabled={redraftPending}
              className="mt-5 inline-flex items-center gap-2 bg-brand-ink text-white font-semibold px-5 py-2.5 text-sm hover:bg-brand-gold hover:text-brand-ink transition-colors disabled:opacity-60"
            >
              {redraftPending
                ? 'Reading bundle…'
                : redraft?.draft
                  ? 'Re-read again'
                  : 'Re-read bundle, suggest updated copy'}
            </button>

            {redraft?.error && (
              <p className="mt-4 text-sm text-red-700">{redraft.error}</p>
            )}

            {redraft?.draft && (
              <form
                action={redraftApplyAction}
                className="mt-6 border border-brand-hairline divide-y divide-brand-hairline"
              >
                <input
                  type="hidden"
                  name="listingId"
                  value={defaults.id}
                />
                <input
                  type="hidden"
                  name="listingSlug"
                  value={defaults.slug}
                />
                <input type="hidden" name="title" value={edits.title ?? ''} />
                <input
                  type="hidden"
                  name="tagline"
                  value={edits.tagline ?? ''}
                />
                <input type="hidden" name="niche" value={edits.niche ?? ''} />
                <input
                  type="hidden"
                  name="platforms"
                  value={edits.platforms ?? ''}
                />
                <input
                  type="hidden"
                  name="description"
                  value={JSON.stringify(
                    (edits.description ?? '')
                      .split(/\n\n+/)
                      .map((s) => s.trim())
                      .filter(Boolean),
                  )}
                />
                <input
                  type="hidden"
                  name="whatYouGet"
                  value={JSON.stringify(
                    (edits.whatYouGet ?? '')
                      .split(/\n/)
                      .map((s) => s.replace(/^[-*•]\s*/, '').trim())
                      .filter(Boolean),
                  )}
                />

                <p className="px-5 pt-4 text-sm text-brand-muted">
                  Tick the rows you want to apply. Edit the suggestion text
                  before applying if it needs tweaking — what&rsquo;s in the{' '}
                  <span className="font-semibold">Suggested</span> box is
                  what gets saved.
                </p>

                <RedraftRow
                  fieldKey="title"
                  label="Title"
                  current={defaults.title}
                  edited={edits.title ?? ''}
                  onEdit={(v) => setEdits((p) => ({ ...p, title: v }))}
                  accepted={accepted.title}
                  onToggle={(v) =>
                    setAccepted((p) => ({ ...p, title: v }))
                  }
                />
                <RedraftRow
                  fieldKey="tagline"
                  label="Tagline"
                  current={defaults.tagline}
                  edited={edits.tagline ?? ''}
                  onEdit={(v) => setEdits((p) => ({ ...p, tagline: v }))}
                  accepted={accepted.tagline}
                  onToggle={(v) =>
                    setAccepted((p) => ({ ...p, tagline: v }))
                  }
                />
                <RedraftRow
                  fieldKey="niche"
                  label="Niche"
                  current={defaults.niche}
                  edited={edits.niche ?? ''}
                  onEdit={(v) => setEdits((p) => ({ ...p, niche: v }))}
                  accepted={accepted.niche}
                  onToggle={(v) =>
                    setAccepted((p) => ({ ...p, niche: v }))
                  }
                />
                <RedraftRow
                  fieldKey="platform_list"
                  label="Platforms"
                  current={defaults.platforms}
                  edited={edits.platforms ?? ''}
                  onEdit={(v) =>
                    setEdits((p) => ({ ...p, platforms: v }))
                  }
                  accepted={accepted.platform_list}
                  onToggle={(v) =>
                    setAccepted((p) => ({ ...p, platform_list: v }))
                  }
                />
                <RedraftRow
                  fieldKey="description"
                  label="Description"
                  current="(replaces existing description on save)"
                  edited={edits.description ?? ''}
                  onEdit={(v) =>
                    setEdits((p) => ({ ...p, description: v }))
                  }
                  accepted={accepted.description}
                  onToggle={(v) =>
                    setAccepted((p) => ({ ...p, description: v }))
                  }
                  multiline
                />
                <RedraftRow
                  fieldKey="whatYouGet"
                  label="What's inside"
                  current="(replaces existing list on save)"
                  edited={edits.whatYouGet ?? ''}
                  onEdit={(v) =>
                    setEdits((p) => ({ ...p, whatYouGet: v }))
                  }
                  accepted={accepted.whatYouGet}
                  onToggle={(v) =>
                    setAccepted((p) => ({ ...p, whatYouGet: v }))
                  }
                  multiline
                />

                <div className="p-5 flex items-center gap-4">
                  <ApplyRedraftButton />
                  <button
                    type="button"
                    onClick={() => setRedraft(null)}
                    className="text-sm text-brand-muted hover:text-brand-ink transition-colors"
                  >
                    Discard suggestion
                  </button>
                </div>

                {redraftApplyState.error && (
                  <p className="px-5 pb-4 text-sm text-red-700">
                    {redraftApplyState.error}
                  </p>
                )}
                {redraftApplyState.info && (
                  <p className="px-5 pb-4 text-sm text-brand-gold-dark">
                    {redraftApplyState.info}
                  </p>
                )}
              </form>
            )}
          </div>
        )}
      </section>

      <FeatureListingSection
        listingSlug={defaults.slug}
        featuredTier={defaults.featuredTier}
        featuredFlash={featuredFlash}
      />

      <PromoCodesSection
        listingId={defaults.id}
        listingSlug={defaults.slug}
        codes={defaults.promoCodes}
      />
    </div>
  )
}

function PromoCodesSection({
  listingId,
  listingSlug,
  codes,
}: {
  listingId: string
  listingSlug: string
  codes: EditDefaults['promoCodes']
}) {
  const promoInitial: PromoCodeState = {}
  const [state, action] = useFormState(createPromoCode, promoInitial)

  return (
    <section className="pt-10 border-t border-brand-hairline">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
        Promo codes
      </span>
      <h2
        className="font-display mt-3 text-3xl tracking-tight"
        style={{ letterSpacing: '-0.025em' }}
      >
        Give a free copy.
      </h2>
      <p className="mt-2 text-sm text-brand-muted max-w-prose">
        Hand out a free copy to a specific person — a founding electrician,
        a conference contact, your brother testing the listing. Each code
        gives 100% off. Set a redemption cap if you only want N people to
        use it, or leave it unlimited.
      </p>

      {codes.length === 0 ? (
        <p className="mt-6 text-sm text-brand-muted italic">
          No codes yet. Create one below.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-brand-hairline border-y border-brand-hairline">
          {codes.map((c) => (
            <li
              key={c.id}
              className="py-3 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-mono text-base text-brand-ink tracking-wider">
                  {c.code}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mt-0.5">
                  {c.redemptionCount} of {c.maxRedemptions ?? '∞'} used · 100%
                  off
                </p>
              </div>
              <form action={deactivatePromoCode} className="shrink-0">
                <input type="hidden" name="codeId" value={c.id} />
                <input
                  type="hidden"
                  name="listingSlug"
                  value={listingSlug}
                />
                <DeactivatePromoButton />
              </form>
            </li>
          ))}
        </ul>
      )}

      <form action={action} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:items-end">
        <input type="hidden" name="listingId" value={listingId} />
        <input type="hidden" name="listingSlug" value={listingSlug} />
        <label className="block sm:col-span-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Code
          </span>
          <input
            type="text"
            name="code"
            required
            placeholder="e.g. PROMO"
            maxLength={40}
            className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 font-mono text-lg uppercase tracking-wider"
            style={{ textTransform: 'uppercase' }}
            autoComplete="off"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Max uses (blank = ∞)
          </span>
          <input
            type="number"
            name="maxRedemptions"
            min="1"
            step="1"
            placeholder="e.g. 1"
            className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg"
          />
        </label>

        <div className="sm:col-span-3 flex items-center gap-4 pt-2">
          <CreatePromoButton />
          {state.error && (
            <p className="text-sm text-red-700">{state.error}</p>
          )}
          {state.info && (
            <p className="text-sm text-brand-gold-dark">{state.info}</p>
          )}
        </div>

        <p className="sm:col-span-3 text-xs text-brand-muted">
          Buyers redeem the code at checkout — link is{' '}
          <span className="font-mono">/marketplace/{listingSlug}</span>{' '}
          → click &ldquo;Have a code?&rdquo;.
        </p>
      </form>
    </section>
  )
}

function CreatePromoButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-brand-ink text-white font-semibold px-5 py-2.5 text-sm hover:bg-brand-gold hover:text-brand-ink transition-colors disabled:opacity-60"
    >
      {pending ? 'Creating…' : 'Create code'}
    </button>
  )
}

function DeactivatePromoButton() {
  const { pending } = useFormStatus()
  // Same two-tap inline confirm as DeleteFileButton (mobile-Safari-safe).
  const [confirming, setConfirming] = useState(false)
  useEffect(() => {
    if (!confirming) return
    const t = setTimeout(() => setConfirming(false), 4000)
    return () => clearTimeout(t)
  }, [confirming])

  if (confirming) {
    return (
      <button
        type="submit"
        disabled={pending}
        className="text-xs uppercase tracking-wider text-red-700 hover:text-red-900 transition-colors disabled:opacity-60 font-semibold"
      >
        {pending ? 'Removing…' : 'Tap to confirm'}
      </button>
    )
  }
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        setConfirming(true)
      }}
      className="text-xs uppercase tracking-wider text-brand-muted hover:text-red-700 transition-colors disabled:opacity-60"
    >
      {pending ? 'Removing…' : 'Deactivate'}
    </button>
  )
}

function FeatureListingSection({
  listingSlug,
  featuredTier,
  featuredFlash,
}: {
  listingSlug: string
  featuredTier: string | null
  featuredFlash?: 'success' | 'cancelled' | null
}) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isFeatured = featuredTier === 'showcase'

  async function startCheckout() {
    setPending(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/listings/${encodeURIComponent(listingSlug)}/feature-checkout`,
        { method: 'POST' },
      )
      const j = await res.json().catch(() => ({}))
      if (!res.ok || !j.url) {
        setError(j.error ?? 'Could not start checkout.')
        setPending(false)
        return
      }
      window.location.href = j.url as string
    } catch (err) {
      setError((err as Error).message)
      setPending(false)
    }
  }

  return (
    <section className="pt-10 border-t border-brand-hairline">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
        Feature this listing
      </span>
      <h2
        className="font-display mt-3 text-3xl tracking-tight"
        style={{ letterSpacing: '-0.025em' }}
      >
        Top of the marketplace. <em className="italic text-brand-gold font-medium">Navy card.</em>
      </h2>
      <p className="mt-3 text-sm text-brand-muted max-w-prose">
        Showcase tier — your listing gets the premium navy card on the
        marketplace and sorts above every standard listing. One-time $49,
        permanent for v1 (no monthly fee). Early-bird launch price.
      </p>

      {featuredFlash === 'success' && (
        <div className="mt-5 flex items-start gap-3 border border-brand-gold bg-brand-gold/10 px-4 py-4">
          <span aria-hidden className="text-brand-gold-dark text-2xl leading-none">
            ✿
          </span>
          <div className="text-sm">
            <p className="font-semibold text-brand-ink">
              Showcase unlocked — your listing is now featured.
            </p>
            <p className="mt-1 text-brand-muted">
              The navy card and top placement go live within a minute as
              caches refresh.
            </p>
          </div>
        </div>
      )}
      {featuredFlash === 'cancelled' && (
        <div className="mt-5 flex items-start gap-3 border border-brand-hairline bg-brand-cream-card px-4 py-4">
          <span aria-hidden className="text-brand-muted text-xl leading-none">·</span>
          <p className="text-sm text-brand-muted">
            Checkout cancelled — no charge was made.
          </p>
        </div>
      )}

      {isFeatured ? (
        <div className="mt-6 flex items-start gap-3 border border-brand-ink bg-brand-navy text-brand-cream px-5 py-4">
          <span aria-hidden className="text-brand-gold text-2xl leading-none">
            ✿
          </span>
          <div className="text-sm">
            <p className="font-semibold">Featured — Showcase tier active.</p>
            <p className="mt-1 text-brand-cream/75">
              Your listing has the navy card and sorts above standard
              listings. Nothing more to do.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <button
            type="button"
            onClick={startCheckout}
            disabled={pending}
            className="inline-flex items-center gap-2 bg-brand-navy text-brand-cream border border-brand-gold font-semibold px-7 py-3.5 text-[15px] hover:bg-brand-gold hover:text-brand-ink transition-colors disabled:opacity-60"
          >
            {pending ? 'Opening checkout…' : 'Make this Showcase — $49'}
          </button>
          {error && (
            <p className="mt-3 text-sm text-red-700">{error}</p>
          )}
          <p className="mt-3 text-xs text-brand-muted">
            One-time payment via Stripe. Goes to Skillzy (not split with
            you, since this is a platform service). Receipt by email.
          </p>
        </div>
      )}
    </section>
  )
}

function ApplyRedraftButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-brand-gold text-brand-ink font-semibold px-5 py-2.5 text-sm hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'Applying…' : 'Apply ticked changes'}
    </button>
  )
}

function RedraftRow({
  fieldKey,
  label,
  current,
  edited,
  onEdit,
  accepted,
  onToggle,
  multiline = false,
}: {
  fieldKey: string
  label: string
  current: string
  edited: string
  onEdit: (v: string) => void
  accepted: boolean | undefined
  onToggle: (v: boolean) => void
  multiline?: boolean
}) {
  const isOn = accepted === true
  return (
    <div className="p-5">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name={`accept_${fieldKey}`}
          checked={isOn}
          onChange={(e) => onToggle(e.target.checked)}
          className="accent-brand-gold w-4 h-4 shrink-0"
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ink font-semibold">
          {label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
          {isOn
            ? '✓ will replace current on save'
            : 'untick = keep your current copy'}
        </span>
      </label>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-hairline border border-brand-hairline">
        <div className="bg-white p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted mb-1.5">
            Current (kept as-is unless you tick)
          </p>
          <p className="text-sm text-brand-ink whitespace-pre-wrap break-words">
            {current || <span className="italic text-brand-muted">empty</span>}
          </p>
        </div>
        <div className="bg-brand-cream-card p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-gold mb-1.5">
            Suggested — edit before applying
          </p>
          {multiline ? (
            <textarea
              value={edited}
              onChange={(e) => onEdit(e.target.value)}
              rows={Math.max(4, edited.split('\n').length + 1)}
              className="w-full text-sm text-brand-ink bg-transparent border border-brand-hairline focus:border-brand-gold outline-none p-2 font-mono whitespace-pre-wrap"
            />
          ) : (
            <input
              type="text"
              value={edited}
              onChange={(e) => onEdit(e.target.value)}
              className="w-full text-sm text-brand-ink bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-1.5"
            />
          )}
        </div>
      </div>
    </div>
  )
}
