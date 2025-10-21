import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const { subject, content, recipients } = await request.json()

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Sujet et contenu requis' },
        { status: 400 }
      )
    }

    // Récupérer les emails selon les destinataires sélectionnés
    let emailQuery = supabase.from('contact_submissions').select('email')

    if (recipients === 'formation_paid') {
      // Emails des utilisateurs qui ont payé une formation
      emailQuery = supabase
        .from('formation_inscriptions')
        .select('email')
        .eq('status', 'paid')
    } else if (recipients === 'formation_pending') {
      // Emails des utilisateurs qui ont des inscriptions en attente
      emailQuery = supabase
        .from('formation_inscriptions')
        .select('email')
        .eq('status', 'pending')
    }

    const { data: emails, error } = await emailQuery

    if (error) throw error

    // Ici vous pouvez intégrer un service d'envoi d'emails comme Resend, SendGrid, etc.
    // Pour l'instant, on simule l'envoi
    console.log('Emails à envoyer:', emails?.map(e => e.email))
    console.log('Sujet:', subject)
    console.log('Contenu:', content)

    return NextResponse.json({
      success: true,
      emailsSent: emails?.length || 0
    })

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    )
  }
}
