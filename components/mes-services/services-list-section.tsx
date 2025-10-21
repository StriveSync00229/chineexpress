"use client"


import ServiceItemCard from "./service-item-card"
import ServiceQuoteModal from "./service-quote-modal"
import { useState } from "react"
import { Search, Handshake, Plane, Globe } from "lucide-react"

const services = [
  {
    icon: <Search size={28} className="text-dore" />,
    title: "Sourcing de produits",
    description: "Identification et sélection de fournisseurs fiables, contrôle qualité en amont.",
    ctaText: "Demander un devis",
  },
  {
    icon: <Handshake size={28} className="text-dore" />,
    title: "Négociation & suivi de commande",
    description: "Négociation des conditions, suivi en temps réel de vos commandes depuis l'usine jusqu'au port.",
    ctaText: "Demander un devis",
  },
  {
    icon: <Plane size={28} className="text-dore" />,
    title: "Livraison internationale sécurisée",
    description: "Traitement douanier, assurance transport, livraison finale à votre porte.",
    ctaText: "Demander un devis",
  },
  {
    icon: <Globe size={28} className="text-dore" />,
    title: "Accompagnement complet",
    description: "Pack tout-en-un : sourcing, négociation, suivi et livraison, assistance douanière.",
    ctaText: "Demander un devis",
  },
]

export default function ServicesListSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuoteRequest = (serviceTitle: string) => {
    setSelectedService(serviceTitle)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
  }

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-b from-blanc-pur to-gris-anthracite/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-logo-titres font-bold text-gris-anthracite mb-4">
              Nos Services d'Import
            </h2>
            <p className="text-lg text-gris-anthracite/70 max-w-2xl mx-auto">
              Découvrez notre gamme complète de services pour faciliter vos importations depuis la Chine
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ServiceItemCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  onQuoteRequest={() => handleQuoteRequest(service.title)}
                  ctaText={service.ctaText}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <ServiceQuoteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          serviceTitle={selectedService}
        />
      )}
    </>
  )
}