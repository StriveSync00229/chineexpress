import { UserPlus, Search, MessageSquareWarning, Settings2 } from "lucide-react"

const modules = [
  {
    icon: <UserPlus size={32} className="text-dore" />,
    title: "Création de votre compte professionnel",
    description:
      "Configuration optimale de votre profil pour inspirer confiance et accéder à toutes les fonctionnalités.",
  },
  {
    icon: <Search size={32} className="text-dore" />,
    title: "Recherche et évaluation de fournisseurs",
    description: "Techniques pour trouver des fournisseurs fiables, vérifier leur crédibilité et éviter les arnaques.",
  },
  {
    icon: <MessageSquareWarning size={32} className="text-dore" />,
    title: "Négociation et gestion des litiges",
    description: "Stratégies de négociation efficaces et méthodes pour résoudre les conflits potentiels.",
  },
  {
    icon: <Settings2 size={32} className="text-dore" />,
    title: "Optimisation des coûts logistiques",
    description: "Comprendre les Incoterms, choisir les bonnes options d'expédition et minimiser les frais.",
  },
]

export default function ModulesFormationSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-bleu-nuit text-center mb-12">
          Modules Clés de la Formation
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <div key={index} className="p-6 bg-blanc rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {module.icon}
                <h3 className="ml-3 text-xl font-serif font-semibold text-bleu-nuit">{module.title}</h3>
              </div>
              <p className="text-noir-profond/80">{module.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
