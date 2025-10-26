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

    if (!emails || emails.length === 0) {
      return NextResponse.json({
        success: true,
        emailsSent: 0,
        message: 'Aucun destinataire trouvé'
      })
    }

    // Envoyer les emails avec Nodemailer
    const { sendBulkEmail } = await import('@/lib/email/service')

    let successCount = 0
    let failureCount = 0

    console.log(`📧 Envoi d'emails marketing à ${emails.length} destinataires...`)

    // Envoyer les emails en parallèle avec Promise.all
    const results = await Promise.allSettled(
      emails.map(emailObj => sendBulkEmail(emailObj.email, subject, content))
    )

    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success) {
        successCount++
      } else {
        failureCount++
        console.error(`❌ Échec envoi à ${emails[index].email}`)
      }
    })

    console.log(`✅ Emails envoyés: ${successCount} réussis, ${failureCount} échoués`)

    return NextResponse.json({
      success: true,
      emailsSent: successCount,
      emailsFailed: failureCount,
      total: emails.length
    })

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    )
  }
}
