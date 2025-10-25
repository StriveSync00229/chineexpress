import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import crypto from 'crypto'
import type { PaymentItemType, PaymentStatus } from '@/lib/payment/types'

/**
 * Webhook IPN (Instant Payment Notification) de PayDunya
 * Reçoit les notifications de paiement en temps réel
 * Support multi-produits : formations, produits, services, etc.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📩 [IPN] ========================================')
    console.log('📩 [IPN] Webhook PayDunya reçu')
    console.log('📩 [IPN] Body:', JSON.stringify(body, null, 2))

    // Extraire les données de l'IPN
    const { data, hash } = body

    if (!data || !hash) {
      console.error('📩 [IPN] ❌ Données manquantes')
      return NextResponse.json(
        { error: 'Données IPN manquantes' },
        { status: 400 }
      )
    }

    // Vérifier la signature SHA-512 pour s'assurer que la requête vient bien de PayDunya
    const masterKey = process.env.PAYDUNYA_MASTER_KEY || ''
    const expectedHash = crypto
      .createHash('sha512')
      .update(masterKey + JSON.stringify(data))
      .digest('hex')

    if (hash !== expectedHash) {
      console.error('📩 [IPN] ❌ Signature invalide')
      console.log('📩 [IPN] Hash reçu:', hash)
      console.log('📩 [IPN] Hash attendu:', expectedHash)
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 401 }
      )
    }

    console.log('📩 [IPN] ✅ Signature valide')

    // Extraire les informations du paiement
    const {
      invoice,
      status,
      customer,
      custom_data
    } = data

    const paymentStatus: string = status // 'completed', 'cancelled', 'failed', 'pending'
    const invoiceToken: string = invoice?.token
    const totalAmount: number = invoice?.total_amount
    const customerEmail: string = custom_data?.customer_email || customer?.email
    const customerName: string = custom_data?.customer_name || customer?.name
    const customerPhone: string = custom_data?.customer_phone || customer?.phone
    const itemType: PaymentItemType = (custom_data?.item_type || 'other') as PaymentItemType
    const itemId: string | undefined = custom_data?.item_id

    console.log('📩 [IPN] Informations paiement:', {
      status: paymentStatus,
      token: invoiceToken,
      amount: totalAmount,
      email: customerEmail,
      itemType,
      itemId
    })

    // Traiter selon le statut du paiement
    if (paymentStatus === 'completed') {
      console.log('📩 [IPN] 💰 Paiement confirmé, mise à jour BDD...')

      const supabase = createAdminClient()
      let updated = false

      // Gérer différents types de produits
      switch (itemType) {
        case 'formation':
          // Mettre à jour l'inscription à la formation
          console.log('📩 [IPN] Type: Formation')

          const { data: inscriptions, error: findError } = await supabase
            .from('formation_inscriptions')
            .select('*')
            .eq('email', customerEmail)
            .eq('status', 'pending')
            .order('created_at', { ascending: false })
            .limit(1)

          if (findError) {
            console.error('📩 [IPN] ❌ Erreur recherche inscription:', findError)
          } else if (inscriptions && inscriptions.length > 0) {
            const inscription = inscriptions[0]

            const { error: updateError } = await supabase
              .from('formation_inscriptions')
              .update({
                status: 'paid',
                payment_date: new Date().toISOString(),
                amount: totalAmount
              })
              .eq('id', inscription.id)

            if (updateError) {
              console.error('📩 [IPN] ❌ Erreur mise à jour inscription:', updateError)
            } else {
              console.log('📩 [IPN] ✅ Inscription mise à jour:', inscription.id)
              updated = true

              // TODO: Envoyer un email de confirmation
              // await sendFormationConfirmationEmail(customerEmail, customerName, inscription)
            }
          } else {
            console.warn('📩 [IPN] ⚠️ Aucune inscription en attente trouvée pour:', customerEmail)
          }
          break

        case 'product':
          // TODO: Gérer les commandes de produits
          console.log('📩 [IPN] Type: Produit (non encore implémenté)')
          break

        case 'service':
          // TODO: Gérer les commandes de services
          console.log('📩 [IPN] Type: Service (non encore implémenté)')
          break

        case 'subscription':
          // TODO: Gérer les abonnements
          console.log('📩 [IPN] Type: Abonnement (non encore implémenté)')
          break

        default:
          console.log('📩 [IPN] Type: Autre/Inconnu')
      }

      console.log('📩 [IPN] ========================================')

      return NextResponse.json({
        success: true,
        message: updated ? 'Paiement confirmé et enregistré' : 'Paiement confirmé',
        itemType,
        updated
      })

    } else if (paymentStatus === 'cancelled') {
      console.log('📩 [IPN] ❌ Paiement annulé')
      console.log('📩 [IPN] ========================================')

      return NextResponse.json({
        success: true,
        message: 'Paiement annulé'
      })

    } else if (paymentStatus === 'failed') {
      console.log('📩 [IPN] ❌ Paiement échoué')
      console.log('📩 [IPN] ========================================')

      return NextResponse.json({
        success: true,
        message: 'Paiement échoué'
      })

    } else if (paymentStatus === 'pending') {
      console.log('📩 [IPN] ⏳ Paiement en attente')
      console.log('📩 [IPN] ========================================')

      return NextResponse.json({
        success: true,
        message: 'Paiement en attente'
      })
    }

    console.log('📩 [IPN] ========================================')

    return NextResponse.json({
      success: true,
      message: 'IPN reçu'
    })

  } catch (error: any) {
    console.error('📩 [IPN] 💥 Exception non gérée:', error)
    console.error('📩 [IPN] Stack:', error.stack)
    console.log('📩 [IPN] ========================================')

    return NextResponse.json(
      {
        error: 'Erreur serveur',
        details: error.message
      },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint pour vérifier que le webhook est accessible
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'PayDunya IPN webhook endpoint',
    timestamp: new Date().toISOString()
  })
}
