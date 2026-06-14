---
name: site-connect-domain
description: Wire a custom domain to the Vercel deployment. Handles either an existing domain at any registrar OR registering a new one via Vercel Domains.
allowed_platforms: [claude, openclaw, chatgpt]
tools: []
---

# Connect a custom domain

## Your job

Get the user's domain pointing at the Vercel deployment so it's live
at `theirdomain.com` instead of `<project>.vercel.app`.

## Branch one — they have a domain

### 1. Add it in Vercel

Walk them through:
1. Open the Vercel project dashboard
2. Click **Settings** → **Domains**
3. Type their domain (`acmeplumbing.com.au`) and click **Add**
4. Vercel shows DNS records they need to set

Copy the exact records Vercel shows. They look like one of:

**Option A — A records (apex domain like `acmeplumbing.com.au`):**
```
Type: A     Name: @     Value: 76.76.21.21
```

**Option B — CNAME (subdomain like `www.acmeplumbing.com.au`):**
```
Type: CNAME     Name: www     Value: cname.vercel-dns.com
```

### 2. Set the DNS at the registrar

Ask: *"Who's your domain registered with? (GoDaddy, Cloudflare,
Namecheap, Porkbun, other?)"*

Give registrar-specific steps based on their answer. The general
shape is the same everywhere:

1. Log in to the registrar
2. Find the domain → DNS / Nameservers / Manage DNS
3. Add the exact records Vercel showed
4. Save

Warn them: DNS propagation can take 5 minutes to 24 hours. Usually
under 30 minutes. Vercel auto-provisions HTTPS once DNS resolves —
nothing they need to do.

### 3. Verify it's live

After ~10 minutes, ask the user to:
- Visit `https://theirdomain.com` (note the `https`)
- Confirm the site loads
- Confirm the padlock icon is there (HTTPS is working)

If not yet live, that's normal. Tell them to come back in 30 minutes
and try again. If still not after 2 hours, troubleshoot via
`https://dnschecker.org` — show them how to check propagation.

## Branch two — they need a domain

### 1. Suggest options

If they don't have a domain, recommend buying through **Vercel
Domains**. Why: it auto-wires DNS, no separate registrar to manage.

Walk them through:
1. Vercel project → Settings → Domains
2. Click **Buy Domain**
3. Search the name they want
4. Pick a `.com`, `.com.au`, etc. — confirm the price (usually
   $10–$25/year)
5. Stop and confirm the user wants to spend the money before they
   click Purchase
6. After purchase, Vercel auto-attaches the domain — done

### 2. If they want a different registrar

Common reasons: cheaper, existing account they want to consolidate.
Recommend **Cloudflare Registrar** — at-cost pricing, no upsells.
Steps:
1. `cloudflare.com/products/registrar/` → search + register
2. Then follow Branch one above to set DNS

## Done condition

- `https://theirdomain.com` loads the site
- HTTPS is active (padlock)
- The `.vercel.app` URL still works as a fallback

When done, say: *"Domain live. Moving to SEO so people can actually
find it."* and load `05-seo.md`.
