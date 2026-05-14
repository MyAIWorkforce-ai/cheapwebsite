import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { env, hasSupabase } from '@/lib/env'

// Refresh the user's session on every request. Run from middleware.ts.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  if (!hasSupabase) return response

  const supabase = createServerClient(env.supabase.url, env.supabase.anonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options })
        response = NextResponse.next({ request })
        response.cookies.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '', ...options })
        response = NextResponse.next({ request })
        response.cookies.set({ name, value: '', ...options })
      },
    },
  })

  // Touch the session — refresh tokens if needed.
  await supabase.auth.getUser()
  return response
}
