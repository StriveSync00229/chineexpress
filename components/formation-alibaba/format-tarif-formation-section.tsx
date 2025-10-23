"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Video, FileText, MessageCircle } from "lucide-react"
import { PaymentModal } from "./payment-modal"

interface InscriptionData {
  name: string
  email: string
  phone: string
}

export default function FormatTarifFormationSection() {
  const [isInscriptionModalOpen, setIsInscriptionModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [inscriptionData, setInscriptionData] = useState<InscriptionData>({
    name: "",
    email: "",
    phone: ""
  })
  const [formErrors, setFormErrors] = useState<Partial<InscriptionData>>({})
  
  const formationPrice = 299
  const promoCode = "CHINE20"

  const validateForm = (): boolean => {
    const errors: Partial<InscriptionData> = {}
    
    if (!inscriptionData.name.trim()) {
      errors.name = "Le nom est requis"
    }
    
    if (!inscriptionData.email.trim()) {
      errors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(inscriptionData.email)) {
      errors.email = "L'email n'est pas valide"
    }
    
    if (!inscriptionData.phone.trim()) {
      errors.phone = "Le téléphone est requis"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInscription = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsInscriptionModalOpen(false)
      setIsPaymentModalOpen(true)
    }
  }

  const handleInputChange = (field: keyof InscriptionData, value: string) => {
    setInscriptionData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const resetForm = () => {
    setInscriptionData({
      name: "",
      email: "",
      phone: ""
    })
    setFormErrors({})
  }

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-bleu-nuit mb-6">Format et Tarif</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Video size={24} className="text-dore mr-3 mt-1 flex-shrink-0" />
                  <p className="text-noir-profond/80">
                    <span className="font-semibold">Vidéos pédagogiques :</span> Accès illimité à des modules clairs et
                    concis.
                  </p>
                </div>
                <div className="flex items-start">
                  <FileText size={24} className="text-dore mr-3 mt-1 flex-shrink-0" />
                  <p className="text-noir-profond/80">
                    <span className="font-semibold">PDF téléchargeables :</span> Supports de cours et checklists pour
                    chaque module.
                  </p>
                </div>
                <div className="flex items-start">
                  <MessageCircle size={24} className="text-dore mr-3 mt-1 flex-shrink-0" />
                  <p className="text-noir-profond/80">
                    <span className="font-semibold">Séances Q&A :</span> Sessions de questions-réponses en direct
                    (optionnel selon formule).
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-bleu-nuit text-white p-8 rounded-lg shadow-xl text-center">
              <h3 className="text-2xl font-serif font-bold text-dore mb-2">Accès Complet à la Formation</h3>
              <p className="text-5xl text-dore font-extrabold mb-1">{formationPrice}€</p>
              <p className="text-sm text-white/70 mb-6">(Paiement unique)</p>
              <p className="text-white/90 mb-6">
                Offre de lancement : <span className="font-bold text-dore">-20%</span> avec le code{" "}
                <span className="font-bold text-dore">{promoCode}</span> (jusqu'au JJ/MM/AAAA)
              </p>
              <Button
                size="lg"
                onClick={() => setIsInscriptionModalOpen(true)}
                className="bg-dore text-bleu-nuit hover:bg-dore/90 font-semibold w-full py-3"
              >
                Je m'inscris à la formation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal d'inscription */}
      <Dialog open={isInscriptionModalOpen} onOpenChange={setIsInscriptionModalOpen}>
      <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Inscription à la Formation Alibaba</DialogTitle>
            <DialogDescription>
              Remplissez vos informations pour vous inscrire à la formation
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleInscription} className="space-y-4">
            <div>
              <Label htmlFor="name">Nom complet *</Label>
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

            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <p className="font-semibold mb-1">Informations importantes :</p>
              <ul className="text-xs space-y-1">
                <li>• Prix : {formationPrice}€ (paiement unique)</li>
                <li>• Code promo : {promoCode} (-20%)</li>
                <li>• Paiement sécurisé via PayDunya</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsInscriptionModalOpen(false)
                  resetForm()
                }}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Continuer vers le paiement
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de paiement */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false)
          resetForm()
        }}
        formation={{
          title: "Formation Pratique Alibaba",
          price: formationPrice,
          currency: "€"
        }}
        inscription={inscriptionData}
      />
    </>
  )
}