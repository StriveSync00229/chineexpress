"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Loader2, Home, RefreshCw } from "lucide-react"
import { confirmPaymentInvoice } from "@/lib/payment/checkout"

/**
 * Page de paiement en attente
 *
 * URL: /payment/pending?token=abc123xyz
 *
 * Effectue un polling du statut du paiement toutes les 5 secondes
 */

function PendingPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [isChecking, setIsChecking] = useState(true)
  const [attempts, setAttempts] = useState(0)
  const maxAttempts = 12 // 12 tentatives x 5 secondes = 1 minute

  useEffect(() => {
    if (!token) {
      setIsChecking(false)
      return
    }

    const checkPaymentStatus = async () => {
      try {
        console.log('⏳ [PENDING PAGE] Vérification statut paiement:', token, `(tentative ${attempts + 1}/${maxAttempts})`)

        const result = await confirmPaymentInvoice(token)
        console.log('⏳ [PENDING PAGE] Résultat:', result)

        if (result.success && result.status === 'paid') {
          // Paiement confirmé, rediriger vers la page de succès
          console.log('⏳ [PENDING PAGE] Paiement confirmé, redirection...')
          router.push(`/payment/success?token=${token}`)
          return
        }

        if (result.success && (result.status === 'cancelled' || result.status === 'failed')) {
          // Paiement annulé ou échoué, rediriger vers la page d'annulation
          console.log('⏳ [PENDING PAGE] Paiement annulé/échoué, redirection...')
          router.push(`/payment/cancel?token=${token}`)
          return
        }

        // Toujours en attente, continuer le polling
        setAttempts(prev => prev + 1)

      } catch (error) {
        console.error('⏳ [PENDING PAGE] Erreur:', error)
        setAttempts(prev => prev + 1)
      }
    }

    // Vérifier immédiatement
    checkPaymentStatus()

    // Continuer à vérifier toutes les 5 secondes si on n'a pas atteint le max
    if (attempts < maxAttempts) {
      const interval = setInterval(checkPaymentStatus, 5000)
      return () => clearInterval(interval)
    } else {
      setIsChecking(false)
    }

  }, [token, attempts, maxAttempts, router])

  // Token manquant
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Erreur</h2>
          <p className="text-gray-600 mb-6">Token de paiement manquant</p>

          <Button asChild variant="outline">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Vérification en cours
  if (isChecking && attempts < maxAttempts) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          {/* En-tête */}
          <div className="text-center mb-8">
            <Clock className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-yellow-600 mb-2">Paiement en attente</h1>
            <p className="text-gray-600">Vérification du statut de votre paiement...</p>
          </div>

          {/* Animation de chargement */}
          <div className="flex items-center justify-center mb-6">
            <Loader2 className="h-12 w-12 text-yellow-600 animate-spin" />
          </div>

          {/* Message */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <p className="text-sm text-yellow-800 text-center">
              Nous vérifions le statut de votre paiement. Cela peut prendre quelques instants...
            </p>
          </div>

          {/* Compteur de tentatives */}
          <div className="text-center text-sm text-gray-500">
            Tentative {attempts + 1} / {maxAttempts}
          </div>
        </div>
      </div>
    )
  }

  // Timeout atteint
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* En-tête */}
        <div className="text-center mb-8">
          <Clock className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-yellow-600 mb-2">Paiement en cours</h1>
          <p className="text-gray-600">Le traitement de votre paiement prend plus de temps que prévu</p>
        </div>

        {/* Message */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
          <p className="text-sm text-yellow-800 mb-3">
            <strong>Ne vous inquiétez pas !</strong> Votre paiement est en cours de traitement.
          </p>
          <p className="text-sm text-yellow-800">
            Vous recevrez un email de confirmation dès que le paiement sera validé.
          </p>
        </div>

        {/* Informations sur le token */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-xs text-gray-600 text-center mb-2">
            N° de transaction :
          </p>
          <p className="text-sm font-mono text-gray-800 text-center">{token}</p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser la page
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        {/* Aide */}
        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-sm text-gray-500 mb-2">
            Le paiement ne se confirme toujours pas ?
          </p>
          <a
            href="mailto:support@chineexpresse.com"
            className="text-sm text-blue-600 hover:underline"
          >
            Contactez notre support
          </a>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-white">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-yellow-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <PendingPageContent />
    </Suspense>
  )
}
