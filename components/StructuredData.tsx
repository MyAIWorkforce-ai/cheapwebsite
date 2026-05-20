// Injects one or more JSON-LD blocks. Server component — renders a
// plain <script> tag, no client JS. Pass any number of schema objects.
export default function StructuredData({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[]
}) {
  const blocks = Array.isArray(data) ? data : [data]
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is safe here — no user-controlled
          // HTML, and we escape the closing-script edge case.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  )
}
