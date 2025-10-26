/**
 * Client PayDunya avec appels API directs (sans SDK)
 * Compatible avec Turbopack et Next.js 16
 */

// Types TypeScript pour PayDunya
export interface PayDunyaConfig {
  masterKey: string
  privateKey: string
  publicKey: string
  token: string
  mode?: string
}

export interface StoreConfig {
  name: string
  tagline?: string
  phoneNumber?: string
  postalAddress?: string
  websiteURL?: string
  logoURL?: string
}

export interface InvoiceItem {
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
  description?: string
}

export interface CreateInvoiceData {
  items: InvoiceItem[]
  totalAmount: number
  description: string
  returnURL?: string
  cancelURL?: string
  callbackURL?: string
  customData?: Record<string, string>
}

export interface InvoiceResponse {
  success: boolean
  token?: string
  url?: string
  responseCode?: string
  responseText?: string
}

// Configuration
const config: PayDunyaConfig = {
  masterKey: process.env.PAYDUNYA_MASTER_KEY || '',
  privateKey: process.env.PAYDUNYA_PRIVATE_KEY || '',
  publicKey: process.env.PAYDUNYA_PUBLIC_KEY || '',
  token: process.env.PAYDUNYA_TOKEN || '',
  mode: 'live'
}

const storeConfig: StoreConfig = {
  name: 'ChineExpresse',
  tagline: 'Importation depuis la Chine',
  phoneNumber: process.env.PAYDUNYA_STORE_PHONE || '',
  websiteURL: process.env.NEXT_PUBLIC_SITE_URL || 'https://chineexpresse.com'
}

// Vérifier que toutes les clés sont présentes
if (!config.masterKey || !config.privateKey || !config.publicKey || !config.token) {
  console.warn('⚠️ PayDunya: Variables d\'environnement manquantes')
}

// URL de base de l'API PayDunya
const API_BASE_URL = 'https://app.paydunya.com/api/v1'

/**
 * Créer une facture PayDunya via l'API REST
 */
export async function createCheckoutInvoice(data: CreateInvoiceData): Promise<InvoiceResponse> {
  try {
    console.log('🟠 [PAYDUNYA API] Début création invoice')
    console.log('🟠 [PAYDUNYA API] Mode:', config.mode)
    console.log('🟠 [PAYDUNYA API] Items:', data.items)
    console.log('🟠 [PAYDUNYA API] Total:', data.totalAmount)

    // Préparer le payload pour l'API PayDunya
    const payload = {
      invoice: {
        total_amount: data.totalAmount,
        description: data.description || 'Paiement ChineExpresse'
      },
      store: {
        name: storeConfig.name,
        tagline: storeConfig.tagline || '',
        phone: storeConfig.phoneNumber || '',
        postal_address: storeConfig.postalAddress || '',
        website_url: storeConfig.websiteURL || ''
      },
      actions: {
        cancel_url: data.cancelURL || '',
        return_url: data.returnURL || '',
        callback_url: data.callbackURL || ''
      },
      items: data.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total_price: item.totalPrice,
        description: item.description || ''
      })),
      custom_data: data.customData || {}
    }

    console.log('🟠 [PAYDUNYA API] Payload:', JSON.stringify(payload, null, 2))

    // Appel à l'API PayDunya
    const response = await fetch(`${API_BASE_URL}/checkout-invoice/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PAYDUNYA-MASTER-KEY': config.masterKey,
        'PAYDUNYA-PRIVATE-KEY': config.privateKey,
        'PAYDUNYA-TOKEN': config.token,
        'PAYDUNYA-MODE': config.mode || 'live'
      },
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    console.log('🟠 [PAYDUNYA API] Response status:', response.status)
    console.log('🟠 [PAYDUNYA API] Response:', result)

    if (response.ok && result.response_code === '00') {
      console.log('🟠 [PAYDUNYA API] ✅ Invoice créée')
      console.log('🟠 [PAYDUNYA API] Token:', result.token)
      console.log('🟠 [PAYDUNYA API] URL:', result.response_text)

      return {
        success: true,
        token: result.token,
        url: result.response_text, // L'URL de checkout
        responseCode: result.response_code,
        responseText: result.response_text
      }
    } else {
      console.error('🟠 [PAYDUNYA API] ❌ Erreur:', result)
      return {
        success: false,
        responseCode: result.response_code,
        responseText: result.response_text || 'Erreur lors de la création de la facture'
      }
    }

  } catch (error: any) {
    console.error('💥 [PAYDUNYA API] Exception:', error)
    console.error('💥 [PAYDUNYA API] Stack:', error.stack)
    return {
      success: false,
      responseText: error.message || 'Erreur lors de la création de la facture'
    }
  }
}

/**
 * Vérifier le statut d'une facture via l'API REST
 */
export async function confirmInvoice(token: string): Promise<any> {
  try {
    console.log('🟠 [PAYDUNYA API] Vérification facture:', token)

    const response = await fetch(`${API_BASE_URL}/checkout-invoice/confirm/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'PAYDUNYA-MASTER-KEY': config.masterKey,
        'PAYDUNYA-PRIVATE-KEY': config.privateKey,
        'PAYDUNYA-TOKEN': config.token,
        'PAYDUNYA-MODE': config.mode || 'live'
      }
    })

    const result = await response.json()

    console.log('🟠 [PAYDUNYA API] Confirmation response:', result)

    if (response.ok && result.response_code === '00') {
      return {
        success: true,
        status: result.status,
        customer: result.customer,
        receiptURL: result.receipt_url,
        totalAmount: result.invoice?.total_amount
      }
    } else {
      return {
        success: false,
        error: result.response_text || 'Erreur lors de la confirmation'
      }
    }

  } catch (error: any) {
    console.error('💥 [PAYDUNYA API] Erreur confirmation:', error)
    return {
      success: false,
      error: error.message || 'Erreur lors de la confirmation de la facture'
    }
  }
}

// Exporter la config pour usage si nécessaire
export { config as setup, storeConfig as store }
