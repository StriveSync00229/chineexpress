"use client"

/**
 * Section des modules de formation - Composant principal
 * Utilise le nouveau système de checkout avec redirection PayDunya
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModuleCard } from "./ModuleCard"
import { FormationCheckoutModal } from "./FormationCheckoutModal"
import { modules, countries, formationConfig } from "./data"

export default function ModulesFormationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-bleu-nuit mb-4">
            Programme Détaillé de la Formation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un parcours structuré en 4 modules essentiels pour maîtriser l'import depuis la Chine
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <ModuleCard key={index} module={module} index={index} />
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-16 bg-bleu-nuit text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-serif font-bold text-dore mb-4">
            Formation Complète : 6 Heures de Contenu
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold text-dore mb-2">4</div>
              <div className="text-white/80">Modules principaux</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-dore mb-2">15+</div>
              <div className="text-white/80">Étapes détaillées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-dore mb-2">8</div>
              <div className="text-white/80">Outils pratiques</div>
            </div>
          </div>
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="bg-dore text-bleu-nuit hover:bg-dore/90"
          >
            S'inscrire à la Formation Complète
          </Button>
        </div>
      </div>

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
    </section>
  )
}
