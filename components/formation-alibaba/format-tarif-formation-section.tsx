"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Video, FileText, MessageCircle } from "lucide-react"
import PaymentModal from "./payment-modal" // Nouveau composant

export default function FormatTarifFormationSection() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const formationPrice = 299
  const promoCode = "CHINE20" // Pourrait être géré dynamiquement

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
                onClick={() => setIsPaymentModalOpen(true)}
                className="bg-dore text-bleu-nuit hover:bg-dore/90 font-semibold w-full py-3"
              >
                Je m’inscris à la formation
              </Button>
            </div>
          </div>
        </div>
      </section>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        price={formationPrice}
        productName="Formation Pratique Alibaba"
      />
    </>
  )
}
