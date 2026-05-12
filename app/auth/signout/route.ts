import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

export async function POST(request: NextRequest) {
  if (hasSupabase) {
    const supabase = createClient()
    await supabase.auth.signOut()
  }
  return NextResponse.redirect(new URL('/', request.url), { status: 303 })
}
