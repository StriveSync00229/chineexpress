"use client"

/**
 * Modal d'inscription avec checkout PayDunya (redirection)
 * Version simplifiée qui utilise le nouveau système de paiement
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CheckoutButton } from "@/components/payment/CheckoutButton"
import { validateInscriptionForm } from "./validation"
import type { InscriptionData, Country } from "./types"
import type { CheckoutData } from "@/lib/payment/types"

interface FormationCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  formation: {
    title: string
    price: number
    currency: string
    id?: string | null
  }
  countries: Country[]
}

export function FormationCheckoutModal({
  isOpen,
  onClose,
  formation,
  countries
}: FormationCheckoutModalProps) {
  const [inscriptionData, setInscriptionData] = useState<InscriptionData>({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: ""
  })
  const [formErrors, setFormErrors] = useState<Partial<InscriptionData>>({})

  const handleInputChange = (field: keyof InscriptionData, value: string) => {
    setInscriptionData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleClose = () => {
    setInscriptionData({ name: "", email: "", phone: "", country: "", city: "" })
    setFormErrors({})
    onClose()
  }

  // Valider le formulaire avant d'activer le bouton de paiement
  const validation = validateInscriptionForm(inscriptionData)
  const isFormValid = validation.isValid

  // Préparer les données du checkout
  const checkoutData: CheckoutData | null = isFormValid ? {
    itemType: 'formation',
    itemId: formation.id || undefined,
    items: [{
      name: formation.title,
      quantity: 1,
      unitPrice: formation.price,
      totalPrice: formation.price,
      description: formation.title
    }],
    totalAmount: formation.price,
    description: `Formation: ${formation.title}`,
    customer: {
      name: inscriptionData.name,
      email: inscriptionData.email,
      phone: inscriptionData.phone,
      country: countries.find(c => c.value === inscriptionData.country)?.label || inscriptionData.country,
      city: inscriptionData.city
    }
  } : null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Inscription à la Formation</DialogTitle>
          <DialogDescription>
            Remplissez vos informations pour procéder au paiement
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informations du client */}
          <div>
            <Label htmlFor="name">Nom et prénoms *</Label>
            <Input
              id="name"
              type="text"
              value={inscriptionData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={formErrors.name ? "border-red-500" : ""}
              placeholder="Votre nom complet"
            />
            {formErrors.name && (
              <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={inscriptionData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={formErrors.email ? "border-red-500" : ""}
              placeholder="votre.email@exemple.com"
            />
            {formErrors.email && (
              <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              value={inscriptionData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={formErrors.phone ? "border-red-500" : ""}
              placeholder="+225 XX XX XX XX XX"
            />
            {formErrors.phone && (
              <p className="text-sm text-red-500 mt-1">{formErrors.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="country">Pays *</Label>
            <Select
              value={inscriptionData.country}
              onValueChange={(value) => handleInputChange("country", value)}
            >
              <SelectTrigger className={formErrors.country ? "border-red-500" : ""}>
                <SelectValue placeholder="Sélectionnez votre pays" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.country && (
              <p className="text-sm text-red-500 mt-1">{formErrors.country}</p>
            )}
          </div>

          <div>
            <Label htmlFor="city">Ville *</Label>
            <Input
              id="city"
              type="text"
              value={inscriptionData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className={formErrors.city ? "border-red-500" : ""}
              placeholder="Votre ville"
            />
            {formErrors.city && (
              <p className="text-sm text-red-500 mt-1">{formErrors.city}</p>
            )}
          </div>

          {/* Récapitulatif */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-bleu-nuit mb-3">{formation.title}</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Prix total :</span>
                <span className="text-xl font-bold text-green-600">
                  {formation.price.toLocaleString()} {formation.currency}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-blue-200">
              <p className="text-xs text-gray-700 flex items-center gap-1">
                🔒 Paiement sécurisé par PayDunya
              </p>
              <p className="text-xs text-gray-600 mt-1">
                ✅ Carte bancaire et Mobile Money acceptés
              </p>
            </div>
          </div>

          {/* Validation errors summary */}
          {!isFormValid && Object.keys(formErrors).length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Veuillez remplir tous les champs requis avant de procéder au paiement
              </p>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Annuler
            </Button>

            {checkoutData ? (
              <CheckoutButton
                checkoutData={checkoutData}
                buttonText={`Payer ${formation.price.toLocaleString()} ${formation.currency}`}
                className="flex-1 bg-green-600 hover:bg-green-700"
                onSuccess={(token, checkoutURL) => {
                  console.log('✅ Redirection vers checkout:', checkoutURL)
                }}
                onError={(error) => {
                  console.error('❌ Erreur checkout:', error)
                }}
              />
            ) : (
              <Button
                disabled
                className="flex-1 bg-gray-400 cursor-not-allowed"
              >
                Payer {formation.price.toLocaleString()} {formation.currency}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
