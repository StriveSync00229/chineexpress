import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Token de paiement manquant' },
        { status: 400 }
      )
    }

    // Import dynamique de PayDunya
    const { paydunya } = await import('@/lib/paydunya')

    // Vérifier le statut du paiement
    const invoice = paydunya.Invoice()
    invoice.token = token

    const result: any = await new Promise((resolve, reject) => {
      invoice.confirm((err: any, body: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(body)
        }
      })
    })

    return NextResponse.json({
      success: result.success,
      status: result.status,
      amount: result.invoice?.total_amount,
      customer: result.invoice?.customer,
      response_code: result.response_code
    })

  } catch (error) {
    console.error('Erreur vérification PayDunya:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du paiement' },
      { status: 500 }
    )
  }
}