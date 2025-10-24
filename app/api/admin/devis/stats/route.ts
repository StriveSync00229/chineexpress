import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    const { data: quotes, error } = await supabase
      .from('quote_requests')
      .select('status')

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

