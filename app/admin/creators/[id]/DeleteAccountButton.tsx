'use client'

import { useFormState } from 'react-dom'
import { deleteAccount, type DeleteState } from './actions'

const initial: DeleteState = {}

export default function DeleteAccountButton({ userId }: { userId: string }) {
  const [state, action] = useFormState(deleteAccount, initial)

  return (
    <form
      action={action}
      onSubmit={(e) => {
        const ok = window.confirm(
          'Permanently delete this account? This cannot be undone. (It will fail safely if the creator has sales.)',
        )
        if (!ok) e.preventDefault()
      }}
    >
      <input type="hidden" name="userId" value={userId} />
      {state?.error && (
        <p className="text-sm text-red-700 mb-3">{state.error}</p>
      )}
      <button
        type="submit"
        className="text-sm font-semibold text-red-700 border border-red-700/40 px-5 py-2.5 hover:bg-red-50 transition-colors"
      >
        Delete account
      </button>
    </form>
  )
}
