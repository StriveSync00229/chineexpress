import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data: formations, error } = await supabase
      .from('formations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(formations || [])
  } catch (error) {
    console.error('Erreur lors de la récupération des formations:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des formations' },
      { status: 500 }
    )
  }
}

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

    const supabase = createAdminClient()
    const { data: formation, error } = await supabase
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
        status: 'active' as const
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