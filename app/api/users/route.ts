import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('name')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ users })
  } catch (err) {
    console.error('Error fetching users:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 