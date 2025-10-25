/**
 * Logique de checkout PayDunya réutilisable
 */

import { createCheckoutInvoice, confirmInvoice } from '@/lib/paydunya'
import type {
  CheckoutData,
  CheckoutResult,
  InvoiceConfirmation,
  PaymentStatus
} from './types'

/**
 * Créer un checkout PayDunya avec redirection
 *
 * @param data Données du checkout
 * @returns Résultat avec token et URL de checkout
 */
export async function createPaymentCheckout(data: CheckoutData): Promise<CheckoutResult> {
  try {
    console.log('🔵 [CHECKOUT] Début création checkout')
    console.log('🔵 [CHECKOUT] Type:', data.itemType)
    console.log('🔵 [CHECKOUT] Item ID:', data.itemId)
    console.log('🔵 [CHECKOUT] Montant:', data.totalAmount)

    // Préparer les URLs de redirection
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const returnURL = data.returnURL || `${baseURL}/payment/success`
    const cancelURL = data.cancelURL || `${baseURL}/payment/cancel`
    const callbackURL = data.callbackURL || `${baseURL}/api/webhooks/paydunya-ipn`

    console.log('🔵 [CHECKOUT] URLs:', { returnURL, cancelURL, callbackURL })

    // Préparer les custom data pour retrouver l'item après paiement
    const customData: Record<string, string> = {
      item_type: data.itemType,
      customer_name: data.customer.name,
      customer_email: data.customer.email,
      ...(data.itemId && { item_id: data.itemId }),
      ...(data.customer.phone && { customer_phone: data.customer.phone }),
      ...(data.customer.country && { customer_country: data.customer.country }),
      ...(data.customer.city && { customer_city: data.customer.city }),
      ...data.customData // Ajouter les custom data supplémentaires
    }

    console.log('🔵 [CHECKOUT] Custom data:', customData)

    // Créer la facture PayDunya
    const result = await createCheckoutInvoice({
      items: data.items,
      totalAmount: data.totalAmount,
      description: data.description,
      returnURL,
      cancelURL,
      callbackURL,
      customData
    })

    console.log('🔵 [CHECKOUT] Résultat:', result)

    if (result.success && result.token && result.url) {
      return {
        success: true,
        token: result.token,
        checkoutURL: result.url,
        responseCode: result.responseCode
      }
    } else {
      return {
        success: false,
        error: 'Erreur lors de la création de la facture',
        errorDetails: result.responseText
      }
    }

  } catch (error: any) {
    console.error('🔴 [CHECKOUT] Erreur:', error)
    return {
      success: false,
      error: 'Erreur serveur lors de la création du checkout',
      errorDetails: error.message
    }
  }
}

/**
 * Confirmer le statut d'une facture PayDunya
 *
 * @param token Token de la facture
 * @returns Informations de confirmation
 */
export async function confirmPaymentInvoice(token: string): Promise<InvoiceConfirmation> {
  try {
    console.log('🔵 [CHECKOUT] Confirmation facture:', token)

    const result = await confirmInvoice(token)

    console.log('🔵 [CHECKOUT] Résultat confirmation:', result)

    if (result.success) {
      // Mapper le statut PayDunya vers notre type PaymentStatus
      let status: PaymentStatus = 'pending'

      const payduyaStatus = result.status?.toLowerCase()
      if (payduyaStatus === 'completed') {
        status = 'paid'
      } else if (payduyaStatus === 'cancelled') {
        status = 'cancelled'
      } else if (payduyaStatus === 'failed') {
        status = 'failed'
      }

      return {
        success: true,
        status,
        customer: result.customer,
        receiptURL: result.receiptURL,
        totalAmount: result.totalAmount,
        token
      }
    } else {
      return {
        success: false,
        error: 'Erreur lors de la confirmation de la facture',
        token
      }
    }

  } catch (error: any) {
    console.error('🔴 [CHECKOUT] Erreur confirmation:', error)
    return {
      success: false,
      error: 'Erreur serveur lors de la confirmation',
      token
    }
  }
}

/**
 * Générer une description de transaction
 *
 * @param itemType Type de l'item
 * @param itemName Nom de l'item
 * @returns Description formatée
 */
export function generateTransactionDescription(itemType: string, itemName: string): string {
  const typeLabels: Record<string, string> = {
    formation: 'Formation',
    product: 'Produit',
    service: 'Service',
    subscription: 'Abonnement',
    other: 'Achat'
  }

  const label = typeLabels[itemType] || 'Achat'
  return `${label}: ${itemName}`
}

/**
 * Formater le montant en FCFA
 *
 * @param amount Montant en FCFA
 * @returns Montant formaté
 */
export function formatAmount(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}


/**
 * Valider les données de checkout
 *
 * @param data Données à valider
 * @returns true si valide, sinon message d'erreur
 */
export function validateCheckoutData(data: CheckoutData): true | string {
  if (!data.items || data.items.length === 0) {
    return 'Aucun item dans la facture'
  }

  if (data.totalAmount <= 0) {
    return 'Le montant total doit être supérieur à 0'
  }

  if (!data.customer.name || data.customer.name.trim() === '') {
    return 'Le nom du client est requis'
  }

  if (!data.customer.email || data.customer.email.trim() === '') {
    return 'L\'email du client est requis'
  }

  // Validation basique de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.customer.email)) {
    return 'L\'email du client est invalide'
  }

  if (!data.description || data.description.trim() === '') {
    return 'La description est requise'
  }

  return true
}
