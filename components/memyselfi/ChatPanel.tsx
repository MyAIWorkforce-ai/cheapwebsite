'use client'

import { useEffect, useRef, useState } from 'react'
import type { Twin } from '@/lib/memyselfi/twins'
import { respond } from '@/lib/memyselfi/brain'

type Msg = { role: 'twin' | 'me'; text: string }

function initials(name: string): string {
  return name
    .replace(/[“"”]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export default function ChatPanel({
  twin,
  compact = false,
}: {
  twin: Twin
  compact?: boolean
}) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'twin', text: twin.greeting },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const turnRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function send(raw: string) {
    const text = raw.trim()
    if (!text || typing) return
    const turn = turnRef.current
    turnRef.current += 1
    setMessages((m) => [...m, { role: 'me', text }])
    setInput('')
    setTyping(true)

    const reply = respond(twin, text, turn)
    const delay = 480 + Math.min(reply.text.length * 9, 1100)
    timerRef.current = setTimeout(() => {
      setMessages((m) => [...m, { role: 'twin', text: reply.text }])
      setTyping(false)
    }, delay)
  }

  const suggestions = compact
    ? twin.suggestions.slice(0, 3)
    : twin.suggestions

  return (
    <div
      className="flex flex-col rounded-2xl border overflow-hidden"
      style={
        {
          // Each twin colours its own conversation.
          '--mmi-accent': twin.accent,
          borderColor: 'var(--mmi-line)',
          backgroundColor: 'var(--mmi-panel)',
        } as React.CSSProperties
      }
    >
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ borderColor: 'var(--mmi-line)' }}
      >
        <span
          className="grid place-items-center w-9 h-9 rounded-full text-sm font-semibold shrink-0"
          style={{ backgroundColor: twin.accent, color: '#0b0a14' }}
          aria-hidden
        >
          {initials(twin.name)}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: 'var(--mmi-text)' }}>
            {twin.shortName}’s twin
          </p>
          <p className="text-[11px] flex items-center gap-1.5" style={{ color: 'var(--mmi-muted)' }}>
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#5BC8A8' }}
            />
            Always on · answers as {twin.shortName}
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`px-4 py-4 space-y-3 overflow-y-auto ${compact ? 'h-[300px]' : 'h-[420px]'}`}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed"
              style={
                m.role === 'me'
                  ? { backgroundColor: twin.accent, color: '#0b0a14' }
                  : {
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      color: 'var(--mmi-text)',
                      border: '1px solid var(--mmi-line)',
                    }
              }
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div
              className="rounded-2xl px-4 py-3 flex items-center gap-1.5"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--mmi-line)',
              }}
              aria-label={`${twin.shortName} is typing`}
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="mmi-dot inline-block w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: 'var(--mmi-muted)',
                    animationDelay: `${d * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {messages.length <= 2 && (
        <div className="px-4 pb-1 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="text-[12.5px] rounded-full px-3 py-1.5 border transition-colors"
              style={{ borderColor: 'var(--mmi-line)', color: 'var(--mmi-muted)' }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="flex items-center gap-2 p-3 border-t"
        style={{ borderColor: 'var(--mmi-line)' }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask ${twin.shortName} anything…`}
          aria-label={`Message ${twin.shortName}’s twin`}
          className="flex-1 bg-transparent outline-none text-[14px] px-2"
          style={{ color: 'var(--mmi-text)' }}
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          className="rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-40 transition-opacity"
          style={{ backgroundColor: twin.accent, color: '#0b0a14' }}
        >
          Send
        </button>
      </form>

      <p
        className="px-4 pb-3 text-[11px]"
        style={{ color: 'var(--mmi-muted)' }}
      >
        Simulated from what {twin.shortName} taught it. Not a live person.
      </p>
    </div>
  )
}
