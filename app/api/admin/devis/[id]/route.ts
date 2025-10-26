import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

// PATCH - Mettre à jour le statut d'une demande de devis
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    // Validation du statut
    if (!status || !['pending', 'quoted', 'completed'].includes(status)) {
      return NextResponse.json(
        { error: 'Statut invalide' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Vérifier que la demande de devis existe et est de type 'devis'
    const { data: existingQuote, error: fetchError } = await supabase
      .from('submissions')
      .select('id, type')
      .eq('id', id)
      .eq('type', 'devis')
      .single()

    if (fetchError || !existingQuote) {
      return NextResponse.json(
        { error: 'Demande de devis non trouvée' },
        { status: 404 }
      )
    }

    // Mettre à jour le statut
    const { data: quote, error } = await supabase
      .from('submissions')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(quote)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du devis:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du devis' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une demande de devis
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('submissions')
      .delete()
      .eq('id', id)
      .eq('type', 'devis')

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur lors de la suppression du devis:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}
