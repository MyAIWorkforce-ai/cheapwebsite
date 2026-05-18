'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import GitHubImport from '@/components/GitHubImport'
import { publishListing, type PublishState } from './actions'

// Minimal local types for the Web Speech API (not in lib.dom by default).
type SpeechRecResultLike = {
  isFinal: boolean
  0: { transcript: string }
}
type SpeechRecEventLike = {
  resultIndex: number
  results: ArrayLike<SpeechRecResultLike>
}
type SpeechRecLike = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((e: SpeechRecEventLike) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}
type SpeechRecCtor = new () => SpeechRecLike

const types = [
  {
    key: 'skill',
    title: 'Skill',
    price: '$9 — $29 typical',
    desc: 'One SKILL.md. One job, done sharp.',
  },
  {
    key: 'guide',
    title: 'Guide',
    price: '$9 — $24 typical',
    desc: 'A how-to people will actually read.',
  },
  {
    key: 'agent_setup',
    title: 'Agent Setup',
    price: '$49 — $499+ typical',
    desc: 'The whole agent. The moneymaker.',
    recommended: true,
  },
]

const initial: PublishState = {}

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'Publishing…' : 'Publish listing'}
      <span aria-hidden>→</span>
    </button>
  )
}

function StepShell({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="px-6 lg:px-10 py-14 sm:py-20 border-t border-brand-hairline">
      <div className="max-w-page mx-auto">
        <div className="flex items-baseline gap-6 mb-8 sm:mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            №{number}
          </span>
          <h2
            className="font-display text-3xl sm:text-5xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}

type DraftResponse = {
  title?: string
  tagline?: string
  niche?: string
  platforms?: string[]
  description?: string[]
  whatYouGet?: string[]
}

export default function NewListingForm({
  githubUser,
}: {
  githubUser?: string
}) {
  const [state, action] = useFormState(publishListing, initial)
  // Stored as a string so leading-zero / iOS controlled-number quirks
  // can't interfere with editing. Parsed to a number for the math
  // below and posted back via the form's "price" field.
  const [priceText, setPriceText] = useState('249')
  const price = Math.max(0, Number(priceText) || 0)

  const platformFeeCents = Math.round(price * 100 * 0.2)
  const youKeepCents = price * 100 - platformFeeCents

  // Listing fields (controlled so the AI draft can fill them).
  const [type, setType] = useState<'skill' | 'guide' | 'agent_setup'>('agent_setup')
  const [title, setTitle] = useState('')
  const [tagline, setTagline] = useState('')
  const [niche, setNiche] = useState('')
  const [platforms, setPlatforms] = useState('')

  // AI panel state.
  const [brief, setBrief] = useState('')
  const [drafting, setDrafting] = useState(false)
  const [draftError, setDraftError] = useState<string | null>(null)
  const [draftExtras, setDraftExtras] = useState<{
    description: string[]
    whatYouGet: string[]
  } | null>(null)

  // Files attached to the listing. State mirrors what's in the native
  // file input — replaced on each pick so submission via FormData stays
  // straightforward. The server action reads formData.getAll('bundle').
  const [files, setFiles] = useState<File[]>([])
  const [extracting, setExtracting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const TEXT_EXT = /\.(md|markdown|yaml|yml|json|txt|prompt)$/i

  // ~4MB once base64-encoded, under Vercel's 4.5MB request-body cap.
  const PDF_AUTOREAD_MAX = 3_000_000

  function readAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const r = new FileReader()
      r.onload = () => {
        const res = String(r.result ?? '')
        const i = res.indexOf(',')
        resolve(i >= 0 ? res.slice(i + 1) : res)
      }
      r.onerror = () => reject(new Error('Could not read that file.'))
      r.readAsDataURL(file)
    })
  }

  async function onFilesPicked(picked: FileList | null) {
    if (!picked || picked.length === 0) return
    const arr = Array.from(picked)
    setFiles(arr)
    setDraftError(null)

    setExtracting(true)
    try {
      // 1. Plain-text files → merged brief.
      const reads = arr
        .filter((f) => TEXT_EXT.test(f.name) && f.size < 200_000)
        .map(
          (f) =>
            new Promise<string>((resolve) => {
              const r = new FileReader()
              r.onload = () => resolve(`--- ${f.name} ---\n${String(r.result ?? '')}`)
              r.onerror = () => resolve('')
              r.readAsText(f)
            }),
        )
      const texts = reads.length > 0 ? await Promise.all(reads) : []
      const merged = texts.filter(Boolean).join('\n\n')
      if (merged) setBrief(merged)

      // 2. First PDF → Claude reads it natively (no client-side parser).
      const pdfFile = arr.find((f) => /\.pdf$/i.test(f.name))
      let pdfPayload: { data: string; name: string } | undefined
      if (pdfFile) {
        if (pdfFile.size > PDF_AUTOREAD_MAX) {
          setDraftError(
            `${pdfFile.name} uploads fine, but it’s too large to auto-read. Paste its key text below and tap “Draft with AI”.`,
          )
        } else {
          pdfPayload = {
            data: await readAsBase64(pdfFile),
            name: pdfFile.name,
          }
        }
      }

      // Drop it in → AI reads, names, and explains it automatically.
      // The creator just edits or submits.
      if (merged || pdfPayload) {
        void draft(merged, pdfPayload)
      }
    } catch (err) {
      setDraftError((err as Error).message)
    } finally {
      setExtracting(false)
    }
  }

  function clearFiles() {
    setFiles([])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Voice dictation via the Web Speech API (browser-native, no deps).
  // Falls back silently if unsupported.
  const [listening, setListening] = useState(false)
  const recRef = useRef<SpeechRecLike | null>(null)
  useEffect(() => () => recRef.current?.stop(), [])

  const speechSupported =
    typeof window !== 'undefined' &&
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)

  function toggleVoice() {
    if (!speechSupported) return
    if (listening) {
      recRef.current?.stop()
      setListening(false)
      return
    }
    const w = window as unknown as {
      SpeechRecognition?: SpeechRecCtor
      webkitSpeechRecognition?: SpeechRecCtor
    }
    const Rec = w.SpeechRecognition ?? w.webkitSpeechRecognition
    if (!Rec) return
    const rec = new Rec()
    rec.lang = 'en-US'
    rec.continuous = true
    rec.interimResults = true
    rec.onresult = (e) => {
      let final = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i]
        if (r.isFinal) final += r[0].transcript
      }
      if (final) setBrief((b) => (b ? b + ' ' : '') + final.trim())
    }
    rec.onend = () => setListening(false)
    rec.start()
    recRef.current = rec
    setListening(true)
  }

  async function draft(
    briefOverride?: string,
    pdf?: { data: string; name: string },
  ) {
    const text = (briefOverride ?? brief).trim()
    if (!text && !pdf) {
      setDraftError('Tell the AI what you built, or drop a file.')
      return
    }
    setDrafting(true)
    setDraftError(null)
    try {
      const res = await fetch('/api/listings/draft', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          brief: text,
          type,
          pdfBase64: pdf?.data,
          pdfName: pdf?.name,
        }),
      })
      const json: DraftResponse & { error?: string } = await res.json()
      if (!res.ok) {
        setDraftError(json.error ?? `Request failed (${res.status})`)
        return
      }
      if (json.title) setTitle(json.title)
      if (json.tagline) setTagline(json.tagline)
      if (json.niche) setNiche(json.niche)
      if (json.platforms?.length) setPlatforms(json.platforms.join(', '))
      setDraftExtras({
        description: json.description ?? [],
        whatYouGet: json.whatYouGet ?? [],
      })
    } catch (err) {
      setDraftError((err as Error).message)
    } finally {
      setDrafting(false)
    }
  }

  return (
    <>
      <GitHubImport
        defaultUsername={githubUser}
        onImport={(imported, importedBrief) => {
          setFiles(imported)
          setBrief(importedBrief)
          // Imported from GitHub → AI drafts the listing immediately.
          void draft(importedBrief)
        }}
      />
      <form action={action}>
      <input
        type="hidden"
        name="description"
        value={JSON.stringify(draftExtras?.description ?? [])}
      />
      <input
        type="hidden"
        name="what_you_get"
        value={JSON.stringify(draftExtras?.whatYouGet ?? [])}
      />
      {/* STEP 1 — type */}
      <StepShell number="01" title="Pick a type">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
          {types.map((t) => (
            <label
              key={t.key}
              className="relative bg-brand-cream-card p-6 sm:p-7 cursor-pointer hover:bg-white transition-colors"
            >
              {t.recommended && (
                <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.18em] bg-brand-navy text-brand-cream px-2 py-0.5">
                  Best margins
                </span>
              )}
              <input
                type="radio"
                name="type"
                value={t.key}
                checked={type === t.key}
                onChange={() => setType(t.key as typeof type)}
                className="sr-only peer"
                required
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                {t.price}
              </span>
              <h3
                className="font-display text-2xl sm:text-3xl mt-3 tracking-tight peer-checked:text-brand-gold"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t.title}
              </h3>
              <p className="mt-2 text-sm text-brand-muted">{t.desc}</p>
            </label>
          ))}
        </div>
      </StepShell>

      {/* STEP 2 — files */}
      <StepShell number="02" title="Drop in your files">
        <div className="bg-brand-cream-card border border-brand-hairline p-7 sm:p-10">
          <label
            htmlFor="bundle-files"
            className="block border-2 border-dashed border-brand-hairline p-10 sm:p-14 text-center cursor-pointer hover:border-brand-gold transition-colors"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Drag, drop, or browse
            </span>
            <p
              className="font-display text-2xl sm:text-3xl mt-3 tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              SKILL.md, prompts, configs, templates.
            </p>
            <p className="mt-2 text-sm text-brand-muted">
              .md · .yaml · .json · .txt · .zip · .pdf — up to 50&nbsp;MB each.
              Text files and PDFs are read by the AI to draft your listing.
            </p>
            <input
              ref={fileInputRef}
              id="bundle-files"
              name="bundle"
              type="file"
              multiple
              onChange={(e) => onFilesPicked(e.target.files)}
              accept=".md,.markdown,.yaml,.yml,.json,.txt,.prompt,.zip,.pdf"
              className="sr-only"
            />
            {(extracting || drafting) && (
              <p className="mt-4 text-xs text-brand-gold">
                ✿ Reading your skill, naming it, writing the listing…
              </p>
            )}
          </label>
          <p className="mt-4 text-sm text-brand-muted">
            Drop your files and the AI reads them, names the skill, and
            drafts the whole listing. You just check it and submit.
          </p>

          {files.length > 0 && (
            <>
              <ul className="mt-6 divide-y divide-brand-hairline border-y border-brand-hairline">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-mono text-sm truncate">{f.name}</p>
                      <p className="text-xs text-brand-muted">
                        {(f.size / 1024).toFixed(1)} KB
                        {TEXT_EXT.test(f.name) && ' · extracted for AI'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={clearFiles}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-red-700 transition-colors"
                >
                  Clear all + pick again
                </button>
              </div>
            </>
          )}

          <p className="mt-5 text-xs text-brand-muted">
            You’re responsible for what you upload — only list work you
            have the rights to.
          </p>
        </div>
      </StepShell>

      {/* STEP 3 — write it (AI assist on top, real inputs below) */}
      <StepShell number="03" title="Write it">
        {/* AI panel */}
        <div className="bg-brand-navy text-brand-cream p-7 sm:p-9 mb-10">
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold-soft">
              ✿ AI draft — auto-runs when you drop a file
            </span>
            <span className="text-xs text-brand-cream/60">
              Or describe it here. Edit anything before submitting.
            </span>
          </div>

          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cream/70">
              Tell it what you built
            </span>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              rows={4}
              placeholder="e.g. Real estate skill bundle — captures leads, drafts listings, follows up. Used it on 240+ properties at my old agency."
              className="mt-2 w-full bg-transparent border border-brand-cream/15 focus:border-brand-cream/40 outline-none p-3 text-sm font-mono placeholder:text-brand-cream/40"
            />
          </label>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => draft()}
              disabled={drafting}
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-5 py-2.5 text-sm hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
            >
              {drafting ? 'Drafting…' : 'Draft with AI'}
              <span aria-hidden>→</span>
            </button>
            {speechSupported && (
              <button
                type="button"
                onClick={toggleVoice}
                className={
                  'inline-flex items-center gap-2 px-4 py-2.5 text-sm border transition-colors ' +
                  (listening
                    ? 'border-brand-gold text-brand-gold'
                    : 'border-brand-cream/30 text-brand-cream hover:bg-brand-cream/10')
                }
              >
                <span aria-hidden>{listening ? '●' : '🎙'}</span>
                {listening ? 'Listening — tap to stop' : 'Talk instead'}
              </button>
            )}
          </div>

          {draftError && (
            <p className="mt-4 text-sm text-red-300">{draftError}</p>
          )}
          {draftExtras && (draftExtras.description.length > 0 || draftExtras.whatYouGet.length > 0) && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-cream/10">
              {draftExtras.description.length > 0 && (
                <div className="bg-brand-navy p-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold-soft">
                    Description (will be saved with your listing)
                  </span>
                  <ul className="mt-3 space-y-2 text-sm text-brand-cream/90">
                    {draftExtras.description.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
              {draftExtras.whatYouGet.length > 0 && (
                <div className="bg-brand-navy p-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold-soft">
                    What buyers get
                  </span>
                  <ul className="mt-3 space-y-1.5 text-sm text-brand-cream/90 list-disc pl-5">
                    {draftExtras.whatYouGet.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Real inputs — pre-filled by the AI, editable by hand */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-7 max-w-2xl">
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Title
              </span>
              <input
                type="text"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Real Estate, end to end."
                className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 font-display text-2xl placeholder:text-brand-muted/60"
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
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="One sentence that tells a buyer what their agent gets."
                className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  Niche
                </span>
                <input
                  type="text"
                  name="niche"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="Real Estate, Builders, Bookkeeping…"
                  className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  Platforms (comma-separated)
                </span>
                <input
                  type="text"
                  name="platforms"
                  value={platforms}
                  onChange={(e) => setPlatforms(e.target.value)}
                  placeholder="Claude, OpenClaw, n8n"
                  className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
                />
              </label>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  Walkthrough video — optional
                </span>
                <input
                  type="url"
                  name="video_url"
                  inputMode="url"
                  placeholder="Loom, YouTube, or Vimeo link"
                  className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
                />
                <span className="mt-2 block text-xs text-brand-muted">
                  Paste a link — we embed it, never host it. This shows
                  on your public listing <em>before</em> anyone buys, so
                  make it a 60–90s demo of it running, not the full
                  tutorial. It’s the single biggest thing you can add to
                  turn a browser into a buyer. Setup/install walkthroughs
                  belong inside your delivered files.
                </span>
              </label>

              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  Call the video what you want
                </span>
                <input
                  type="text"
                  name="video_label"
                  maxLength={48}
                  placeholder="Watch it work"
                  className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
                />
                <span className="mt-2 block text-xs text-brand-muted">
                  Your call — e.g. “Watch it work”, “2-minute explainer”,
                  “See it in action”, “Watch me set it up live”. Leave it
                  blank and we’ll just say “Watch it work”.
                </span>
              </label>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-brand-cream-card border border-brand-hairline p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                Tips
              </span>
              <ul className="mt-4 text-sm text-brand-muted space-y-2 leading-relaxed">
                <li>· Title is a noun-led phrase ending in a period (e.g. <em>Real Estate, end to end.</em>).</li>
                <li>· Tagline starts with a verb (<em>captures leads</em>, <em>writes invoices</em>).</li>
                <li>· Pick the niche your buyer searches first.</li>
              </ul>
            </div>
          </aside>
        </div>
      </StepShell>

      {/* STEP 4 — price */}
      <StepShell number="04" title="Set your price">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 bg-brand-cream-card border border-brand-hairline p-7 sm:p-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              You set the price
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-6xl text-brand-ink" style={{ letterSpacing: '-0.03em' }}>
                $
              </span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                name="price"
                value={priceText}
                onChange={(e) => {
                  const digits = e.target.value
                    .replace(/\D/g, '')           // digits only
                    .replace(/^0+(?=\d)/, '')     // strip leading zeros
                  setPriceText(digits)
                }}
                onFocus={(e) => e.currentTarget.select()}
                placeholder="249"
                className="font-display text-6xl bg-transparent border-b border-brand-ink focus:border-brand-gold outline-none w-40 py-1 placeholder:text-brand-muted/40"
                style={{ letterSpacing: '-0.03em' }}
                required
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted ml-3">
                USD
              </span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-px bg-brand-hairline border border-brand-hairline">
              <div className="bg-brand-cream-card p-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  You keep
                </span>
                <p
                  className="font-display text-3xl mt-2 text-brand-gold"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  ${(youKeepCents / 100).toFixed(2)}
                </p>
                <p className="text-xs text-brand-muted">per sale &times; unlimited resales</p>
              </div>
              <div className="bg-brand-cream-card p-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  Skillzy keeps
                </span>
                <p
                  className="font-display text-3xl mt-2"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  ${(platformFeeCents / 100).toFixed(2)}
                </p>
                <p className="text-xs text-brand-muted">20%, keeps the lights on</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3
              className="font-display text-2xl tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              How to think about price
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-muted">
              <li>
                <span className="text-brand-ink font-semibold">Skills</span>: $9–$29.
                Singular, useful, easy yes.
              </li>
              <li>
                <span className="text-brand-ink font-semibold">Guides</span>: $9–$24.
                Charge for the thinking, not the page count.
              </li>
              <li>
                <span className="text-brand-ink font-semibold">Agent Setups</span>: $49–$499+.
                Replaces a contractor or a SaaS — price like one.
              </li>
            </ul>
          </div>
        </div>
      </StepShell>

      {/* STEP 5 — submit */}
      <StepShell number="05" title="Publish">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <ul className="lg:col-span-7 bg-brand-cream-card border border-brand-hairline divide-y divide-brand-hairline">
            {[
              {
                title: 'Goes live instantly',
                body: 'Your listing publishes the moment you submit — no waiting on review.',
              },
              {
                title: 'Connect Stripe to get paid',
                body: 'One click. We never hold your money — Stripe pays you direct, you keep 80%.',
              },
              {
                title: 'Buyers download immediately',
                body: 'After payment, buyers get your files by email and a secure link — no account needed.',
              },
              {
                title: 'You own what you upload',
                body: 'Only list work you have the rights to. Report problems to hi@skillzy.ai.',
              },
            ].map((s) => (
              <li key={s.title} className="p-6 sm:p-7">
                <h4
                  className="font-display text-xl tracking-tight"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {s.title}
                </h4>
                <p className="mt-2 text-sm text-brand-muted">{s.body}</p>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-5">
            <label className="flex items-start gap-3 mb-6 text-sm text-brand-muted cursor-pointer">
              <input
                type="checkbox"
                name="accept_terms"
                required
                className="mt-1 accent-brand-gold w-4 h-4 shrink-0"
              />
              <span>
                I own or am licensed to sell everything in this listing, it
                contains no malware and infringes no one’s rights, and I
                agree to the{' '}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-brand-muted hover:text-brand-ink hover:border-brand-ink"
                >
                  Seller Terms
                </a>
                .
              </span>
            </label>

            <Submit />

            {state.error && (
              <p className="mt-4 text-sm text-red-700">{state.error}</p>
            )}
            {state.info && (
              <p className="mt-4 text-sm text-brand-gold-dark">{state.info}</p>
            )}

            <p className="mt-5 text-xs text-brand-muted max-w-xs">
              Your listing goes live at <code>/marketplace/{'{slug}'}</code>{' '}
              immediately. Edit price, tagline, or unpublish from your
              dashboard any time.
            </p>
          </div>
        </div>
      </StepShell>
      </form>
    </>
  )
}
