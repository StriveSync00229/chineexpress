"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  formation: {
    title: string
    price: number
    currency: string
  }
  inscription: {
    name: string
    email: string
    phone: string
    country?: string
    city?: string
  }
  paymentMethod: 'card' | 'momo' | null
  paymentData: any
}

export function PaymentModal({ isOpen, onClose, formation, inscription, paymentMethod, paymentData }: PaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error' | null>(null)
  const { toast } = useToast()

  const handlePayment = async () => {
    setLoading(true)
    setPaymentStatus('pending')

    try {
      // Créer le paiement PayDunya PSR
      const response = await fetch('/api/admin/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: formation.price,
          description: `Formation: ${formation.title}`,
          customerName: inscription.name,
          customerEmail: inscription.email,
          customerPhone: inscription.phone,
          customerCountry: inscription.country,
          customerCity: inscription.city,
          paymentMethod,
          paymentData
        })
      })

      const data = await response.json()
      console.log('Réponse paiement:', data)

      if (response.ok && data.success) {
        // Paiement réussi - afficher le pop-up de succès
        setPaymentStatus('success')
        toast({
          title: "🎉 Paiement réussi !",
          description: `Votre inscription à la formation "${formation.title}" a été confirmée. Vous recevrez vos accès par email.`,
        })

        // Fermer la modal après 3 secondes
        setTimeout(() => {
          onClose()
          setPaymentStatus(null)
        }, 3000)
      } else {
        // Paiement échoué - afficher le pop-up d'échec
        setPaymentStatus('error')
        toast({
          title: "❌ Échec du paiement",
          description: data.error || "Une erreur est survenue lors du traitement de votre paiement.",
          variant: "destructive",
        })

        setTimeout(() => {
          setPaymentStatus(null)
        }, 4000)
      }
    } catch (error) {
      setPaymentStatus('error')
      toast({
        title: "❌ Erreur serveur",
        description: "Impossible de traiter votre paiement. Veuillez réessayer.",
        variant: "destructive",
      })
      setTimeout(() => {
        setPaymentStatus(null)
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  // Pop-up de succès
  if (paymentStatus === 'success') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-2">Paiement réussi !</h2>
            <p className="text-gray-600 mb-4">
              Votre inscription à la formation "{formation.title}" a été confirmée.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-green-700">
                <strong>Montant payé :</strong> {formation.price}{formation.currency}
              </p>
              <p className="text-sm text-green-700">
                <strong>Méthode :</strong> {paymentMethod === 'card' ? 'Carte bancaire' : 'Mobile Money'}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Vous recevrez vos accès par email dans quelques minutes.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Pop-up d'échec
  if (paymentStatus === 'error') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-2">Échec du paiement</h2>
            <p className="text-gray-600 mb-4">
              Une erreur est survenue lors du traitement de votre paiement.
            </p>
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-red-700">
                Veuillez vérifier vos informations et réessayer.
              </p>
            </div>
            <Button
              onClick={() => setPaymentStatus(null)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Réessayer le paiement
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Modal de traitement du paiement
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Traitement du paiement</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Formation</h3>
            <p className="text-lg">{formation.title}</p>
            <p className="font-bold text-2xl text-blue-600">{formation.price}{formation.currency}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Informations client</h3>
            <p>{inscription.name}</p>
            <p>{inscription.email}</p>
            <p>{inscription.phone}</p>
            {inscription.country && <p>{inscription.country} - {inscription.city}</p>}
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Méthode de paiement</h3>
            <p className="text-lg">
              {paymentMethod === 'card' ? '💳 Carte bancaire' : '📱 Mobile Money'}
            </p>
            {paymentMethod === 'card' && (
              <div className="text-sm text-gray-600 mt-2">
                <p><strong>Carte :</strong> **** {paymentData?.cardNumber?.slice(-4)}</p>
                <p><strong>Nom :</strong> {paymentData?.cardName}</p>
                <p><strong>Expiration :</strong> {paymentData?.expiryDate}</p>
              </div>
            )}
            {paymentMethod === 'momo' && (
              <div className="text-sm text-gray-600 mt-2">
                <p><strong>Réseau :</strong> {paymentData?.network}</p>
                <p><strong>Téléphone :</strong> {paymentData?.phoneNumber}</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              onClick={handlePayment}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Traitement...
                </div>
              ) : (
                `Confirmer le paiement`
              )}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Paiement sécurisé traité par PayDunya
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}