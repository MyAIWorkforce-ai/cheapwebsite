'use client'

import { setListingStatus } from './actions'

export default function AdminListingActions({
  id,
  creatorId,
  status,
}: {
  id: string
  creatorId: string
  status: string
}) {
  const removed = status === 'removed'
  const nextStatus = removed ? 'live' : 'removed'

  return (
    <form
      action={setListingStatus}
      onSubmit={(e) => {
        const ok = window.confirm(
          removed
            ? 'Restore this listing to the live marketplace?'
            : 'Remove this listing from the marketplace? It stays in records and can be restored.',
        )
        if (!ok) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="creatorId" value={creatorId} />
      <input type="hidden" name="status" value={nextStatus} />
      <button
        type="submit"
        className={
          'font-mono text-[11px] uppercase tracking-[0.16em] border-b pb-0.5 transition-colors ' +
          (removed
            ? 'border-brand-gold text-brand-gold-dark hover:text-brand-gold'
            : 'border-red-700/40 text-red-700 hover:border-red-700')
        }
      >
        {removed ? 'Restore' : 'Remove'}
      </button>
    </form>
  )
}
