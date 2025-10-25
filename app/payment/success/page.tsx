"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2, Download, Home } from "lucide-react"
import { confirmPaymentInvoice } from "@/lib/payment/checkout"
import type { InvoiceConfirmation } from "@/lib/payment/types"

/**
 * Page de succès après paiement PayDunya
 *
 * URL: /payment/success?token=abc123xyz
 */

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [isLoading, setIsLoading] = useState(true)
  const [confirmation, setConfirmation] = useState<InvoiceConfirmation | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function confirmPayment() {
      if (!token) {
        setError('Token de paiement manquant')
        setIsLoading(false)
        return
      }

      try {
        console.log('✅ [SUCCESS PAGE] Confirmation du paiement:', token)

        const result = await confirmPaymentInvoice(token)
        console.log('✅ [SUCCESS PAGE] Résultat:', result)

        if (result.success) {
          setConfirmation(result)
        } else {
          setError(result.error || 'Erreur lors de la confirmation du paiement')
        }

      } catch (err: any) {
        console.error('✅ [SUCCESS PAGE] Erreur:', err)
        setError('Erreur lors de la vérification du paiement')
      } finally {
        setIsLoading(false)
      }
    }

    confirmPayment()
  }, [token])

  // Chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-green-600 mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Vérification du paiement...</h2>
          <p className="text-gray-600">Veuillez patienter un instant</p>
        </div>
      </div>
    )
  }

  // Erreur
  if (error || !confirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Erreur de vérification</h2>
          <p className="text-gray-600 mb-6">{error || 'Impossible de vérifier le paiement'}</p>

          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Succès
  if (confirmation.status === 'paid') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
          {/* En-tête de succès */}
          <div className="text-center mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-2">Paiement réussi !</h1>
            <p className="text-gray-600">Votre paiement a été confirmé avec succès</p>
          </div>

          {/* Détails du paiement */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h2 className="font-semibold text-lg mb-4">Détails de la transaction</h2>

            <div className="space-y-3">
              {confirmation.customer && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nom :</span>
                    <span className="font-medium">{confirmation.customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email :</span>
                    <span className="font-medium">{confirmation.customer.email}</span>
                  </div>
                  {confirmation.customer.phone && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Téléphone :</span>
                      <span className="font-medium">{confirmation.customer.phone}</span>
                    </div>
                  )}
                </>
              )}

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Montant payé :</span>
                  <span className="font-bold text-xl text-green-600">
                    {confirmation.totalAmount?.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>

              {confirmation.token && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">N° de transaction :</span>
                  <span className="font-mono text-gray-800">{confirmation.token}</span>
                </div>
              )}
            </div>
          </div>

          {/* Reçu */}
          {confirmation.receiptURL && (
            <div className="mb-6">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <a href={confirmation.receiptURL} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger le reçu
                </a>
              </Button>
            </div>
          )}

          {/* Message de confirmation */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
            <p className="text-sm text-green-800 text-center">
              ✉️ Un email de confirmation vous a été envoyé à <strong>{confirmation.customer?.email}</strong>
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
            <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
              <Link href="/formations">
                Voir mes formations
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Statut de paiement autre que 'paid'
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Paiement en attente</h2>
        <p className="text-gray-600 mb-6">
          Votre paiement est en cours de traitement. Vous recevrez une confirmation par email dès qu'il sera validé.
        </p>

        <div className="flex gap-3">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-green-600 mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Vérification du paiement...</h2>
          <p className="text-gray-600">Veuillez patienter un instant</p>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  )
}
