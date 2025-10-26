import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

// GET - Récupérer une formation par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createAdminClient()

    const { data: formation, error } = await supabase
      .from('formations')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Formation non trouvée' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json(formation)
  } catch (error) {
    console.error('Erreur lors de la récupération de la formation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la formation' },
      { status: 500 }
    )
  }
}

// PATCH - Mettre à jour une formation
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      maxParticipants,
      imageUrl,
      status
    } = body

    // Validation des données
    if (!title || !date || !price || !currency || !maxParticipants) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    // Validation du prix
    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
      return NextResponse.json(
        { error: 'Prix invalide' },
        { status: 400 }
      )
    }

    if (price > 9999999999999.99) {
      return NextResponse.json(
        { error: 'Le prix ne peut pas dépasser 9,999,999,999,999.99' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Vérifier que la formation existe
    const { data: existingFormation, error: fetchError } = await supabase
      .from('formations')
      .select('id')
      .eq('id', id)
      .single()

    if (fetchError || !existingFormation) {
      return NextResponse.json(
        { error: 'Formation non trouvée' },
        { status: 404 }
      )
    }

    // Mettre à jour la formation
    const { data: formation, error } = await supabase
      .from('formations')
      .update({
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
        image_url: imageUrl,
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(formation)
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la formation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la formation' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une formation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createAdminClient()

    // Vérifier s'il y a des inscriptions
    const { data: inscriptions, error: inscriptionsError } = await supabase
      .from('formation_inscriptions')
      .select('id')
      .eq('formation_id', id)

    if (inscriptionsError) throw inscriptionsError

    if (inscriptions && inscriptions.length > 0) {
      return NextResponse.json(
        { error: 'Impossible de supprimer une formation avec des inscriptions existantes' },
        { status: 400 }
      )
    }

    // Supprimer la formation
    const { error } = await supabase
      .from('formations')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur lors de la suppression de la formation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}