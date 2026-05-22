'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import GitHubImport from '@/components/GitHubImport'
import MultiSelectPopup from '@/components/MultiSelectPopup'
import { publishListing, type PublishState } from './actions'

// Canonical lists for the niche + platform picker popups. Kept in sync
// with lib/content but inlined here so this client component stays free
// of server-only imports.
const NICHE_OPTIONS = [
  'Real Estate',
  'Property Mgmt',
  'Tradies',
  'Builders',
  'Plumbers',
  'Electricians',
  'Accountants',
  'Bookkeepers',
  'Lawyers',
  'Consultants',
  'Coaches',
  'E-commerce',
  'Hospitality',
  'Restaurants',
  'Cafes',
  'Healthcare',
  'Dentists',
  'Vets',
  'Therapists',
  'Education',
  'Tutors',
  'Fitness',
  'Salons',
  'Marketing',
  'Agencies',
  'Recruiters',
  'Photographers',
  'Designers',
]
const PLATFORM_OPTIONS = [
  'Claude',
  'OpenClaw',
  'Manus',
  'ChatGPT',
  'Hermes',
  'Gemini',
  'Grok',
  'Ollama',
  'Mistral',
  'DeepSeek',
  'n8n',
  'Make',
  'Zapier',
]

// Minimal local types for the Web Speech API (not in lib.dom by default).
type SpeechRecResultLike = { isFinal: boolean; 0: { transcript: string } }
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
  { key: 'skill', title: 'Skill', price: '$9 – $29', desc: 'One job, done sharp.' },
  { key: 'guide', title: 'Guide', price: '$9 – $24', desc: 'A how-to people read.' },
  {
    key: 'agent_setup',
    title: 'Agent Setup',
    price: '$49 – $499+',
    desc: 'The whole agent. Best margins.',
    recommended: true,
  },
]

// Draft is stashed here so a sign-up / email-confirm detour can never
// wipe a half-built listing. Files can't be serialised — the creator
// re-drops those — but every word the AI wrote is kept.
const DRAFT_KEY = 'skz_listing_draft_v1'

type Draft = {
  type: 'skill' | 'guide' | 'agent_setup'
  title: string
  tagline: string
  niche: string
  platforms: string
  descText: string
  whatText: string
  priceText: string
  videoUrl: string
  videoLabel: string
  brief: string
}

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

function Heading({ step, title, sub }: { step: string; title: string; sub?: string }) {
  return (
    <div className="mb-7">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
        {step}
      </span>
      <h2
        className="font-display text-3xl sm:text-4xl tracking-tight mt-2"
        style={{ letterSpacing: '-0.03em' }}
      >
        {title}
      </h2>
      {sub && <p className="mt-2 text-sm text-brand-muted">{sub}</p>}
    </div>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
        {label}
      </span>
      {children}
      {hint && <span className="mt-2 block text-xs text-brand-muted">{hint}</span>}
    </label>
  )
}

const inputCls =
  'mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg text-brand-ink placeholder:text-brand-muted/50'

type DraftResponse = {
  title?: string
  tagline?: string
  niche?: string
  platforms?: string[]
  description?: string[]
  whatYouGet?: string[]
}

export default function NewListingForm({ githubUser }: { githubUser?: string }) {
  const [state, action] = useFormState(publishListing, initial)

  // After Publish returns a message (error or info), the message renders
  // at the very bottom by the button — scroll it into view so the
  // creator isn't left staring at the footer wondering what happened.
  const msgRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (state.error || state.info) {
      msgRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [state.error, state.info])

  const [type, setType] = useState<'skill' | 'guide' | 'agent_setup'>('agent_setup')
  const [title, setTitle] = useState('')
  const [tagline, setTagline] = useState('')
  const [niche, setNiche] = useState('')
  const [platforms, setPlatforms] = useState('')
  // Description / what-you-get are now plain editable text (one point
  // per line). The AI pre-fills them; the creator can rewrite freely
  // even with no AI key. Posted back as JSON arrays (server contract
  // unchanged).
  const [descText, setDescText] = useState('')
  const [whatText, setWhatText] = useState('')
  const [priceText, setPriceText] = useState('249')
  const [videoUrl, setVideoUrl] = useState('')
  const [videoLabel, setVideoLabel] = useState('')
  const [brief, setBrief] = useState('')

  const [drafting, setDrafting] = useState(false)
  const [extracting, setExtracting] = useState(false)
  const [draftError, setDraftError] = useState<string | null>(null)
  const [showNote, setShowNote] = useState(false)
  const [restored, setRestored] = useState(false)

  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const TEXT_EXT = /\.(md|markdown|yaml|yml|json|txt|prompt)$/i
  const PDF_AUTOREAD_MAX = 3_000_000

  const price = Math.max(0, Number(priceText) || 0)
  const platformFeeCents = Math.round(price * 100 * 0.2)
  const youKeepCents = price * 100 - platformFeeCents

  const toArray = (s: string) =>
    s
      .split('\n')
      .map((l) => l.replace(/^[-•·\s]+/, '').trim())
      .filter(Boolean)

  // ---- draft persistence (survives the sign-up / email-confirm hop) ----
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (!raw) return
      const d = JSON.parse(raw) as Partial<Draft>
      if (d.type) setType(d.type)
      if (d.title) setTitle(d.title)
      if (d.tagline) setTagline(d.tagline)
      if (d.niche) setNiche(d.niche)
      if (d.platforms) setPlatforms(d.platforms)
      if (d.descText) setDescText(d.descText)
      if (d.whatText) setWhatText(d.whatText)
      if (d.priceText) setPriceText(d.priceText)
      if (d.videoUrl) setVideoUrl(d.videoUrl)
      if (d.videoLabel) setVideoLabel(d.videoLabel)
      if (d.brief) setBrief(d.brief)
      if (d.title || d.tagline || d.descText) setRestored(true)
    } catch {
      /* ignore corrupt draft */
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const d: Draft = {
          type,
          title,
          tagline,
          niche,
          platforms,
          descText,
          whatText,
          priceText,
          videoUrl,
          videoLabel,
          brief,
        }
        const empty =
          !title && !tagline && !descText && !whatText && !brief
        if (empty) localStorage.removeItem(DRAFT_KEY)
        else localStorage.setItem(DRAFT_KEY, JSON.stringify(d))
      } catch {
        /* storage full / blocked — non-fatal */
      }
    }, 400)
    return () => clearTimeout(t)
  }, [
    type,
    title,
    tagline,
    niche,
    platforms,
    descText,
    whatText,
    priceText,
    videoUrl,
    videoLabel,
    brief,
  ])

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

  const draft = useCallback(
    async (briefOverride?: string, pdf?: { data: string; name: string }) => {
      const text = (briefOverride ?? brief).trim()
      if (!text && !pdf) {
        setDraftError('Drop a file or add a note so the AI has something to work with.')
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
        if (json.description?.length) setDescText(json.description.join('\n'))
        if (json.whatYouGet?.length) setWhatText(json.whatYouGet.join('\n'))
      } catch (err) {
        setDraftError((err as Error).message)
      } finally {
        setDrafting(false)
      }
    },
    [brief, type],
  )

  async function onFilesPicked(picked: FileList | null) {
    if (!picked || picked.length === 0) return
    const arr = Array.from(picked)
    setFiles(arr)
    setDraftError(null)
    setExtracting(true)
    try {
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

      const pdfFile = arr.find((f) => /\.pdf$/i.test(f.name))
      let pdfPayload: { data: string; name: string } | undefined
      if (pdfFile) {
        if (pdfFile.size > PDF_AUTOREAD_MAX) {
          setDraftError(
            `${pdfFile.name} uploads fine, but it’s too big to auto-read. Add a short note below and tap “Write it with AI”.`,
          )
        } else {
          pdfPayload = { data: await readAsBase64(pdfFile), name: pdfFile.name }
        }
      }
      if (merged || pdfPayload) void draft(merged, pdfPayload)
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

  // Voice dictation (browser-native). One quiet control that fills the
  // AI note — kept simple and reliable rather than per-field.
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
    setShowNote(true)
  }

  const busy = extracting || drafting

  return (
    <>
      <GitHubImport
        defaultUsername={githubUser}
        onImport={(imported, importedBrief) => {
          setFiles(imported)
          setBrief(importedBrief)
          void draft(importedBrief)
        }}
      />

      <form action={action}>
        <input type="hidden" name="description" value={JSON.stringify(toArray(descText))} />
        <input type="hidden" name="what_you_get" value={JSON.stringify(toArray(whatText))} />
        <input type="hidden" name="type" value={type} />

        <div className="max-w-2xl mx-auto px-6 lg:px-10 py-12 sm:py-16 space-y-16">
          {restored && (
            <div className="border border-brand-gold bg-brand-cream-card p-4 text-sm">
              <span className="font-semibold">We kept your draft.</span>{' '}
              {files.length === 0
                ? 'Re-drop your file below — everything you wrote is still here.'
                : 'Picking up where you left off.'}
            </div>
          )}

          {/* TYPE */}
          <section>
            <Heading step="01" title="What is it?" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
              {types.map((t) => {
                const isSelected = type === t.key
                return (
                  <label
                    key={t.key}
                    className={
                      'relative p-5 cursor-pointer transition-colors ' +
                      (isSelected
                        ? 'bg-white ring-4 ring-brand-gold ring-inset'
                        : 'bg-brand-cream-card hover:bg-white')
                    }
                  >
                    {t.recommended && (
                      <span className="absolute top-2.5 right-2.5 font-mono text-[9px] uppercase tracking-[0.16em] bg-brand-navy text-brand-cream px-1.5 py-0.5">
                        Best
                      </span>
                    )}
                    <input
                      type="radio"
                      name="type_choice"
                      value={t.key}
                      checked={isSelected}
                      onChange={() => setType(t.key as typeof type)}
                      className="sr-only peer"
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-muted">
                      {t.price}
                    </span>
                    <h3
                      className={
                        'font-display text-xl sm:text-2xl mt-1.5 tracking-tight ' +
                        (isSelected ? 'text-brand-gold' : '')
                      }
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {t.title}
                    </h3>
                    <p className="mt-1 text-xs text-brand-muted">{t.desc}</p>
                  </label>
                )
              })}
            </div>
          </section>

          {/* FILES */}
          <section>
            <Heading
              step="02"
              title="Drop your file in"
              sub="The AI reads it and writes the whole listing below. You just check it."
            />
            <label
              htmlFor="bundle-files"
              className="block border-2 border-dashed border-brand-hairline p-10 text-center cursor-pointer hover:border-brand-gold transition-colors"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                Drag, drop, or browse
              </span>
              <p
                className="font-display text-xl sm:text-2xl mt-2 tracking-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                SKILL.md, prompts, configs, PDFs.
              </p>
              <p className="mt-2 text-xs text-brand-muted">
                .md · .yaml · .json · .txt · .zip · .pdf — up to 50&nbsp;MB each
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
              {busy && (
                <p className="mt-4 text-xs text-brand-gold">
                  ✿ Reading it and writing your listing…
                </p>
              )}
            </label>

            {files.length > 0 && (
              <div className="mt-4">
                <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
                  {files.map((f, i) => (
                    <li
                      key={`${f.name}-${i}`}
                      className="py-2.5 flex items-center justify-between gap-4"
                    >
                      <p className="font-mono text-sm truncate">{f.name}</p>
                      <p className="text-xs text-brand-muted shrink-0">
                        {(f.size / 1024).toFixed(0)} KB
                      </p>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={clearFiles}
                  className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-red-700 transition-colors"
                >
                  Clear + pick again
                </button>
              </div>
            )}

            <div className="mt-4">
              {!showNote ? (
                <button
                  type="button"
                  onClick={() => setShowNote(true)}
                  className="text-sm text-brand-muted hover:text-brand-ink border-b border-brand-muted/40 hover:border-brand-ink transition-colors"
                >
                  ✦ No file? Describe it instead
                </button>
              ) : (
                <div className="border border-brand-hairline p-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                      Tell the AI what you built
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowNote(false)}
                      aria-label="Minimise"
                      className="p-1 -m-1 text-brand-muted hover:text-brand-ink transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <textarea
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    rows={3}
                    placeholder="e.g. Real-estate skill — captures leads, drafts listings, follows up."
                    className="mt-2 w-full bg-transparent border border-brand-hairline focus:border-brand-gold outline-none p-3 text-sm text-brand-ink placeholder:text-brand-muted/50"
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => draft()}
                      disabled={drafting}
                      className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-5 py-2.5 text-sm hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
                    >
                      {drafting ? 'Writing…' : 'Write it with AI'}
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
                            : 'border-brand-hairline hover:border-brand-ink')
                        }
                      >
                        <span aria-hidden>{listening ? '●' : '🎙'}</span>
                        {listening ? 'Listening — tap to stop' : 'Say it instead'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {draftError && <p className="mt-3 text-sm text-red-700">{draftError}</p>}
          </section>

          {/* LISTING FIELDS */}
          <section>
            <Heading
              step="03"
              title="Your listing"
              sub="The AI filled this in. Change anything — just type."
            />
            <div className="space-y-7">
              <Field label="Title">
                <input
                  type="text"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Real Estate, end to end."
                  className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 font-display text-2xl text-brand-ink placeholder:text-brand-muted/50"
                  style={{ letterSpacing: '-0.018em' }}
                />
              </Field>

              <Field label="Tagline" hint="One sentence: what the buyer's agent gets.">
                <textarea
                  name="tagline"
                  rows={2}
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Captures leads, drafts listings, follows up — automatically."
                  className={inputCls}
                />
              </Field>

              <Field label="What it does" hint="One point per line.">
                <textarea
                  rows={4}
                  value={descText}
                  onChange={(e) => setDescText(e.target.value)}
                  placeholder={'Handles the whole pipeline\nWrites the follow-ups\nNever drops a lead'}
                  className={inputCls}
                />
              </Field>

              <Field label="What buyers get" hint="One item per line.">
                <textarea
                  rows={4}
                  value={whatText}
                  onChange={(e) => setWhatText(e.target.value)}
                  placeholder={'SKILL.md for the core capability\nSystem prompts\nSetup guide'}
                  className={inputCls}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Niche" hint="Tap to tick one or more. Add your own at the bottom.">
                  {/* Hidden input preserves the existing form-data wire so
                      the publish action keeps seeing 'niche' on submit. */}
                  <input type="hidden" name="niche" value={niche} />
                  <MultiSelectPopup
                    label="Pick the niches this skill fits"
                    options={NICHE_OPTIONS}
                    value={niche}
                    onChange={setNiche}
                    placeholder="Tap to choose niches"
                  />
                </Field>
                <Field label="Works with" hint="Tap to tick all the agents/platforms it plugs into.">
                  <input type="hidden" name="platforms" value={platforms} />
                  <MultiSelectPopup
                    label="Pick the platforms this works with"
                    options={PLATFORM_OPTIONS}
                    value={platforms}
                    onChange={setPlatforms}
                    placeholder="Tap to choose platforms"
                  />
                </Field>
              </div>

              <Field
                label="Walkthrough video — optional"
                hint="Paste a Loom / YouTube / Vimeo link. Shows before anyone buys — a 60–90s demo is the single biggest conversion lever."
              >
                <input
                  type="url"
                  name="video_url"
                  inputMode="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.loom.com/share/…"
                  className={inputCls}
                />
              </Field>

              <Field label="Call the video what you want — optional">
                <input
                  type="text"
                  name="video_label"
                  maxLength={48}
                  value={videoLabel}
                  onChange={(e) => setVideoLabel(e.target.value)}
                  placeholder="Watch it work"
                  className={inputCls}
                />
              </Field>
            </div>
          </section>

          {/* PRICE */}
          <section>
            <Heading step="04" title="Set your price" />
            <div className="flex items-baseline gap-2">
              <span
                className="font-display text-5xl text-brand-ink"
                style={{ letterSpacing: '-0.03em' }}
              >
                $
              </span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                name="price"
                value={priceText}
                onChange={(e) =>
                  setPriceText(
                    e.target.value.replace(/\D/g, '').replace(/^0+(?=\d)/, ''),
                  )
                }
                onFocus={(e) => e.currentTarget.select()}
                placeholder="249"
                className="font-display text-5xl bg-transparent border-b border-brand-ink focus:border-brand-gold outline-none w-36 py-1 placeholder:text-brand-muted/40"
                style={{ letterSpacing: '-0.03em' }}
                required
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted ml-2">
                USD
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-px bg-brand-hairline border border-brand-hairline max-w-md">
              <div className="bg-brand-cream-card p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-muted">
                  You keep
                </span>
                <p
                  className="font-display text-2xl mt-1 text-brand-gold"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  ${(youKeepCents / 100).toFixed(2)}
                </p>
              </div>
              <div className="bg-brand-cream-card p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-muted">
                  Skillzy (20%)
                </span>
                <p
                  className="font-display text-2xl mt-1"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  ${(platformFeeCents / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </section>

          {/* PUBLISH */}
          <section>
            <Heading step="05" title="Publish" sub="Goes live instantly. Edit or unpublish any time from your dashboard." />
            <label className="flex items-start gap-3 mb-6 text-sm text-brand-muted cursor-pointer">
              <input
                type="checkbox"
                name="accept_terms"
                required
                className="mt-1 accent-brand-gold w-4 h-4 shrink-0"
              />
              <span>
                I own or am licensed to sell everything in this listing, it
                contains no malware and infringes no one’s rights, and I agree
                to the{' '}
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

            <div ref={msgRef}>
              {state.error && <p className="mt-4 text-sm text-red-700">{state.error}</p>}
              {state.info && (
                <p className="mt-4 text-sm text-brand-gold-dark">{state.info}</p>
              )}
            </div>
          </section>
        </div>
      </form>
    </>
  )
}
