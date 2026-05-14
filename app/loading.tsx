// Root loading UI. Shown briefly while a server-rendered route is
// streaming. Deliberately quiet — a thin gold pulse along the top.
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="paper min-h-screen relative"
    >
      <span className="sr-only">Loading…</span>
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
        <div className="h-full w-1/3 bg-brand-gold animate-pulse" />
      </div>
    </div>
  )
}
