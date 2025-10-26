import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createAdminClient()

    // Récupérer tous les contacts depuis la table unifiée submissions
    const { data: submissions, error } = await supabase
      .from('submissions')
      .select('status')
      .eq('type', 'contact')

    if (error) throw error

    const totalContacts = submissions?.length || 0
    const pendingContacts = submissions?.filter(s => s.status === 'pending')?.length || 0
    const processedContacts = submissions?.filter(s => s.status === 'processed')?.length || 0

    return NextResponse.json({
      totalContacts,
      totalPending: pendingContacts, // Pour compatibilité avec dashboard principal
      pendingContacts,
      processedContacts
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques contacts:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    )
  }
}
