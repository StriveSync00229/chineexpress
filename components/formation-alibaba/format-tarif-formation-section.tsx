"use client"

/**
 * Section des tarifs et inscription à la formation
 * Utilise le nouveau système unifié avec FormationCheckoutModal et CheckoutButton
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Video, FileText, MessageCircle } from "lucide-react"
import { FormationCheckoutModal } from "./FormationCheckoutModal"
import { formationConfig, countries } from "./data"

export default function FormatTarifFormationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-bleu-nuit mb-4">
              Tarifs et Inscription
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Formation complète avec support personnalisé et outils pratiques
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-dore mb-2">
                  {formationConfig.price.toLocaleString()} {formationConfig.currency}
                </div>
                <p className="text-gray-600 mb-6">Prix unique - Accès à vie</p>
                <Button
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-dore text-bleu-nuit hover:bg-dore/90 font-semibold w-full py-3"
                >
                  Je m'inscris à la formation
                </Button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-serif font-semibold text-bleu-nuit mb-4">Ce que vous recevrez :</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Video className="h-8 w-8 text-dore mx-auto mb-2" />
                    <div className="font-semibold text-sm">6h de formation vidéo</div>
                  </div>
                  <div className="text-center">
                    <FileText className="h-8 w-8 text-dore mx-auto mb-2" />
                    <div className="font-semibold text-sm">8 outils pratiques</div>
                  </div>
                  <div className="text-center">
                    <MessageCircle className="h-8 w-8 text-dore mx-auto mb-2" />
                    <div className="font-semibold text-sm">Support par email</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Inscription + Paiement (Redirection vers checkout PayDunya) */}
      <FormationCheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formation={{
          title: formationConfig.title,
          price: formationConfig.price,
          currency: formationConfig.currency,
          id: formationConfig.id
        }}
        countries={countries}
      />
    </>
  )
}
