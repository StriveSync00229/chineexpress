"use client"

import { useState, type FormEvent } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  price: number
  productName: string
}

// Simuler un formatage de numéro de carte
const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ""
  const parts = []
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }
  if (parts.length) {
    return parts.join(" ")
  }
  return value
}

// Simuler un formatage de date d'expiration
const formatExpiryDate = (value: string) => {
  const v = value.replace(/[^0-9]/gi, "")
  if (v.length >= 3) {
    return `${v.slice(0, 2)}/${v.slice(2, 4)}`
  }
  return v
}

export default function PaymentModal({ isOpen, onClose, price, productName }: PaymentModalProps) {
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Validation basique (pour une vraie app, utiliser Stripe Elements et validation plus robuste)
    if (!cardName || !cardNumber || !expiryDate || !cvc) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs de la carte.",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }
    if (cardNumber.replace(/\s/g, "").length < 16) {
      toast({
        title: "Erreur",
        description: "Numéro de carte invalide.",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }
    // Simuler l'appel à une API de paiement
    console.log("Processing payment for:", { cardName, cardNumber, expiryDate, cvc, price, productName })
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simule la latence réseau

    // Simuler une réponse de paiement
    const paymentSuccess = Math.random() > 0.2 // 80% de succès pour la démo
    if (paymentSuccess) {
      toast({
        title: "Paiement réussi !",
        description: `Paiement de ${price}€ pour "${productName}" effectué avec succès !`,
      })
      onClose() // Fermer la modale en cas de succès
      // Réinitialiser les champs
      setCardName("")
      setCardNumber("")
      setExpiryDate("")
      setCvc("")
    } else {
      toast({
        title: "Échec du paiement",
        description: "Veuillez vérifier vos informations ou réessayer.",
        variant: "destructive",
      })
    }
    setIsProcessing(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-blanc text-noir-profond border-bleu-nuit">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-bleu-nuit flex items-center">
            <CreditCard className="mr-2 h-6 w-6 text-dore" />
            Paiement Sécurisé
          </DialogTitle>
          <DialogDescription className="text-noir-profond/80">
            Pour l'inscription à "{productName}" - Montant : <span className="font-bold text-dore">{price}€</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="cardName" className="text-sm font-medium text-noir-profond/90">
              Nom sur la carte
            </Label>
            <Input
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Nom du titulaire de la carte" // Updated placeholder
              className="bg-gray-100 border-gray-300 focus:border-dore focus:ring-dore"
              disabled={isProcessing}
            />
          </div>
          <div>
            <Label htmlFor="cardNumber" className="text-sm font-medium text-noir-profond/90">
              Numéro de carte
            </Label>
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="0000 0000 0000 0000"
              maxLength={19} // 16 chiffres + 3 espaces
              className="bg-gray-100 border-gray-300 focus:border-dore focus:ring-dore"
              disabled={isProcessing}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate" className="text-sm font-medium text-noir-profond/90">
                Date d'expiration (MM/AA)
              </Label>
              <Input
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/AA"
                maxLength={5}
                className="bg-gray-100 border-gray-300 focus:border-dore focus:ring-dore"
                disabled={isProcessing}
              />
            </div>
            <div>
              <Label htmlFor="cvc" className="text-sm font-medium text-noir-profond/90">
                CVC
              </Label>
              <Input
                id="cvc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/gi, "").slice(0, 4))}
                placeholder="123"
                maxLength={4}
                className="bg-gray-100 border-gray-300 focus:border-dore focus:ring-dore"
                disabled={isProcessing}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start pt-4">
            <Button
              type="submit"
              className="w-full bg-dore text-bleu-nuit hover:bg-dore/90 font-semibold"
              disabled={isProcessing}
            >
              {isProcessing ? "Traitement..." : `Payer ${price}€`}
            </Button>
          </DialogFooter>
        </form>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-noir-profond/70 hover:text-noir-profond"
          onClick={onClose}
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </Button>
      </DialogContent>
    </Dialog>
  )
}
