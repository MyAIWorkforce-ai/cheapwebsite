'use server'

import { revalidatePath } from 'next/cache'
import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

export type DisconnectState = { error?: string; info?: string }
export type WiseSetupState = { error?: string; info?: string }

/**
 * Unlink the creator's Stripe Connect account from their Skillzy
 * profile so they can connect a different one. This does NOT delete
 * or close the Stripe account itself — it just clears the link on our
 * side (stripe_account_id + stripe_payouts_enabled). New sales stop
 * routing to the old account immediately; the creator reconnects to
 * pick a new destination.
 */
export async function disconnectStripe(): Promise<DisconnectState> {
  if (!hasSupabase) return { error: 'Demo mode — Stripe is not configured.' }
  const user = await getUser()
  if (!user) return { error: 'Sign in first.' }

  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({ stripe_account_id: null, stripe_payouts_enabled: false })
      .eq('id', user.id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/payouts')
    return { info: 'Stripe disconnected. Connect a new account to keep selling.' }
  } catch (err) {
    return { error: (err as Error).message }
  }
}

/**
 * Save (or update) the creator's Wise payout details. The alternative
 * to Stripe Connect for creators in countries Stripe doesn't reach.
 *
 * Money flow: sales on this creator's listings stay on Skillzy's
 * platform Stripe balance (no transfer_data.destination). A nightly
 * cron sums pending purchases per creator and, once balance ≥ $50 USD,
 * fires a Wise API transfer to the recipient stored here. Individual
 * purchase rows track their own payout_status.
 *
 * We accept EITHER a Wise account email (simplest — Wise auto-routes
 * to the linked bank) OR raw local bank details. Country-specific bank
 * fields are stashed as jsonb so we don't have to migrate every time
 * we support a new corridor. Setting the method to 'wise' also clears
 * any leftover Stripe Connect link — a creator only has one active
 * payout method at a time to avoid split-brain sale routing.
 */
export async function saveWiseDetails(
  _prev: WiseSetupState,
  formData: FormData,
): Promise<WiseSetupState> {
  if (!hasSupabase) return { error: 'Demo mode — payouts are not configured.' }
  const user = await getUser()
  if (!user) return { error: 'Sign in first.' }

  const name = String(formData.get('name') ?? '').trim()
  const country = String(formData.get('country') ?? '')
    .trim()
    .toUpperCase()
  const currency = String(formData.get('currency') ?? '')
    .trim()
    .toUpperCase()
  const email = String(formData.get('wise_email') ?? '').trim().toLowerCase()
  const bankAccount = String(formData.get('bank_account') ?? '').trim()
  const bankIfsc = String(formData.get('bank_ifsc') ?? '').trim().toUpperCase()
  const bankIban = String(formData.get('bank_iban') ?? '').trim().toUpperCase()
  const bankOther = String(formData.get('bank_other') ?? '').trim()

  if (!name) return { error: 'Enter your full legal name (as on your bank).' }
  if (!country || country.length !== 2)
    return { error: 'Pick your country.' }
  if (!currency || currency.length !== 3)
    return { error: 'Pick a payout currency.' }
  if (!email && !bankAccount && !bankIban && !bankOther)
    return {
      error:
        'Give us either your Wise account email OR your bank details so we can pay you.',
    }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: 'That Wise email doesn’t look right.' }

  // Only save the fields the creator actually filled in — no null
  // clobbering of the columns we don't touch. jsonb bank blob is
  // country-flexible so we don't have to schema-migrate per corridor.
  const details: Record<string, string> = {}
  if (bankAccount) details.account_number = bankAccount
  if (bankIfsc) details.ifsc_code = bankIfsc
  if (bankIban) details.iban = bankIban
  if (bankOther) details.other = bankOther

  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({
        payout_method: 'wise',
        wise_recipient_name: name,
        wise_recipient_country: country,
        wise_recipient_currency: currency,
        wise_recipient_email: email || null,
        wise_recipient_details: Object.keys(details).length ? details : null,
        // Clearing the Wise recipient ID forces the cron to re-create
        // it against the current details next payout — avoids paying
        // out to a stale Wise recipient after the creator edits fields.
        wise_recipient_id: null,
        payout_method_updated_at: new Date().toISOString(),
        // Clear any leftover Stripe Connect link so sale routing has
        // one unambiguous method to check.
        stripe_account_id: null,
        stripe_payouts_enabled: false,
      })
      .eq('id', user.id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/payouts')
    revalidatePath('/dashboard')
    return {
      info:
        'Wise payout details saved. Sales now accrue against your account — payout when balance crosses US$50.',
    }
  } catch (err) {
    return { error: (err as Error).message }
  }
}

/**
 * Clear the creator's Wise payout details and flip them back to
 * 'no method set'. Doesn't touch pending accrued balance — those
 * rows keep their payout_status so nothing gets lost.
 */
export async function disconnectWise(): Promise<WiseSetupState> {
  if (!hasSupabase) return { error: 'Demo mode — Wise is not configured.' }
  const user = await getUser()
  if (!user) return { error: 'Sign in first.' }

  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({
        payout_method: null,
        wise_recipient_name: null,
        wise_recipient_country: null,
        wise_recipient_currency: null,
        wise_recipient_email: null,
        wise_recipient_details: null,
        wise_recipient_id: null,
      })
      .eq('id', user.id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/payouts')
    return { info: 'Wise disconnected. Set up a new payout method to keep selling.' }
  } catch (err) {
    return { error: (err as Error).message }
  }
}
