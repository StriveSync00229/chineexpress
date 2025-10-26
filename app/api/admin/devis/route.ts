import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data: quotes, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('type', 'devis')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(quotes || [])
  } catch (error) {
    console.error('Erreur lors de la récupération des devis:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des devis' },
      { status: 500 }
    )
  }
}
