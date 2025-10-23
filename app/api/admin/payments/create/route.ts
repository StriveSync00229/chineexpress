import { NextRequest, NextResponse } from 'next/server'
import type { InvoiceItem } from '@/lib/paydunya'

export async function POST(request: NextRequest) {
  try {
    const { amount, description, customerName, customerEmail, customerPhone, itemName } = await request.json()

    // Validation des données
    if (!amount || !description) {
      return NextResponse.json(
        { error: 'Données de paiement manquantes (amount, description requis)' },
        { status: 400 }
      )
    }

    // Import dynamique de PayDunya
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

    // Préparer les URLs de redirection
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const returnURL = `${baseURL}/payment/success`
    const cancelURL = `${baseURL}/payment/cancel`

    // Données personnalisées (optionnel)
    const customData: Record<string, string> = {}
    if (customerName) customData.customer_name = customerName
    if (customerEmail) customData.customer_email = customerEmail
    if (customerPhone) customData.customer_phone = customerPhone

    // Créer la facture PayDunya
    const result = await createCheckoutInvoice({
      items,
      totalAmount: amount,
      description,
      returnURL,
      cancelURL,
      customData
    })

    if (result.success && result.token && result.url) {
      return NextResponse.json({
        success: true,
        token: result.token,
        redirect_url: result.url,
        invoice_url: result.url,
        response_code: result.responseCode
      })
    } else {
      return NextResponse.json(
        {
          error: result.responseText || 'Erreur lors de la création du paiement',
          response_code: result.responseCode
        },
        { status: 400 }
      )
    }

  } catch (error: any) {
    console.error('Erreur PayDunya:', error)
    return NextResponse.json(
      {
        error: 'Erreur serveur lors de la création du paiement',
        details: error.message
      },
      { status: 500 }
    )
  }
}