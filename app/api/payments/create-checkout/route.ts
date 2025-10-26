import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { createPaymentCheckout, validateCheckoutData } from '@/lib/payment/checkout'
import type { CheckoutData, FormationInscriptionData } from '@/lib/payment/types'

// Configuration du segment Next.js 16
export const runtime = 'nodejs'  // Use Node.js runtime pour Supabase et crypto
export const dynamic = 'force-dynamic'  // Toujours dynamique (pas de cache)

/**
 * Endpoint API générique pour créer un checkout PayDunya
 *
 * POST /api/payments/create-checkout
 *
 * Body: CheckoutData
 *
 * Response: { success, token, checkoutURL, error }
 */
export async function POST(request: NextRequest) {
  try {
    console.log('🟢 [API] ========================================')
    console.log('🟢 [API] POST /api/payments/create-checkout')
    console.log('🟢 [API] ========================================')

    // Parser le body
    const body = await request.json()
    console.log('🟢 [API] Body reçu:', body)

    const checkoutData: CheckoutData = body

    // Valider les données
    const validation = validateCheckoutData(checkoutData)
    if (validation !== true) {
      console.error('🟢 [API] ❌ Validation échouée:', validation)
      return NextResponse.json(
        { success: false, error: validation },
        { status: 400 }
      )
    }

    console.log('🟢 [API] ✅ Validation OK')

    // Créer le checkout PayDunya d'abord pour obtenir le token
    console.log('🟢 [API] Création checkout PayDunya...')
    const result = await createPaymentCheckout(checkoutData)

    console.log('🟢 [API] Résultat:', result)

    if (!result.success || !result.checkoutURL || !result.token) {
      console.error('🟢 [API] ❌ Échec création checkout:', result.error)
      console.log('🟢 [API] ========================================')

      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Erreur lors de la création du checkout',
          details: result.errorDetails
        },
        { status: 400 }
      )
    }

    console.log('🟢 [API] ✅ Checkout créé avec succès!')
    console.log('🟢 [API] Token:', result.token)
    console.log('🟢 [API] URL:', result.checkoutURL)

    // Enregistrer l'inscription/commande en BDD avec le token PayDunya
    console.log('🟢 [API] Enregistrement en BDD avec token...')
    const supabase = createAdminClient()

    let recordId: string | null = null

    // Gérer différents types d'items
    switch (checkoutData.itemType) {
      case 'formation':
        // Enregistrer une inscription à une formation avec le token PayDunya
        const inscriptionData: FormationInscriptionData = {
          formation_id: checkoutData.itemId,
          name: checkoutData.customer.name,
          email: checkoutData.customer.email,
          phone: checkoutData.customer.phone,
          company: checkoutData.customer.country, // Temporaire : utiliser company pour le pays
          status: 'pending',
          amount: checkoutData.totalAmount,
          payment_token: result.token // Enregistrer le token PayDunya
        }

        const { data: inscription, error: inscriptionError } = await supabase
          .from('formation_inscriptions')
          .insert(inscriptionData)
          .select()
          .single()

        if (inscriptionError) {
          console.error('🟢 [API] ❌ Erreur création inscription:', inscriptionError)
          // Le checkout est déjà créé, donc on continue quand même
          console.log('🟢 [API] ⚠️ Inscription non enregistrée mais checkout créé')
        } else {
          recordId = inscription.id
          console.log('🟢 [API] ✅ Inscription créée:', recordId)
        }
        break

      case 'product':
      case 'service':
      case 'subscription':
      case 'other':
        // TODO: Ajouter le support pour d'autres types de produits
        console.log('🟢 [API] ⚠️ Type non encore supporté en BDD:', checkoutData.itemType)
        break
    }

    console.log('🟢 [API] ========================================')

    return NextResponse.json({
      success: true,
      token: result.token,
      checkoutURL: result.checkoutURL,
      recordId // Retourner l'ID de l'enregistrement si créé
    })

  } catch (error: any) {
    console.error('🟢 [API] 💥 Exception non gérée:', error)
    console.error('🟢 [API] 💥 Stack:', error.stack)
    console.log('🟢 [API] ========================================')

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur serveur lors de la création du checkout',
        details: error.message
      },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint pour vérifier que l'API est accessible
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'PayDunya checkout API endpoint',
    timestamp: new Date().toISOString()
  })
}
