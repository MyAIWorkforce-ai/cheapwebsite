'use client'

import { useState } from 'react'

// Password input with a show/hide toggle. The eye sits at the right
// edge of the underline-styled input the rest of the site uses, so
// it visually matches every form (sign in, sign up, /account password
// update, /auth/update-password, guest-checkout "create account").
export default function PasswordInput({
  name,
  required,
  minLength,
  autoComplete,
  placeholder = '••••••••',
  defaultValue,
  value,
  onChange,
  className,
}: {
  name: string
  required?: boolean
  minLength?: number
  autoComplete?: string
  placeholder?: string
  defaultValue?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}) {
  const [show, setShow] = useState(false)
  const baseClass =
    'w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 pr-10 placeholder:text-brand-muted/60'

  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        name={name}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className={className ?? `mt-2 ${baseClass}`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? 'Hide password' : 'Show password'}
        aria-pressed={show}
        tabIndex={-1}
        className="absolute right-1 top-1/2 -translate-y-1/2 mt-1 p-1.5 text-brand-muted hover:text-brand-ink transition-colors"
      >
        {show ? (
          // Eye-off
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" y1="2" x2="22" y2="22" />
          </svg>
        ) : (
          // Eye
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  )
}
