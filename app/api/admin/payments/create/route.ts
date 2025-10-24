import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const {
      amount,
      description,
      customerName,
      customerEmail,
      customerPhone,
      customerCountry,
      customerCity,
      paymentMethod,
      paymentData
    } = await request.json()

    if (!amount || !description || !customerName || !customerEmail || !paymentMethod) {
      return NextResponse.json(
        { error: 'Données de paiement manquantes' },
        { status: 400 }
      )
    }

    // Configuration PayDunya PSR
    const paydunyaConfig = {
      masterKey: process.env.PAYDUNYA_MASTER_KEY,
      privateKey: process.env.PAYDUNYA_PRIVATE_KEY,
      publicKey: process.env.PAYDUNYA_PUBLIC_KEY,
      token: process.env.PAYDUNYA_TOKEN,
      mode: process.env.NODE_ENV === 'production' ? 'live' : 'test'
    }

    // Préparer les données selon la méthode de paiement
    let paymentRequestData: any = {
      invoice: {
        total_amount: amount,
        description: description,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        customer_address: `${customerCity}, ${customerCountry}`
      },
      store: {
        name: 'ChineExpresse',
        tagline: 'Importation depuis la Chine',
        website_url: process.env.NEXT_PUBLIC_SITE_URL || 'https://chineexpresse.com'
      }
    }

    // Ajouter les données spécifiques selon le mode de paiement
    if (paymentMethod === 'card') {
      paymentRequestData = {
        ...paymentRequestData,
        card: {
          card_number: paymentData.cardNumber.replace(/\s/g, ''),
          card_name: paymentData.cardName,
          expire_date: paymentData.expiryDate,
          cvv: paymentData.cvv
        }
      }
    } else if (paymentMethod === 'momo') {
      paymentRequestData = {
        ...paymentRequestData,
        mobile_money: {
          phone_number: paymentData.phoneNumber,
          provider: paymentData.network
        }
      }
    }

    console.log('Données de paiement PSR:', JSON.stringify(paymentRequestData, null, 2))

    // Préparer les headers PayDunya (filtrer les valeurs undefined)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'PAYDUNYA-MODE': paydunyaConfig.mode
    }

    if (paydunyaConfig.token) headers['Authorization'] = `Bearer ${paydunyaConfig.token}`
    if (paydunyaConfig.masterKey) headers['PAYDUNYA-MASTER-KEY'] = paydunyaConfig.masterKey
    if (paydunyaConfig.privateKey) headers['PAYDUNYA-PRIVATE-KEY'] = paydunyaConfig.privateKey
    if (paydunyaConfig.publicKey) headers['PAYDUNYA-PUBLIC-KEY'] = paydunyaConfig.publicKey

    console.log('Données de paiement PSR:', JSON.stringify(paymentRequestData, null, 2))

    // Envoyer la requête à PayDunya PSR
    const paydunyaResponse = await fetch('https://app.paydunya.com/api/v1/psr', {
      method: 'POST',
      headers,
      body: JSON.stringify(paymentRequestData)
    })

    const result = await paydunyaResponse.json()
    console.log('Réponse PayDunya PSR:', JSON.stringify(result, null, 2))

    if (paydunyaResponse.ok && result.success) {
      // Paiement réussi
      return NextResponse.json({
        success: true,
        status: 'success',
        transaction_id: result.transaction_id || result.token,
        amount: amount,
        currency: 'XOF',
        description: description,
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone
        },
        payment_method: paymentMethod,
        response_code: result.response_code,
        message: 'Paiement effectué avec succès'
      })
    } else {
      // Paiement échoué
      return NextResponse.json({
        success: false,
        status: 'failed',
        error: result.description || result.message || 'Échec du paiement',
        response_code: result.response_code || 'PAYMENT_FAILED',
        payment_method: paymentMethod
      }, { status: 400 })
    }

  } catch (error) {
    console.error('Erreur PayDunya PSR:', error)
    return NextResponse.json({
      success: false,
      status: 'error',
      error: 'Erreur serveur lors du traitement du paiement',
      details: error.message
    }, { status: 500 })
  }
}