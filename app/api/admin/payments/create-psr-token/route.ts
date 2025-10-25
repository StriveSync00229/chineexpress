import { NextRequest, NextResponse } from 'next/server'
import type { InvoiceItem } from '@/lib/paydunya'
import { createAdminClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🟡 [API] ========================================')
    console.log('🟡 [API] POST /api/admin/payments/create-psr-token')
    console.log('🟡 [API] ========================================')

    // Vérifier si le body existe avant de parser
    const text = await request.text()
    if (!text || text.trim() === '') {
      console.log('🟡 [API] ⚠️ Requête vide (probablement un ping PayDunya), ignorée')
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }

    const body = JSON.parse(text)
    console.log('🟡 [API] Body reçu:', body)

    const {
      amount,
      description,
      customerName,
      customerEmail,
      customerPhone,
      customerCountry,
      customerCity,
      itemName,
      formationId
    } = body

    // Validation des données
    if (!amount || !description || !customerName || !customerEmail) {
      console.error('🟡 [API] ❌ Validation échouée: données manquantes')
      return NextResponse.json(
        { error: 'Données manquantes (amount, description, customerName, customerEmail requis)' },
        { status: 400 }
      )
    }

    console.log('🟡 [API] ✅ Validation OK')

    // 1. Enregistrer l'inscription en base de données avec statut 'pending'
    console.log('🟡 [API] Création inscription dans Supabase...')
    const supabase = createAdminClient()

    const insertData = {
      formation_id: formationId || null, // Accepter null si formationId est vide
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      company: customerCountry, // Utiliser le champ company pour stocker le pays temporairement
      status: 'pending',
      amount: amount
    }
    console.log('🟡 [API] Données inscription:', insertData)

    const { data: inscription, error: inscriptionError } = await supabase
      .from('formation_inscriptions')
      .insert(insertData)
      .select()
      .single()

    if (inscriptionError) {
      console.error('🟡 [API] ❌ Erreur création inscription:', inscriptionError)
      console.error('🟡 [API] ❌ Message:', inscriptionError.message)
      console.error('🟡 [API] ❌ Details:', inscriptionError.details)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement de l\'inscription', details: inscriptionError.message },
        { status: 500 }
      )
    }

    console.log('🟡 [API] ✅ Inscription créée avec succès!')
    console.log('🟡 [API] ID inscription:', inscription.id)

    // Import dynamique de PayDunya
    console.log('🟡 [API] Import module PayDunya...')
    const { createCheckoutInvoice } = await import('@/lib/paydunya')

    // Créer l'item pour la facture
    const items: InvoiceItem[] = [
      {
        name: itemName || description,
        quantity: 1,
        unitPrice: amount,
        totalPrice: amount,
        description: description
      }
    ]
    console.log('🟡 [API] Items facture:', items)

    // Préparer les URLs de callback
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const returnURL = `${baseURL}/formation-alibaba?payment=success`
    const cancelURL = `${baseURL}/formation-alibaba?payment=cancelled`
    const callbackURL = `${baseURL}/api/webhooks/paydunya-ipn`

    console.log('🟡 [API] URLs configurées:', { returnURL, cancelURL, callbackURL })

    // Données personnalisées pour retrouver l'inscription après le paiement
    const customData: Record<string, string> = {
      customer_name: customerName,
      customer_email: customerEmail,
    }

    if (customerPhone) customData.customer_phone = customerPhone
    if (customerCountry) customData.customer_country = customerCountry
    if (customerCity) customData.customer_city = customerCity
    if (formationId) customData.formation_id = formationId

    console.log('🟡 [API] Custom data:', customData)

    // Créer la facture PayDunya avec callback IPN
    console.log('🟡 [API] Appel createCheckoutInvoice...')
    const result = await createCheckoutInvoice({
      items,
      totalAmount: amount,
      description,
      returnURL,
      cancelURL,
      callbackURL,
      customData
    })

    console.log('🟡 [API] Résultat createCheckoutInvoice:', result)

    if (result.success && result.token) {
      // Pour PSR, on retourne le token et le mode
      // Le frontend utilisera le SDK JavaScript PayDunya avec ce token
      const responseData = {
        success: true,
        mode: process.env.NODE_ENV === 'production' ? 'live' : 'test',
        token: result.token,
        invoice_url: result.url, // URL de backup si besoin
        response_code: result.responseCode
      }
      console.log('🟡 [API] ✅ Succès! Réponse envoyée:', responseData)
      console.log('🟡 [API] ========================================')
      return NextResponse.json(responseData)
    } else {
      const errorResponse = {
        success: false,
        error: result.responseText || 'Erreur lors de la création de la facture',
        response_code: result.responseCode
      }
      console.error('🟡 [API] ❌ Échec création facture:', errorResponse)
      console.log('🟡 [API] ========================================')
      return NextResponse.json(errorResponse, { status: 400 })
    }

  } catch (error: any) {
    console.error('🟡 [API] 💥 Exception non gérée:', error)
    console.error('🟡 [API] 💥 Stack:', error.stack)
    console.log('🟡 [API] ========================================')
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur serveur lors de la création du token',
        details: error.message
      },
      { status: 500 }
    )
  }
}
