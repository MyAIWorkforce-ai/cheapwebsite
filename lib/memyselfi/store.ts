import 'server-only'
import { hasSupabase, env } from '@/lib/env'
import { createServerClient } from '@supabase/ssr'
import type { Twin } from './twins'

export type Account = {
  id: string
  email: string
  name: string
  passwordHash: string
  salt: string
  createdAt: string
}

export type StoredTwin = Twin & {
  ownerId: string
  visibility: 'public' | 'private'
  updatedAt: string
}

// In-memory fallback so the whole product works without any external service.
// Pinned to globalThis so it survives dev hot-reloads within a session.
type Mem = {
  users: Map<string, Account>
  usersByEmail: Map<string, string>
  twins: Map<string, StoredTwin>
}
const g = globalThis as unknown as { __mmiMem?: Mem }
const mem: Mem =
  g.__mmiMem ??
  (g.__mmiMem = {
    users: new Map(),
    usersByEmail: new Map(),
    twins: new Map(),
  })

// A privileged Supabase client (service role bypasses RLS for server writes).
// Only used when fully configured; otherwise we run on the in-memory store.
function db() {
  if (!hasSupabase || !env.supabase.serviceRoleKey) return null
  return createServerClient(env.supabase.url, env.supabase.serviceRoleKey, {
    cookies: { get: () => undefined, set: () => {}, remove: () => {} },
  })
}

export const usingRealBackend = Boolean(
  hasSupabase && env.supabase.serviceRoleKey,
)

/* ----------------------------- accounts ------------------------------ */

export async function findAccountByEmail(
  email: string,
): Promise<Account | null> {
  const key = email.trim().toLowerCase()
  const sb = db()
  if (sb) {
    const { data } = await sb
      .from('mmi_users')
      .select('*')
      .eq('email', key)
      .maybeSingle()
    return data ? rowToAccount(data) : null
  }
  const id = mem.usersByEmail.get(key)
  return id ? mem.users.get(id) ?? null : null
}

export async function getAccount(id: string): Promise<Account | null> {
  const sb = db()
  if (sb) {
    const { data } = await sb
      .from('mmi_users')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    return data ? rowToAccount(data) : null
  }
  return mem.users.get(id) ?? null
}

export async function createAccount(
  a: Omit<Account, 'id' | 'createdAt'>,
): Promise<Account> {
  const account: Account = {
    ...a,
    email: a.email.trim().toLowerCase(),
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  const sb = db()
  if (sb) {
    await sb.from('mmi_users').insert({
      id: account.id,
      email: account.email,
      name: account.name,
      password_hash: account.passwordHash,
      salt: account.salt,
      created_at: account.createdAt,
    })
  } else {
    mem.users.set(account.id, account)
    mem.usersByEmail.set(account.email, account.id)
  }
  return account
}

function rowToAccount(r: Record<string, unknown>): Account {
  return {
    id: String(r.id),
    email: String(r.email),
    name: String(r.name ?? ''),
    passwordHash: String(r.password_hash),
    salt: String(r.salt),
    createdAt: String(r.created_at),
  }
}

/* ------------------------------- twins ------------------------------- */

export async function getTwinByHandle(
  handle: string,
): Promise<StoredTwin | null> {
  const key = handle.trim().toLowerCase()
  const sb = db()
  if (sb) {
    const { data } = await sb
      .from('mmi_twins')
      .select('*')
      .eq('handle', key)
      .maybeSingle()
    return data ? rowToTwin(data) : null
  }
  return mem.twins.get(key) ?? null
}

export async function getTwinByOwner(
  ownerId: string,
): Promise<StoredTwin | null> {
  const sb = db()
  if (sb) {
    const { data } = await sb
      .from('mmi_twins')
      .select('*')
      .eq('owner_id', ownerId)
      .maybeSingle()
    return data ? rowToTwin(data) : null
  }
  return (
    Array.from(mem.twins.values()).find((t) => t.ownerId === ownerId) ?? null
  )
}

export async function upsertTwin(twin: StoredTwin): Promise<void> {
  const key = twin.handle.trim().toLowerCase()
  const record = { ...twin, handle: key, updatedAt: new Date().toISOString() }
  const sb = db()
  if (sb) {
    await sb.from('mmi_twins').upsert(
      {
        handle: key,
        owner_id: record.ownerId,
        visibility: record.visibility,
        data: record,
        updated_at: record.updatedAt,
      },
      { onConflict: 'handle' },
    )
    return
  }
  // Drop any other handle previously owned by this user (one twin per user).
  Array.from(mem.twins.entries()).forEach(([h, t]) => {
    if (t.ownerId === record.ownerId && h !== key) mem.twins.delete(h)
  })
  mem.twins.set(key, record)
}

export async function handleTaken(
  handle: string,
  exceptOwnerId?: string,
): Promise<boolean> {
  const t = await getTwinByHandle(handle)
  if (!t) return false
  return t.ownerId !== exceptOwnerId
}

function rowToTwin(r: Record<string, unknown>): StoredTwin {
  return r.data as StoredTwin
}
