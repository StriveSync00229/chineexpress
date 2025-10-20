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
                ctaLink={service.ctaLink}
                ctaText={service.ctaText}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}