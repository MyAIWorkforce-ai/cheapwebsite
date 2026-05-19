'use client'

import { useEffect, useMemo, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Link from 'next/link'
import ChatPanel from './ChatPanel'
import { buildTwin, sanitizeHandle } from '@/lib/memyselfi/shape'
import { saveTwin, type SaveState } from '@/app/memyselfi/actions'

const ACCENTS = [
  '#8C7BFF', '#5BC8A8', '#E0995B', '#5B9DFF', '#E06B9C', '#C9A227',
]

type Fact = { topic: string; answer: string }

const empty = {
  name: '',
  handle: '',
  role: '',
  location: '',
  tagline: '',
  bio: '',
  accent: ACCENTS[0],
  voice: '',
  facts: [
    { topic: '', answer: '' },
    { topic: '', answer: '' },
  ] as Fact[],
}

type Draft = typeof empty

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
      <span
        className="block text-[13px] font-semibold mb-1.5"
        style={{ color: 'var(--mmi-text)' }}
      >
        {label}
      </span>
      {hint && (
        <span
          className="block text-[12.5px] mb-2"
          style={{ color: 'var(--mmi-muted)' }}
        >
          {hint}
        </span>
      )}
      {children}
    </label>
  )
}

const inputCls =
  'w-full rounded-lg px-3.5 py-2.5 text-[14px] outline-none transition-colors'
const inputStyle = {
  backgroundColor: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--mmi-line)',
  color: 'var(--mmi-text)',
} as const

function PublishButton({ loggedIn }: { loggedIn: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-50 transition-transform hover:scale-[1.02]"
      style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
    >
      {pending
        ? 'Publishing…'
        : loggedIn
          ? 'Publish my twin'
          : 'Create account & publish'}
    </button>
  )
}

export default function CreateFlow({ loggedIn }: { loggedIn: boolean }) {
  const [d, setD] = useState<Draft>(empty)
  const [hydrated, setHydrated] = useState(false)
  const [state, formAction] = useFormState<SaveState, FormData>(saveTwin, {})

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mmi:draft')
      if (raw) {
        const parsed = JSON.parse(raw)
        setD({ ...empty, ...parsed })
      }
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem('mmi:draft', JSON.stringify(d))
    } catch {
      /* ignore */
    }
  }, [d, hydrated])

  const handle = useMemo(
    () => sanitizeHandle(d.handle || d.name) || 'yourname',
    [d.handle, d.name],
  )

  const preview = useMemo(
    () =>
      buildTwin({
        ...d,
        name: d.name || 'Your name',
        tagline: d.tagline || 'This is my twin.',
      }),
    [d],
  )

  function set<K extends keyof Draft>(k: K, v: Draft[K]) {
    setD((prev) => ({ ...prev, [k]: v }))
  }

  function setFact(i: number, k: keyof Fact, v: string) {
    setD((prev) => {
      const facts = prev.facts.slice()
      facts[i] = { ...facts[i], [k]: v }
      return { ...prev, facts }
    })
  }

  const readyFacts = d.facts.filter((f) => f.topic.trim() && f.answer.trim())
  const canPublish = d.name.trim().length > 0 && readyFacts.length >= 2

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
      {/* FORM */}
      <form action={formAction} className="space-y-7">
        <input type="hidden" name="handle" value={handle} />
        <input type="hidden" name="accent" value={d.accent} />
        <input
          type="hidden"
          name="facts"
          value={JSON.stringify(readyFacts)}
        />

        <div>
          <h2
            className="font-display text-2xl"
            style={{ color: 'var(--mmi-text)' }}
          >
            Who is this twin?
          </h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input
                name="name"
                value={d.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Maya Okafor"
                className={inputCls}
                style={inputStyle}
              />
            </Field>
            <Field label="Handle" hint={`memyselfi.ai/${handle}`}>
              <input
                value={d.handle}
                onChange={(e) => set('handle', e.target.value)}
                placeholder="maya"
                className={inputCls}
                style={inputStyle}
              />
            </Field>
            <Field label="What you do">
              <input
                name="role"
                value={d.role}
                onChange={(e) => set('role', e.target.value)}
                placeholder="Indie founder · product designer"
                className={inputCls}
                style={inputStyle}
              />
            </Field>
            <Field label="Where">
              <input
                name="location"
                value={d.location}
                onChange={(e) => set('location', e.target.value)}
                placeholder="Lisbon"
                className={inputCls}
                style={inputStyle}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="One line that is the whole point of you">
              <input
                name="tagline"
                value={d.tagline}
                onChange={(e) => set('tagline', e.target.value)}
                placeholder="I build small software companies and design what's inside them."
                className={inputCls}
                style={inputStyle}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field
              label="Your story"
              hint="A short paragraph or two, in first person. This is what people read before they talk to you."
            >
              <textarea
                name="bio"
                value={d.bio}
                onChange={(e) => set('bio', e.target.value)}
                rows={4}
                placeholder="I've shipped four products in six years — two died, one got acquired, one pays my rent…"
                className={inputCls}
                style={inputStyle}
              />
            </Field>
          </div>
        </div>

        <div>
          <h2
            className="font-display text-2xl"
            style={{ color: 'var(--mmi-text)' }}
          >
            What does it know?
          </h2>
          <p
            className="mt-2 text-[14px]"
            style={{ color: 'var(--mmi-muted)' }}
          >
            The questions people actually ask you, and how you actually answer
            them. At least two. The more, the more it sounds like you.
          </p>
          <div className="mt-5 space-y-4">
            {d.facts.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border p-4"
                style={{
                  borderColor: 'var(--mmi-line)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                }}
              >
                <input
                  value={f.topic}
                  onChange={(e) => setFact(i, 'topic', e.target.value)}
                  placeholder="The question — e.g. How do you price a product?"
                  className={`${inputCls} mb-2`}
                  style={inputStyle}
                />
                <textarea
                  value={f.answer}
                  onChange={(e) => setFact(i, 'answer', e.target.value)}
                  rows={3}
                  placeholder="Your real answer, in your own words and voice."
                  className={inputCls}
                  style={inputStyle}
                />
                {d.facts.length > 2 && (
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        'facts',
                        d.facts.filter((_, j) => j !== i),
                      )
                    }
                    className="mt-2 text-[12.5px]"
                    style={{ color: 'var(--mmi-muted)' }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => set('facts', [...d.facts, { topic: '', answer: '' }])}
              className="text-[13px] font-medium rounded-full px-4 py-2 border"
              style={{ borderColor: 'var(--mmi-line)', color: 'var(--mmi-accent)' }}
            >
              + Add another
            </button>
          </div>
        </div>

        <div>
          <h2
            className="font-display text-2xl"
            style={{ color: 'var(--mmi-text)' }}
          >
            How does it sound?
          </h2>
          <div className="mt-5 space-y-4">
            <Field
              label="Your voice in three words"
              hint="Blunt. Warm. Funny. Careful. Whatever's true."
            >
              <input
                name="voice"
                value={d.voice}
                onChange={(e) => set('voice', e.target.value)}
                placeholder="Direct, dry, a little impatient"
                className={inputCls}
                style={inputStyle}
              />
            </Field>
            <Field label="Accent colour">
              <div className="flex gap-3 mt-1">
                {ACCENTS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-label={`Accent ${c}`}
                    onClick={() => set('accent', c)}
                    className="w-9 h-9 rounded-full transition-transform"
                    style={{
                      backgroundColor: c,
                      outline:
                        d.accent === c ? '2px solid var(--mmi-text)' : 'none',
                      outlineOffset: '2px',
                      transform: d.accent === c ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            </Field>
          </div>
        </div>

        {state.error && (
          <p
            className="text-[13px] rounded-lg px-3 py-2"
            style={{
              color: '#ffb4b4',
              backgroundColor: 'rgba(255,80,80,0.08)',
              border: '1px solid rgba(255,80,80,0.25)',
            }}
          >
            {state.error}
          </p>
        )}

        {!canPublish && (
          <p className="text-[13px]" style={{ color: 'var(--mmi-muted)' }}>
            Add a name and at least two things it knows to publish.
          </p>
        )}

        <PublishButton loggedIn={loggedIn} />
        {!loggedIn && (
          <p className="text-[12.5px]" style={{ color: 'var(--mmi-muted)' }}>
            Your draft is saved on this device. Already have an account?{' '}
            <Link
              href="/memyselfi/login?next=create"
              className="underline"
              style={{ color: 'var(--mmi-accent)' }}
            >
              Log in
            </Link>
            .
          </p>
        )}
      </form>

      {/* PREVIEW */}
      <div className="lg:sticky lg:top-24 self-start">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-3"
          style={{ color: 'var(--mmi-accent)' }}
        >
          Live preview · talk to it now
        </p>
        <ChatPanel key={preview.accent + preview.knowledge.length} twin={preview} />
        <p className="mt-3 text-[12.5px]" style={{ color: 'var(--mmi-muted)' }}>
          This updates as you type. Try asking it one of your own questions
          before you publish.
        </p>
      </div>
    </div>
  )
}
