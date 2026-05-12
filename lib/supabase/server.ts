import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env, hasSupabase } from '@/lib/env'

// Server-side Supabase client for Server Components, Route Handlers, Server Actions.
// Reads + writes the Supabase auth cookies via next/headers.
export function createClient() {
  const cookieStore = cookies()
  return createServerClient(env.supabase.url, env.supabase.anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch {
          // Called from a Server Component — cookies are read-only.
          // The middleware will refresh the session instead.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch {
          // See above.
        }
      },
    },
  })
}

// Service-role client for privileged ops (webhooks, admin tasks).
// Bypasses RLS. Never expose to the browser.
export function createServiceClient() {
  if (!env.supabase.url || !env.supabase.serviceRoleKey) {
    throw new Error('Supabase service-role credentials missing')
  }
  return createServerClient(env.supabase.url, env.supabase.serviceRoleKey, {
    cookies: {
      get() {
        return undefined
      },
      set() {},
      remove() {},
    },
  })
}

export { hasSupabase }
