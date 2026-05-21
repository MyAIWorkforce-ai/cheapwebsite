'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * MultiSelectPopup
 *
 * Click a chip-style input → opens a centred modal with tickable
 * options. Selected options show a gold border. Custom entries are
 * allowed via a small text field at the bottom (for niches/platforms
 * the catalog doesn't know yet).
 *
 * Value model: a comma-separated string, so the existing form action
 * that splits on commas keeps working unchanged.
 */
export default function MultiSelectPopup({
  label,
  options,
  value,
  onChange,
  placeholder = 'Tap to choose',
  allowCustom = true,
}: {
  label: string
  options: string[]
  value: string // comma-separated
  onChange: (next: string) => void
  placeholder?: string
  allowCustom?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [custom, setCustom] = useState('')
  const dialogRef = useRef<HTMLDivElement | null>(null)

  // Parse the current comma-separated value into a Set for quick lookups.
  const selected = new Set(
    value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  )

  // Anything currently selected that isn't in the canonical options list
  // is a custom entry — surface it as a chip so users can untick it.
  const customExtras = Array.from(selected).filter(
    (s) => !options.some((o) => o.toLowerCase() === s.toLowerCase()),
  )
  const allChips = [...options, ...customExtras]

  function toggle(opt: string) {
    const next = new Set(selected)
    const match = Array.from(next).find(
      (s) => s.toLowerCase() === opt.toLowerCase(),
    )
    if (match) next.delete(match)
    else next.add(opt)
    onChange(Array.from(next).join(', '))
  }

  function addCustom() {
    const trimmed = custom.trim()
    if (!trimmed) return
    if (Array.from(selected).some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setCustom('')
      return
    }
    const next = new Set(selected)
    next.add(trimmed)
    onChange(Array.from(next).join(', '))
    setCustom('')
  }

  // Close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const displayValue = value || ''

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg text-left text-brand-ink hover:border-brand-gold transition-colors"
      >
        {displayValue ? (
          <span className="text-brand-ink">{displayValue}</span>
        ) : (
          <span className="text-brand-muted/50">{placeholder}</span>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-ink/40"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="w-full max-w-lg max-h-[85vh] overflow-y-auto bg-brand-cream border border-brand-ink p-6 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                  Pick one or more
                </p>
                <h2
                  className="font-display text-2xl mt-1 tracking-tight"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {label}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-1 -m-1 text-brand-muted hover:text-brand-ink"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {allChips.map((opt) => {
                const isSelected = Array.from(selected).some(
                  (s) => s.toLowerCase() === opt.toLowerCase(),
                )
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggle(opt)}
                    className={
                      'px-3.5 py-2 text-sm border transition-colors ' +
                      (isSelected
                        ? 'border-2 border-brand-gold bg-brand-gold/15 text-brand-ink font-semibold'
                        : 'border-brand-hairline text-brand-ink hover:border-brand-ink')
                    }
                  >
                    {isSelected && <span aria-hidden className="mr-1.5">✓</span>}
                    {opt}
                  </button>
                )
              })}
            </div>

            {allowCustom && (
              <div className="mt-6 pt-5 border-t border-brand-hairline">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  Add your own
                </p>
                <div className="mt-2 flex items-stretch gap-2">
                  <input
                    type="text"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addCustom()
                      }
                    }}
                    placeholder="Something not in the list"
                    className="flex-1 bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-sm text-brand-ink placeholder:text-brand-muted/50"
                  />
                  <button
                    type="button"
                    onClick={addCustom}
                    disabled={!custom.trim()}
                    className="shrink-0 px-4 py-2 text-sm bg-brand-cream-card border border-brand-hairline hover:border-brand-ink transition-colors disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-xs text-brand-muted hover:text-brand-ink underline underline-offset-4"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-brand-gold text-brand-ink font-semibold px-6 py-2.5 text-sm hover:bg-brand-gold-dark transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
