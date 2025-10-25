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

// Import PayDunya (utilisation de require pour éviter les problèmes ESM)
const paydunya = require('paydunya')

// Exporter paydunya pour les usages avancés
export { paydunya }

// Configuration Setup
const setupConfig: PayDunyaConfig = {
  masterKey: process.env.PAYDUNYA_MASTER_KEY || '',
  privateKey: process.env.PAYDUNYA_PRIVATE_KEY || '',
  publicKey: process.env.PAYDUNYA_PUBLIC_KEY || '',
  token: process.env.PAYDUNYA_TOKEN || '',
  // Force 'live' mode since we're using live API keys (live_private_..., live_public_...)
  mode: 'live'
}

// Vérifier que toutes les clés sont présentes
if (!setupConfig.masterKey || !setupConfig.privateKey || !setupConfig.publicKey || !setupConfig.token) {
  console.warn('⚠️ PayDunya: Variables d\'environnement manquantes')
}

const setup = new paydunya.Setup(setupConfig)

// Configuration Store
const storeConfig: StoreConfig = {
  name: 'ChineExpresse',
  tagline: 'Importation depuis la Chine',
  phoneNumber: process.env.PAYDUNYA_STORE_PHONE || '',
  websiteURL: process.env.NEXT_PUBLIC_SITE_URL || 'https://chineexpresse.com'
}

const store = new paydunya.Store(storeConfig)

/**
 * Créer une facture PayDunya
 */
export async function createCheckoutInvoice(data: CreateInvoiceData): Promise<InvoiceResponse> {
  try {
    console.log('🟠 [LIB PAYDUNYA] Début création invoice')
    console.log('🟠 [LIB PAYDUNYA] Config:', {
      mode: setupConfig.mode,
      hasKeys: {
        masterKey: !!setupConfig.masterKey,
        privateKey: !!setupConfig.privateKey,
        publicKey: !!setupConfig.publicKey,
        token: !!setupConfig.token
      }
    })
    console.log('🟠 [LIB PAYDUNYA] Items:', data.items)
    console.log('🟠 [LIB PAYDUNYA] Total amount:', data.totalAmount)
    console.log('🟠 [LIB PAYDUNYA] Description:', data.description)

    const invoice = new paydunya.CheckoutInvoice(setup, store)

    // Ajouter les items
    data.items.forEach(item => {
      invoice.addItem(
        item.name,
        item.quantity,
        item.unitPrice,
        item.totalPrice,
        item.description || ''
      )
    })

    // Configuration de la facture
    invoice.totalAmount = data.totalAmount
    invoice.description = data.description

    // URLs de redirection (optionnel)
    if (data.returnURL) {
      invoice.returnURL = data.returnURL
    }
    if (data.cancelURL) {
      invoice.cancelURL = data.cancelURL
    }
    if (data.callbackURL) {
      invoice.callbackURL = data.callbackURL
      console.log('🟠 [LIB PAYDUNYA] Callback URL configurée:', data.callbackURL)
    }

    // Données personnalisées (optionnel)
    if (data.customData) {
      Object.entries(data.customData).forEach(([key, value]) => {
        invoice.addCustomData(key, value)
      })
      console.log('🟠 [LIB PAYDUNYA] Custom data:', data.customData)
    }

    // Créer la facture
    console.log('🟠 [LIB PAYDUNYA] Appel invoice.create()...')
    await invoice.create()

    console.log('🟠 [LIB PAYDUNYA] Invoice créée avec succès!')
    console.log('🟠 [LIB PAYDUNYA] Token:', invoice.token)
    console.log('🟠 [LIB PAYDUNYA] URL:', invoice.url)
    console.log('🟠 [LIB PAYDUNYA] Response code:', invoice.responseCode)
    console.log('🟠 [LIB PAYDUNYA] Response text:', invoice.responseText)

    return {
      success: true,
      token: invoice.token,
      url: invoice.url,
      responseCode: invoice.responseCode,
      responseText: invoice.responseText
    }
  } catch (error: any) {
    console.error('💥 [LIB PAYDUNYA] Erreur création facture:', error)
    console.error('💥 [LIB PAYDUNYA] Stack:', error.stack)
    return {
      success: false,
      responseText: error.message || 'Erreur lors de la création de la facture'
    }
  }
}

/**
 * Vérifier le statut d'une facture
 */
export async function confirmInvoice(token: string): Promise<any> {
  try {
    const invoice = new paydunya.CheckoutInvoice(setup, store)
    await invoice.confirm(token)

    return {
      success: true,
      status: invoice.status,
      customer: invoice.customer,
      receiptURL: invoice.receiptURL,
      totalAmount: invoice.totalAmount
    }
  } catch (error: any) {
    console.error('Erreur confirmation facture PayDunya:', error)
    return {
      success: false,
      error: error.message || 'Erreur lors de la confirmation de la facture'
    }
  }
}

// Exporter les instances pour usage avancé si nécessaire
export { setup, store }
