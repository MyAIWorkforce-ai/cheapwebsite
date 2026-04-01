import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  try {
    const { data, error } = await supabase
      .from('website_orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ orders: [], error: error.message })
    }

    return NextResponse.json({ orders: data || [] })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ orders: [], error: message })
  }
}
