import Script from 'next/script'

// Google Analytics (GA4) + Google Ads conversion-tracking loader.
//
// Reads two env vars (both public, both optional):
//   NEXT_PUBLIC_GA_MEASUREMENT_ID   e.g. "G-XXXXXXXXXX"
//   NEXT_PUBLIC_GOOGLE_ADS_ID       e.g. "AW-123456789"
//
// Either/both can be set — the script configures every ID it finds.
// When NEITHER is set, this component renders nothing (safe no-op
// for local dev and preview deploys that shouldn't pollute the
// production analytics).
//
// The tags share a single gtag.js load. Conversion firing from app
// code is done via the helpers in lib/analytics.ts.
export default function GoogleTags() {
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()
  const ads = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim()
  const ids = [ga, ads].filter((v): v is string => Boolean(v))

  if (ids.length === 0) return null

  // Load gtag.js using the FIRST id — Google's loader accepts any,
  // we then call config() for each so both tags live side-by-side.
  const loadId = ids[0]
  const configCalls = ids
    .map(
      (id) =>
        `gtag('config', '${id}', { send_page_view: true, anonymize_ip: true });`,
    )
    .join('\n')

  return (
    <>
      <Script
        id="gtag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${loadId}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
${configCalls}
          `,
        }}
      />
    </>
  )
}
