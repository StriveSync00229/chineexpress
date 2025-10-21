import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function DELETE(request: NextRequest) {
  try {
    const { fileName } = await request.json()

    if (!fileName) {
      return NextResponse.json(
        { error: 'Nom de fichier manquant' },
        { status: 400 }
      )
    }

    const { error } = await supabase.storage
      .from('formation-images')
      .remove([fileName])

    if (error) throw error

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}
