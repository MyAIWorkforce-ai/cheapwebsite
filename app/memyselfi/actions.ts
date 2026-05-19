'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  createAccount,
  findAccountByEmail,
  getTwinByOwner,
  handleTaken,
  upsertTwin,
} from '@/lib/memyselfi/store'
import {
  hashPassword,
  verifyPassword,
  setSession,
  clearSession,
  currentAccount,
} from '@/lib/memyselfi/auth'
import { buildTwin, sanitizeHandle, type TwinInput } from '@/lib/memyselfi/shape'
import { allTwinHandles } from '@/lib/memyselfi/twins'

export type AuthState = { error?: string }

const RESERVED = new Set([
  'create', 'login', 'signup', 'logout', 'account', 'pricing', 'manifesto',
  'how-it-works', 'api', 'admin', 'about', 'help', 'terms', 'privacy',
  ...allTwinHandles(),
])

export async function signup(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const name = String(formData.get('name') ?? '').trim()

  if (!email || !email.includes('@')) return { error: 'Enter a valid email.' }
  if (password.length < 8)
    return { error: 'Password needs at least 8 characters.' }
  if (!name) return { error: 'Tell us your name.' }

  if (await findAccountByEmail(email))
    return { error: 'An account with that email already exists. Log in instead.' }

  const { hash, salt } = hashPassword(password)
  const account = await createAccount({
    email,
    name,
    passwordHash: hash,
    salt,
  })
  setSession(account.id)
  redirect('/memyselfi/account')
}

export async function login(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  if (!email || !password) return { error: 'Email and password required.' }

  const account = await findAccountByEmail(email)
  if (!account || !verifyPassword(password, account.passwordHash, account.salt))
    return { error: 'Wrong email or password.' }

  setSession(account.id)
  redirect('/memyselfi/account')
}

export async function logout() {
  clearSession()
  redirect('/memyselfi')
}

export type SaveState = { error?: string }

export async function saveTwin(
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const account = await currentAccount()
  if (!account) redirect('/memyselfi/signup?next=create')

  let facts: { topic: string; answer: string }[] = []
  try {
    facts = JSON.parse(String(formData.get('facts') ?? '[]'))
  } catch {
    facts = []
  }

  const input: TwinInput = {
    name: String(formData.get('name') ?? '').trim(),
    handle: String(formData.get('handle') ?? '').trim(),
    role: String(formData.get('role') ?? '').trim(),
    location: String(formData.get('location') ?? '').trim(),
    tagline: String(formData.get('tagline') ?? '').trim(),
    bio: String(formData.get('bio') ?? '').trim(),
    accent: String(formData.get('accent') ?? '#8C7BFF'),
    voice: String(formData.get('voice') ?? '').trim(),
    facts: Array.isArray(facts) ? facts : [],
  }

  if (!input.name) return { error: 'Your twin needs a name.' }
  const handle = sanitizeHandle(input.handle || input.name)
  if (handle.length < 2)
    return { error: 'Pick a handle with at least 2 characters.' }
  if (RESERVED.has(handle))
    return { error: `“${handle}” is reserved. Try another handle.` }
  if (input.facts.filter((f) => f.topic && f.answer).length < 2)
    return { error: 'Add at least two things your twin should know.' }

  // One twin per account: if the user already has one, we move it to the
  // new handle rather than orphaning the old page.
  const existing = await getTwinByOwner(account.id)
  if (await handleTaken(handle, account.id))
    return { error: `“${handle}” is taken. Pick another.` }

  const twin = buildTwin({ ...input, handle })
  await upsertTwin({
    ...twin,
    ownerId: account.id,
    visibility: 'public',
    updatedAt: new Date().toISOString(),
  })

  if (existing && existing.handle !== handle)
    revalidatePath(`/memyselfi/${existing.handle}`)
  revalidatePath(`/memyselfi/${handle}`)
  redirect(`/memyselfi/${handle}?new=1`)
}
