# Skillzy backend setup

Everything is gracefully optional. With no env vars the site runs as a
clickable prototype. Add keys to turn on the real moving parts.

## 1. Local env

```bash
cp .env.example .env.local
```

Fill in the keys below as you wire each service. Restart `npm run dev`
after each change.

## 2. Supabase — auth, DB, file storage

### Project

1. Create a project at https://supabase.com.
2. From **Project settings → API**, copy:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only, never expose)

### Schema

Open **SQL Editor** in Supabase and run `db/schema.sql` (in this repo).
That creates:

- `profiles` (1:1 with `auth.users`, auto-populated by trigger on
  sign-up)
- `listings` with `listing_type` and `listing_status` enums
- `files` (bundle artifacts)
- `purchases` with `purchase_status` enum
- `reviews` (one per purchase)
- `listings_with_rating` view (joins avg rating + count)
- Row Level Security policies for every table

### Storage

In **Storage**, create a **private** bucket named `skillzy-products`.
No public policies. Files are delivered via signed URLs from the
webhook handler.

### Auth providers

In **Authentication → Providers**:

- **Email**: enable; the project uses one-time-link sign-in.
- **GitHub**: enable; create an OAuth app at
  https://github.com/settings/developers and paste client ID/secret.
- **Google** (optional): same flow.

Set the **Site URL** in **Authentication → URL Configuration** to your
deployment, and add `http://localhost:3000` to **Redirect URLs**.

## 3. Stripe — payments + Connect

### Test keys

From https://dashboard.stripe.com/test/apikeys:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Webhook

Create a webhook endpoint at `${NEXT_PUBLIC_SITE_URL}/api/webhooks/stripe`.
Listen for:

- `checkout.session.completed`
- `account.updated`
- `charge.refunded`

Copy the **signing secret** into `STRIPE_WEBHOOK_SECRET`.

Local testing:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

The CLI prints a webhook secret — use that one for local dev.

### Connect

Enable **Stripe Connect** in your account. Skillzy uses **Express**
accounts:

- Creators click "Connect Stripe" from `/dashboard?view=selling` →
  `/api/stripe/connect/start` creates the Express account + onboarding
  link.
- Stripe redirects back to `/dashboard?view=selling&onboarded=1`.
- `account.updated` webhook flips `profiles.stripe_payouts_enabled`.
- Checkout sessions use `payment_intent_data.transfer_data.destination`
  to pay creators directly, with a 20% `application_fee_amount`.

## 4. Resend — transactional email

1. Create an account at https://resend.com.
2. Verify your domain. Until verified, send from a Resend test address
   (set `RESEND_FROM_EMAIL=onboarding@resend.dev` for dev).
3. Copy `RESEND_API_KEY` into env.

The webhook handler sends a purchase-confirmation email on
`checkout.session.completed`. Template lives in
`lib/email/purchase-confirmation.tsx`.

## 5. Optional — seed the catalogue into Supabase

The static `lib/catalog.ts` is the source of truth for the prototype
and serves as a seed. Once you want creator-published listings, run a
seed migration that inserts the 13 sample products into
`public.listings` linked to a system creator profile. Easiest path:
write a one-off SQL script using values from `lib/catalog.ts`.

## 6. Routes wired to the backend

| Route                                    | Behaviour                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------- |
| `/signin`                                | Magic-link email + GitHub + Google. Demo mode without Supabase.                 |
| `/auth/callback`                         | Supabase OAuth + magic-link redirect handler.                                   |
| `/auth/signout` (POST)                   | Clears the session, bounces home.                                               |
| `/checkout/[id]`                         | Posts to `/api/checkout`; redirects to Stripe Checkout, or to `/order/success`. |
| `/api/checkout`                          | Creates a Stripe Checkout Session. 20% application fee + destination charges.   |
| `/api/webhooks/stripe`                   | Records purchases, flips Connect state, marks refunds, sends email.             |
| `/api/stripe/connect/start` (POST)       | Express account + onboarding link for the signed-in creator.                    |
| `/api/stripe/connect/refresh` (GET)      | Stripe sends here if onboarding expires.                                        |
| `/dashboard`                             | Reads purchases (buyer view) and listings (creator view) from Supabase.         |
| `/sell/new`                              | Server action publishes a new listing with `pending_review` status.             |

## 7. What still needs a hand

- Seed Supabase with the 13 catalogue products so detail pages can
  read from DB instead of the static seed.
- Wire the buyer dashboard to actually fetch `purchases` (currently
  uses mock data — see `app/dashboard/page.tsx`).
- Wire the creator dashboard to fetch `listings` from DB for the
  signed-in user.
- File upload UI on `/sell/new` (drag-drop currently mocked).
- Listing edit page for creators.
- Refund button (POST → Stripe + DB).
