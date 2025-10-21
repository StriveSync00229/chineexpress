import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const filePath = formData.get('filePath') as string

    if (!file || !filePath) {
      return NextResponse.json(
        { error: 'Fichier ou chemin manquant' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.storage
      .from('formation-images')
      .upload(filePath, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('formation-images')
      .getPublicUrl(filePath)

    return NextResponse.json({ publicUrl })

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload' },
      { status: 500 }
    )
  }
}
