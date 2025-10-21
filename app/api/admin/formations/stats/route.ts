import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    const { data: formations, error } = await supabase
      .from('formations')
      .select('id, status, formation_inscriptions(status, amount)')

    if (error) throw error

    const totalFormations = formations.length
    const totalInscriptions = formations.reduce((acc: number, formation: any) =>
      acc + (formation.formation_inscriptions?.length || 0), 0
    )
    const totalPaidInscriptions = formations.reduce((acc: number, formation: any) =>
      acc + (formation.formation_inscriptions?.filter((i: any) => i.status === 'paid').length || 0), 0
    )
    const totalRevenue = formations.reduce((acc: number, formation: any) =>
      acc + (formation.formation_inscriptions?.filter((i: any) => i.status === 'paid')
        .reduce((sum: number, i: any) => sum + (i.amount || 0), 0) || 0), 0
    )

    return NextResponse.json({
      totalFormations,
      totalInscriptions,
      totalPaidInscriptions,
      totalRevenue
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    )
  }
}
