import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

export type SessionUser = {
  id: string
  email: string
  name?: string
  handle?: string
  avatar?: string
}

// Returns the signed-in user, or null in any of these cases:
//  - Supabase env vars are missing (demo mode)
//  - The visitor has no session
export async function getUser(): Promise<SessionUser | null> {
  if (!hasSupabase) return null
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user || !user.email) return null
    return {
      id: user.id,
      email: user.email,
      name:
        (user.user_metadata?.name as string | undefined) ||
        user.email.split('@')[0],
      handle:
        (user.user_metadata?.user_name as string | undefined) ||
        (user.user_metadata?.preferred_username as string | undefined),
      avatar: user.user_metadata?.avatar_url as string | undefined,
    }
  } catch {
    return null
  }
}
