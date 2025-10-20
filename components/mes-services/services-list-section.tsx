import ServiceItemCard from "./service-item-card"
import { Search, Handshake, Plane, Globe } from "lucide-react"

const services = [
  {
    icon: <Search size={28} className="text-dore" />,
    title: "Sourcing de produits",
    description: "Identification et sélection de fournisseurs fiables, contrôle qualité en amont.",
    ctaLink: "/contact?service=sourcing",
    ctaText: "Demander un devis",
  },
  {
    icon: <Handshake size={28} className="text-dore" />,
    title: "Négociation & suivi de commande",
    description: "Négociation des conditions, suivi en temps réel de vos commandes depuis l’usine jusqu’au port.",
    ctaLink: "/contact?service=negociation",
    ctaText: "Demander un devis",
  },
  {
    icon: <Plane size={28} className="text-dore" />,
    title: "Livraison internationale sécurisée",
    description: "Traitement douanier, assurance transport, livraison finale à votre porte.",
    ctaLink: "/contact?service=livraison",
    ctaText: "Demander un devis",
  },
  {
    icon: <Globe size={28} className="text-dore" />, // Changed icon to Globe
    title: "Accompagnement complet",
    description: "Pack tout-en-un : sourcing, négociation, suivi et livraison, assistance douanière.",
    ctaLink: "/contact?service=complet",
    ctaText: "Demander un devis",
  },
]

export default function ServicesListSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceItemCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              ctaLink={service.ctaLink}
              ctaText={service.ctaText}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
