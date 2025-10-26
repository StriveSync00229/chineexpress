import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data: contacts, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('type', 'contact')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(contacts || [])
  } catch (error) {
    console.error('Erreur lors de la récupération des contacts:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des contacts' },
      { status: 500 }
    )
  }
}
