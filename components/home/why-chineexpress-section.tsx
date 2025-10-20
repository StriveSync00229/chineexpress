import { Search, Handshake, Truck, CheckCircle } from 'lucide-react'

const features = [
  {
    icon: <Search size={36} className="text-dore" />,
    title: "Recherche du fournisseur",
    description: "Identification et sélection rigoureuse des meilleurs fournisseurs en Chine.",
  },
  {
    icon: <Handshake size={36} className="text-dore" />,
    title: "Négociation des prix",
    description: "Obtention des conditions tarifaires les plus avantageuses pour vos produits.",
  },
  {
    icon: <Truck size={36} className="text-dore" />,
    title: "Suivi de commande",
    description: "Surveillance constante de votre commande, de la production à l'expédition.",
  },
  {
    icon: <CheckCircle size={36} className="text-dore" />,
    title: "Livraison porte à porte",
    description: "Gestion complète de la logistique jusqu'à la réception de vos marchandises.",
  },
]

export default function WhyChineExpressSection() {
  return (
    <section className="py-16 md:py-24 bg-blanc text-noir-profond">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-bleu-nuit mb-12">
          Pourquoi choisir ChineExpresse ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-3 bg-dore/10 rounded-full">{feature.icon}</div>
              <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-2">{feature.title}</h3>
              <p className="text-noir-profond/80 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xl font-serif text-bleu-nuit mt-12 max-w-2xl mx-auto">
          « Vous avez un besoin ? Nous trouvons le produit et vous le recevez directement chez vous. »
        </p>
      </div>
    </section>
  )
}
