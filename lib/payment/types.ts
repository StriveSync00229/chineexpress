/**
 * Types génériques pour le système de paiement PayDunya
 * Réutilisables pour formations, produits, services, etc.
 */

/**
 * Type de produit/service à payer
 */
export type PaymentItemType = 'formation' | 'product' | 'service' | 'subscription' | 'other'

/**
 * Statut de paiement
 */
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded'

/**
 * Item dans une facture
 */
export interface PaymentItem {
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
  description?: string
}

/**
 * Informations client pour le paiement
 */
export interface CustomerInfo {
  name: string
  email: string
  phone?: string
  country?: string
  city?: string
}

/**
 * Données de checkout
 */
export interface CheckoutData {
  // Type de l'item
  itemType: PaymentItemType

  // ID de l'item (formation_id, product_id, etc.)
  itemId?: string

  // Items de la facture
  items: PaymentItem[]

  // Montant total
  totalAmount: number

  // Description de la transaction
  description: string

  // Informations client
  customer: CustomerInfo

  // Données personnalisées (stockées dans custom_data PayDunya)
  customData?: Record<string, string>

  // URLs de redirection (optionnel, des valeurs par défaut seront utilisées)
  returnURL?: string
  cancelURL?: string
  callbackURL?: string
}

/**
 * Résultat de la création d'un checkout
 */
export interface CheckoutResult {
  success: boolean

  // Token de la facture PayDunya
  token?: string

  // URL de la page de checkout PayDunya
  checkoutURL?: string

  // Code de réponse PayDunya
  responseCode?: string

  // Message d'erreur si échec
  error?: string
  errorDetails?: string
}

/**
 * Résultat de la confirmation d'une facture
 */
export interface InvoiceConfirmation {
  success: boolean

  // Statut du paiement
  status?: PaymentStatus

  // Informations client
  customer?: {
    name: string
    email: string
    phone?: string
  }

  // URL du reçu
  receiptURL?: string

  // Montant total
  totalAmount?: number

  // Token de la facture
  token?: string

  // Erreur si échec
  error?: string
}

/**
 * Données du webhook IPN PayDunya
 */
export interface IPNData {
  // Hash de signature SHA-512
  hash: string

  // Données de la transaction
  data: {
    invoice: {
      token: string
      total_amount: number
      items?: Array<{
        name: string
        quantity: number
        unit_price: number
        total_price: number
      }>
    }

    status: 'completed' | 'pending' | 'cancelled' | 'failed'

    customer?: {
      name?: string
      email?: string
      phone?: string
    }

    custom_data?: Record<string, string>

    receipt_url?: string
  }
}

/**
 * Données d'inscription à une formation
 */
export interface FormationInscriptionData {
  formation_id?: string
  name: string
  email: string
  phone?: string
  company?: string // Utilisé temporairement pour stocker le pays
  status: PaymentStatus
  amount?: number
  payment_date?: string
}

/**
 * Configuration PayDunya
 */
export interface PayDunyaConfig {
  masterKey: string
  privateKey: string
  publicKey: string
  token: string
  mode: 'test' | 'live'
}

/**
 * Informations de la boutique PayDunya
 */
export interface StoreInfo {
  name: string
  tagline?: string
  phoneNumber?: string
  postalAddress?: string
  websiteURL?: string
  logoURL?: string
}
