"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Search, Handshake, Plane, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import ServiceQuoteModal from "@/components/mes-services/service-quote-modal"

const services = [
  {
    icon: <Search size={32} className="text-dore" />,
    title: "Sourcing de produits",
    description: "Identification et sélection de fournisseurs fiables, contrôle qualité en amont.",
    href: "/contact?service=sourcing"
  },
  {
    icon: <Handshake size={32} className="text-dore" />,
    title: "Négociation & suivi de commande",
    description: "Négociation des conditions, suivi en temps réel de vos commandes depuis l'usine jusqu'au port.",
    href: "/contact?service=negociation"
  },
  {
    icon: <Plane size={32} className="text-dore" />,
    title: "Livraison internationale sécurisée",
    description: "Traitement douanier, assurance transport, livraison finale à votre porte.",
    href: "/contact?service=livraison"
  },
  {
    icon: <Globe size={32} className="text-dore" />,
    title: "Accompagnement complet",
    description: "Pack tout-en-un : sourcing, négociation, suivi et livraison, assistance douanière.",
    href: "/contact?service=complet"
  },
]

interface ServiceSelectionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ServiceSelectionModal({ isOpen, onClose }: ServiceSelectionModalProps) {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  const handleServiceSelect = (serviceTitle: string) => {
    setSelectedService(serviceTitle)
    setIsQuoteModalOpen(true)
    onClose()
  }

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false)
    setSelectedService(null)
  }

  const handleGeneralContact = () => {
    onClose()
    router.push("/contact")
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif font-bold text-bleu-nuit text-center">
              Choisissez votre service
            </DialogTitle>
            <DialogDescription className="text-noir-profond/80 text-center">
              Sélectionnez le service pour lequel vous souhaitez demander un devis personnalisé
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-4 border border-gray-200 rounded-lg hover:border-dore/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleServiceSelect(service.title)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-dore/10 rounded-lg group-hover:bg-dore/20 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-semibold text-bleu-nuit group-hover:text-dore transition-colors duration-300 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-noir-profond/70 group-hover:text-noir-profond/90 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-noir-profond/60 mb-4">
              Vous préférez une demande générale ?
              <button
                onClick={handleGeneralContact}
                className="text-dore hover:text-dore/80 font-medium ml-1 transition-colors"
              >
                Contactez-nous directement
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {selectedService && (
        <ServiceQuoteModal
          isOpen={isQuoteModalOpen}
          onClose={handleCloseQuoteModal}
          serviceTitle={selectedService}
        />
      )}
    </>
  )
}