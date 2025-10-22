import { NextRequest, NextResponse } from 'next/server'
import { paydunya } from '@/lib/paydunya'

export async function POST(request: NextRequest) {
  try {
    const { amount, description, customerName, customerEmail, customerPhone } = await request.json()

    if (!amount || !description || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Données de paiement manquantes' },
        { status: 400 }
      )
    }

    // Configuration du paiement PayDunya
    const paymentData = {
      invoice: {
        total_amount: amount,
        description: description,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone
      },
      store: {
        name: 'ChineExpresse',
        tagline: 'Importation depuis la Chine',
        website_url: process.env.NEXT_PUBLIC_SITE_URL || 'https://chineexpresse.com'
      }
    }

    // Créer l'invoice PayDunya
    const invoice = paydunya.Invoice(paymentData.invoice)
    invoice.store = paymentData.store

    const result: any = await new Promise((resolve, reject) => {
      invoice.create((err: any, body: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(body)
        }
      })
    })

    if (result.success && result.token) {
      return NextResponse.json({
        success: true,
        token: result.token,
        redirect_url: result.redirect_url,
        invoice_url: (invoice as any).invoice_url,
        response_code: result.response_code
      })
    } else {
      return NextResponse.json(
        {
          error: result.description || 'Erreur lors de la création du paiement',
          response_code: result.response_code
        },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Erreur PayDunya:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création du paiement' },
      { status: 500 }
    )
  }
}