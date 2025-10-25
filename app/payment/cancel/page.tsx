"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { XCircle, Home, RefreshCw, Loader2 } from "lucide-react"

/**
 * Page d'annulation de paiement PayDunya
 *
 * URL: /payment/cancel?token=abc123xyz
 */

function CancelPageContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* En-tête d'annulation */}
        <div className="text-center mb-8">
          <XCircle className="h-20 w-20 text-orange-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-orange-600 mb-2">Paiement annulé</h1>
          <p className="text-gray-600">Vous avez annulé le processus de paiement</p>
        </div>

        {/* Message */}
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
          <p className="text-sm text-orange-800 text-center">
            Aucun montant n'a été débité de votre compte
          </p>
        </div>

        {/* Informations sur le token (si disponible) */}
        {token && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-xs text-gray-600 text-center">
              N° de transaction : <span className="font-mono">{token}</span>
            </p>
          </div>
        )}

        {/* Message d'aide */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Que s'est-il passé ?</h2>
          <p className="text-gray-600 text-sm mb-3">
            Vous avez annulé le paiement avant sa finalisation. Aucune transaction n'a été effectuée.
          </p>
          <p className="text-gray-600 text-sm">
            Si vous souhaitez finaliser votre achat, vous pouvez réessayer le paiement.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
            <Link href="/formation-alibaba">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer le paiement
            </Link>
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
          <p className="text-sm text-gray-500">
            Besoin d'aide ? Contactez-nous à{" "}
            <a href="mailto:support@chineexpresse.com" className="text-blue-600 hover:underline">
              support@chineexpresse.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
      </div>
    }>
      <CancelPageContent />
    </Suspense>
  )
}
