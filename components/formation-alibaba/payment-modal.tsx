"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { DialogDescription } from "@/components/ui/dialog"

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
    phone?: string
  }
}

export function PaymentModal({ isOpen, onClose, formation, inscription }: PaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Créer le paiement PayDunya
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
          customerPhone: inscription.phone
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Rediriger vers PayDunya
        if (data.redirect_url) {
          window.location.href = data.redirect_url
        } else {
          toast({
            title: "Paiement créé",
            description: "Redirection vers PayDunya...",
          })
        }
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Erreur lors de la création du paiement",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur serveur",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Paiement - {formation.title}</DialogTitle>
          <DialogDescription>
            Procédez au paiement sécurisé de votre formation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Montant à payer</p>
            <p className="text-2xl font-bold text-blue-600">
              {formation.price.toLocaleString()} {formation.currency}
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={inscription.name}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={inscription.email}
                readOnly
                className="bg-gray-50"
              />
            </div>

            {inscription.phone && (
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={inscription.phone}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Traitement...' : 'Payer avec PayDunya'}
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500 pt-4 border-t">
            <p>Paiement sécurisé via PayDunya</p>
            <p>Supporte: Mobile Money, Cartes bancaires, etc.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}