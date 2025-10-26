import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

// PATCH - Mettre à jour le statut d'un contact
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    // Validation du statut
    if (!status || !['pending', 'processed'].includes(status)) {
      return NextResponse.json(
        { error: 'Statut invalide' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Vérifier que le contact existe et est de type 'contact'
    const { data: existingContact, error: fetchError } = await supabase
      .from('submissions')
      .select('id, type')
      .eq('id', id)
      .eq('type', 'contact')
      .single()

    if (fetchError || !existingContact) {
      return NextResponse.json(
        { error: 'Contact non trouvé' },
        { status: 404 }
      )
    }

    // Mettre à jour le statut
    const { data: contact, error } = await supabase
      .from('submissions')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du contact:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du contact' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un contact
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
      .eq('type', 'contact')

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur lors de la suppression du contact:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}
