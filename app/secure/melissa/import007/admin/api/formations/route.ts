import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/admin/formations - Récupérer toutes les formations
export async function GET() {
  try {
    const { data: formations, error } = await supabaseAdmin
      .from('formations')
      .select(`
        *,
        formation_inscriptions(count)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(formations)
  } catch (error) {
    console.error('Erreur lors de la récupération des formations:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des formations' },
      { status: 500 }
    )
  }
}

// POST /api/admin/formations - Créer une nouvelle formation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      type,
      location,
      date,
      time,
      price,
      currency,
      promoCode,
      discount,
      maxParticipants
    } = body

    // Validation des données
    if (!title || !date || !price || !currency || !maxParticipants) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    const { data: formation, error } = await supabaseAdmin
      .from('formations')
      .insert({
        title,
        type,
        location,
        date,
        time,
        price,
        currency,
        promo_code: promoCode,
        discount,
        max_participants: maxParticipants,
        status: 'active'
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(formation, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création de la formation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la formation' },
      { status: 500 }
    )
  }
}
