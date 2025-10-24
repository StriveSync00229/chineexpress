import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data: formations, error } = await supabase
      .from('formations')
      .select('*')
      .eq('status', 'active' as const)
      // Supprimer le filtre de date pour afficher toutes les formations actives
      .order('date', { ascending: true })
      .limit(6)

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des formations' },
        { status: 500 }
      )
    }

    return NextResponse.json(formations || [])
  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}