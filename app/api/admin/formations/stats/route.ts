import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data: formations, error } = await supabase
      .from('formations')
      .select('id, status, formation_inscriptions(status, amount)')

    if (error) throw error

    const totalFormations = formations?.length || 0
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
