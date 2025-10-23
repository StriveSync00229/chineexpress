import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // Récupérer les statistiques des formations
    const { data: formations, error: formationsError } = await supabaseAdmin
      .from('formations')
      .select('id, status, formation_inscriptions(status, amount)')

    if (formationsError) throw formationsError

    const totalFormations = formations.length
    const totalInscriptions = formations.reduce((acc, formation) =>
      acc + (formation.formation_inscriptions?.length || 0), 0
    )
    const totalPaidInscriptions = formations.reduce((acc, formation) =>
      acc + (formation.formation_inscriptions?.filter(i => i.status === 'paid').length || 0), 0
    )
    const totalRevenue = formations.reduce((acc, formation) =>
      acc + (formation.formation_inscriptions?.filter(i => i.status === 'paid')
        .reduce((sum, i) => sum + (i.amount || 0), 0) || 0), 0
    )

    return NextResponse.json({
      totalFormations,
      totalInscriptions,
      totalPaidInscriptions,
      totalRevenue
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    )
  }
}