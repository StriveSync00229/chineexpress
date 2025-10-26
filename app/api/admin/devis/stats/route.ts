import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data: quotes, error } = await supabase
      .from('submissions')
      .select('status')
      .eq('type', 'devis')

    if (error) throw error

    const totalQuotes = quotes?.length || 0
    const pendingQuotes = quotes?.filter(q => q.status === 'pending')?.length || 0
    const quotedQuotes = quotes?.filter(q => q.status === 'quoted')?.length || 0
    const completedQuotes = quotes?.filter(q => q.status === 'completed')?.length || 0

    return NextResponse.json({
      totalQuotes,
      pendingQuotes,
      quotedQuotes,
      completedQuotes
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques devis:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    )
  }
}

