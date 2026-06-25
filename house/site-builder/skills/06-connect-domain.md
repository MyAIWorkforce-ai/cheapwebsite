---
name: site-connect-domain
description: Wire a custom domain to the Vercel (or Netlify / Cloudflare Pages) deployment. Handles every common registrar's DNS UI. Ensures HTTPS, HSTS, CDN, redirects, and the apex / www decision are all sound.
allowed_platforms: [claude, openclaw, chatgpt]
tools: []
---

# Connect a custom domain

## Your job

Get the user's domain pointing at the deployment so it's live at
`theirdomain.com` instead of `<project>.vercel.app`. Walk every
DNS click. Confirm HTTPS provisions. Set redirects + canonicals
sanely.

## Step 0 — pick or buy the domain

### Branch A — they have a domain

Skip to step 1.

### Branch B — they need to register

Confirm:
- **TLD** (`.com`, `.com.au`, `.co.nz`, `.co.uk`, `.ca`, `.us`)
- **Region requirements** (see regional reference):
  - `.com.au` / `.net.au` — ABN required (Vercel Domains does NOT
    sell .au TLDs)
  - `.ca` — Canadian Presence Requirement (CIRA verifies)
  - `.us` — US nexus required
- **Budget** — `.com` ~$10-15/yr; `.com.au` ~$15-25/yr; `.ca`
  ~$15-20/yr

Recommended registrars by TLD:

| TLD | Default registrar | Notes |
|---|---|---|
| `.com`, `.net`, `.org` | **Cloudflare Registrar** | At-cost pricing, sane DNS, no upsells |
| `.com.au`, `.net.au`, `.au` | **VentraIP** or **Crucial** | AU-local; ABN-aware |
| `.co.nz`, `.nz` | **SiteHost** or **1st Domains** | NZ-local |
| `.co.uk`, `.uk` | **Cloudflare** (now sells .uk) or **123-reg** | Cloudflare's at-cost prices apply |
| `.ca` | **Cloudflare** or **Hover** | Both verify CPR |
| `.us` | **Cloudflare** or **Porkbun** | Both verify US nexus |
| Vanity TLDs (.io, .ai, .dev, .app, .co) | **Porkbun** or **Cloudflare** | Porkbun cheapest for vanity |

Avoid by default: **GoDaddy** (aggressive upsells, dated DNS UI),
**Network Solutions** (overpriced, dated).

#### To register

Walk the user through:

1. Open the registrar's site
2. Search the domain
3. Add to cart, decline any upsells (whois proxy is often free or
   cheap — keep it on for privacy; everything else: decline)
4. Pay
5. Confirm ownership via the verification email if asked

For `.com.au`: the registrar will ask for ABN — enter it. The
registry (auDA) validates within ~10 mins.

For `.ca`: pick the CIRA presence type (citizen, permanent resident,
corp, trademark, etc.).

## Step 1 — add the domain in Vercel

Walk them through:

1. Open the Vercel project dashboard
2. Click **Settings** → **Domains**
3. Type the domain (`acmeplumbing.com.au`) and click **Add**
4. Vercel shows DNS records they need to set

Vercel may show two options depending on whether they're using
the apex (`acmeplumbing.com.au`) or a subdomain
(`www.acmeplumbing.com.au`).

### Records you'll typically see

**For the apex domain (acmeplumbing.com.au):**
```
Type: A      Name: @      Value: 76.76.21.21
```

**For www subdomain (www.acmeplumbing.com.au):**
```
Type: CNAME  Name: www    Value: cname.vercel-dns.com
```

Some registrars don't support CNAME at apex (DNS standards forbid
it), so Vercel uses an A record there.

### Decide: apex or www as primary?

- **Apex (`acmeplumbing.com.au` primary)** — modern default,
  cleaner. Redirect `www → apex`.
- **www (`www.acmeplumbing.com.au` primary)** — old-school,
  necessary if the buyer's existing brand has the www in print/
  signage.

Pick one and **301-redirect the other**. Vercel handles this if you
add both domains and set a primary.

Get the buyer to pick. Default to apex.

## Step 2 — set the DNS at the registrar

Ask: *"Who's your domain registered with?"*

Then give registrar-specific steps. The general shape is the same
everywhere; the UI differs.

### Cloudflare

1. `dash.cloudflare.com` → pick the domain
2. Sidebar → **DNS** → **Records**
3. Click **Add record**
4. For apex:
   - Type: `A`
   - Name: `@`
   - IPv4 address: `76.76.21.21`
   - Proxy status: **DNS only** (grey cloud) — important: orange-
     cloud proxied breaks Vercel SSL provisioning the first time
5. For www:
   - Type: `CNAME`
   - Name: `www`
   - Target: `cname.vercel-dns.com`
   - Proxy status: **DNS only** initially
6. Save

After SSL is provisioned (~5 mins), the buyer can switch to
proxied (orange cloud) if they want Cloudflare CDN. For most
Next.js + Vercel setups, leave DNS-only — Vercel's CDN is already
fast.

### Namecheap

1. `ap.www.namecheap.com` → Domain List → Manage
2. Tab: **Advanced DNS**
3. Click **Add new record**
4. For apex: Type `A Record`, Host `@`, Value `76.76.21.21`,
   TTL Automatic
5. For www: Type `CNAME Record`, Host `www`, Value
   `cname.vercel-dns.com`, TTL Automatic
6. If there are existing A or CNAME records on `@` or `www`,
   delete them (they conflict)
7. Save

### Porkbun

1. `porkbun.com/account/domainsSpeedy` → pick domain → **Details**
2. Tab: **DNS Records**
3. Add records same as above

### GoDaddy

1. `account.godaddy.com` → DNS → Manage
2. For apex A record: edit the existing `@` A record (don't add new)
   to `76.76.21.21`
3. For www: edit or add `CNAME` `www` → `cname.vercel-dns.com`
4. Remove any old "park" records GoDaddy auto-created
5. Save (changes can take ~1 hour with GoDaddy specifically)

### Squarespace Domains (was Google Domains)

1. Squarespace dashboard → Domains → pick the domain → **DNS
   Settings**
2. Custom records → Add
3. For apex: `A` `@` `76.76.21.21`
4. For www: `CNAME` `www` `cname.vercel-dns.com.`
5. Save

### Crazy Domains (AU)

1. `www.crazydomains.com.au/members/` → Domains → Manage
2. **DNS Management** → edit zone
3. Add A record `@` `76.76.21.21`
4. Add CNAME `www` `cname.vercel-dns.com`
5. Save

### VentraIP (AU)

1. `vip.ventraip.com.au` → My Services → Domains → Manage
2. **DNS Records**
3. A record `@` `76.76.21.21`; CNAME `www` `cname.vercel-dns.com`
4. Save

### 123-reg (UK)

1. `www.123-reg.co.uk` → Control Panel → Manage DNS
2. Add A record `@` `76.76.21.21`
3. Add CNAME `www` `cname.vercel-dns.com.` (trailing dot matters)
4. Save

### NameSilo

1. `www.namesilo.com/account_domains.php` → Manage DNS
2. Edit / add A + CNAME as above
3. Save

### 101domain (multi-region)

1. Account → Domains → Manage → DNS Zone Editor
2. A + CNAME as above

### Vercel Domains (registered through Vercel)

DNS auto-wires. Skip this step.

## Step 3 — wait for DNS propagation

Tell the buyer:

> DNS can take 5 minutes to 24 hours. Usually under 30 minutes
> from most registrars; GoDaddy and some legacy AU registrars can
> be slower. Vercel auto-provisions HTTPS once DNS resolves — no
> action needed from you.

Watch the Vercel dashboard:
- Vercel → Settings → Domains
- The domain shows "Configuring..." → "Valid Configuration" → SSL
  provisions automatically

If after 30 mins it's still "Invalid Configuration":

1. Check propagation: `dnschecker.org` → enter the domain → A
   record should return `76.76.21.21` globally
2. If not, the registrar didn't save the record — go back and
   confirm
3. If it shows different values from the past (old A record), TTL
   may be holding the old cache — wait it out (TTL 3600 = 1 hour
   max)

## Step 4 — verify HTTPS + redirects

After ~10 minutes, ask the user to:

1. Visit `https://theirdomain.com` (note the `https`)
2. Confirm the site loads
3. Confirm the padlock icon is there (HTTPS active)
4. Confirm `http://theirdomain.com` (no s) auto-redirects to https
5. Confirm `www.theirdomain.com` redirects to apex (or vice versa
   depending on primary choice)
6. Confirm the `.vercel.app` URL still works as a fallback

If HTTPS is broken (padlock crossed out):
- Most common: a stale TLS cert from a previous host
- Fix: in Vercel → Settings → Domains → click "Refresh" on the
  domain. Vercel re-requests Let's Encrypt
- If still failing after 1 hour, check CAA records (next section)

## Step 5 — set up redirects

### www → apex (or apex → www)

In Vercel → Settings → Domains, after adding both domains, click
the non-primary one → set as redirect to the primary. 301
permanent.

### Old domain → new domain (if migrating)

If the buyer's switching from an old domain:

1. Add the old domain in Vercel too
2. Add DNS at the old registrar pointing at Vercel
3. Set the old domain to redirect to the new one (301)
4. Keep the old domain renewed for at least 12 months — let
   Google re-index

### Per-URL redirects (from old site to new sitemap)

If the IA changed URLs (from skill 02), set them up in
`next.config.js`:

```js
module.exports = {
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/services/plumbing', destination: '/services', permanent: true },
      { source: '/old-blog-slug', destination: '/blog/new-slug', permanent: true },
    ]
  },
}
```

Commit, push. Vercel redeploys with the new redirects.

## Step 6 — security headers

In `next.config.js`, add baseline security headers — bake this in
so launch checklist doesn't have to retrofit:

```js
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

- **HSTS (`Strict-Transport-Security`)**: locks the browser to HTTPS
  for 2 years. Don't add `preload` until you're confident you'll
  stay HTTPS-only — preload is hard to undo.
- **Permissions-Policy**: locks unused browser APIs (camera, mic,
  location).
- **CSP (Content Security Policy)**: skipped here because it
  conflicts with most analytics/consent tools. Add it in skill 11
  after all third-party scripts are known.

## CAA records (when HTTPS won't provision)

If after 1 hour HTTPS still isn't working, check the CAA record:

```bash
dig CAA theirdomain.com
```

If a CAA record exists naming a different CA (e.g. Sectigo from a
past cert), Vercel's Let's Encrypt can't issue. Fix:

1. Go to DNS at the registrar
2. Find CAA records
3. Either delete them OR add: `0 issue "letsencrypt.org"` and
   `0 issue "pki.goog"`
4. Wait 10 mins, click Refresh in Vercel

## Cloudflare as the DNS / CDN

If the buyer wants to keep Cloudflare in front (for caching, DDoS
protection, free SSL across subdomains):

1. Domain is at any registrar
2. In Cloudflare → Add Site → enter domain → free plan
3. Cloudflare shows nameservers — change them at the registrar
   (this is registrar-specific; usually under "Nameservers")
4. Wait ~24 hours for nameserver propagation
5. In Cloudflare DNS, add the Vercel A + CNAME records (DNS-only
   initially)
6. Once HTTPS provisions in Vercel, switch to Proxied (orange
   cloud)

Trade-offs of Cloudflare proxied:
- **Pro:** edge cache, DDoS shielding, free SSL, easy CDN purge
- **Con:** masks real visitor IP (for IP-based form spam filtering),
  adds a hop, conflicts with some Vercel features (Edge Config,
  Edge Functions in certain regions)

For most small-biz sites, Cloudflare DNS-only is enough. Vercel
already has a CDN.

## Step 7 — email at the domain (DNS-side)

If the buyer wants `name@theirdomain.com` for email, they need:

- An email provider — **Google Workspace** ($6+/user/mo), **Microsoft
  365** ($6+/user/mo), **Fastmail** ($5+/user/mo), **Zoho Mail**
  (free for 5 users on custom domain)
- DNS records the provider gives — MX, SPF (TXT), DKIM (CNAME or
  TXT), DMARC (TXT)

Add these in the same DNS panel. The provider walks you through
each record. Don't forget:

- **SPF**: `v=spf1 include:_spf.google.com ~all` (for Google
  Workspace example)
- **DKIM**: provider gives a key, add as CNAME or TXT
- **DMARC**: `v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com`

Without SPF + DKIM + DMARC, emails sent from the domain land in
spam.

Skill 06 doesn't set up the email account — only the DNS. The
buyer logs in to the provider to read/send.

## Step 8 — verify it's live

Final checks before declaring done:

1. `https://theirdomain.com` → loads the site, padlock present
2. `http://theirdomain.com` → 301 → `https://theirdomain.com`
3. `https://www.theirdomain.com` → redirects to primary (or vice
   versa)
4. Test from a clean device / incognito: confirms no local
   cache lying
5. `dnschecker.org` shows the A record propagated globally
6. Run `ssllabs.com/ssltest/` on the domain — expect A or A+ grade
   (Vercel + Let's Encrypt + HSTS gives A+)
7. Run `securityheaders.com` on the domain — expect A grade once
   the security headers above are committed

## Common DNS gotchas (from learnings.md)

- **Cloudflare proxied breaks first-time Vercel SSL.** Set DNS-only
  (grey cloud) for the initial connection. Switch to proxied later
  if you want.
- **ANAME / ALIAS at apex.** Some registrars don't support them.
  Fall back to A record with `76.76.21.21`.
- **CAA records blocking Let's Encrypt.** Old cert provider's CAA
  record blocks new issuer. Delete or whitelist `letsencrypt.org`.
- **TTL too high.** If TTL was 86400 (24h) before changes, takes
  24h to propagate. Lower TTL to 300 a day before changing the
  record (forward planning).
- **`@` vs blank vs the domain name itself in record name field.**
  Registrar UIs vary. Try `@` first; if rejected, try blank; if
  rejected, try the literal domain.
- **Missing trailing dot on CNAME (`cname.vercel-dns.com.`).**
  Some registrars require the trailing dot to mark fully-qualified.
- **`.com.au` and Vercel Domains.** Vercel doesn't sell `.com.au`.
  Register at an AU registrar first, then point DNS at Vercel.

## Hard rules

- **Never destroy old DNS records without snapshotting first.**
  Take a screenshot or copy/paste before clicking save.
- **HTTPS or bust.** Don't ship the buyer onto HTTP. If SSL won't
  provision, debug — don't fall back.
- **One redirect rule, not chains.** Don't have `/old1 → /old2 →
  /new`. Go straight to `/new`.
- **301, not 302.** Permanent, not temporary. Search engines treat
  them very differently.
- **HSTS preload is hard to undo.** Don't enable preload until
  you're sure of HTTPS-only for the long term.
- **DNS changes are mostly reversible, but slow.** Confirm twice
  before saving.

## Done condition

You're done with this skill when:
- `https://theirdomain.com` loads the site with HTTPS padlock
- `http://` redirects to `https://`
- `www` and apex both work (one as primary, one as redirect)
- `.vercel.app` URL still works as fallback
- SSL grade A or A+
- Old-domain redirects (if any) work
- Per-URL redirects (if migrating IA) work
- DNS records documented in conversation context (or in repo
  `dns.md`)
- Email DNS records added (if buyer wanted email at domain)
- Security headers committed and live

When done, say:
> *"Domain live. Moving to on-page SEO so people can actually
> find it."*

Then load `07-seo-onpage.md`.
