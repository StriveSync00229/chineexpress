"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import type { CheckoutData } from "@/lib/payment/types"

interface CheckoutButtonProps {
  // Données du checkout
  checkoutData: CheckoutData

  // Texte du bouton
  buttonText?: string

  // Classe CSS personnalisée
  className?: string

  // Désactivé
  disabled?: boolean

  // Callbacks
  onSuccess?: (token: string, checkoutURL: string) => void
  onError?: (error: string) => void

  // Variante du bouton
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"

  // Taille du bouton
  size?: "default" | "sm" | "lg" | "icon"
}

/**
 * Bouton de paiement réutilisable avec redirection vers PayDunya
 *
 * Utilisation :
 * ```tsx
 * <CheckoutButton
 *   checkoutData={{
 *     itemType: 'formation',
 *     itemId: 'uuid-formation',
 *     items: [{ name: 'Formation Alibaba', quantity: 1, unitPrice: 50000, totalPrice: 50000 }],
 *     totalAmount: 50000,
 *     description: 'Formation: Alibaba',
 *     customer: { name: 'Jean Dupont', email: 'jean@example.com' }
 *   }}
 *   buttonText="Payer 50 000 FCFA"
 * />
 * ```
 */
export function CheckoutButton({
  checkoutData,
  buttonText = "Procéder au paiement",
  className = "",
  disabled = false,
  onSuccess,
  onError,
  variant = "default",
  size = "default"
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      console.log('🔵 [CHECKOUT BUTTON] Création checkout...')
      console.log('🔵 [CHECKOUT BUTTON] Données:', checkoutData)

      // Appeler l'API pour créer le checkout
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData)
      })

      const result = await response.json()
      console.log('🔵 [CHECKOUT BUTTON] Résultat:', result)

      if (result.success && result.checkoutURL) {
        console.log('🔵 [CHECKOUT BUTTON] Redirection vers:', result.checkoutURL)

        // Callback de succès
        if (onSuccess) {
          onSuccess(result.token, result.checkoutURL)
        }

        // Afficher un toast de confirmation
        toast({
          title: "Redirection vers le paiement",
          description: "Vous allez être redirigé vers la page de paiement PayDunya...",
        })

        // Rediriger vers la page de checkout PayDunya
        // Attendre un petit moment pour que le toast s'affiche
        setTimeout(() => {
          window.location.href = result.checkoutURL
        }, 500)

      } else {
        console.error('🔵 [CHECKOUT BUTTON] Erreur:', result.error)

        // Callback d'erreur
        if (onError) {
          onError(result.error || 'Erreur lors de la création du checkout')
        }

        // Afficher un toast d'erreur
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de la création du paiement.",
          variant: "destructive",
        })

        setIsLoading(false)
      }

    } catch (error: any) {
      console.error('🔵 [CHECKOUT BUTTON] Exception:', error)

      // Callback d'erreur
      if (onError) {
        onError(error.message || 'Erreur réseau')
      }

      // Afficher un toast d'erreur
      toast({
        title: "Erreur",
        description: "Une erreur réseau est survenue. Veuillez réessayer.",
        variant: "destructive",
      })

      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={disabled || isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Redirection...
        </div>
      ) : (
        buttonText
      )}
    </Button>
  )
}
