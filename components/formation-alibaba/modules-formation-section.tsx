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
            <div
              key={index}
              className="group p-6 bg-blanc rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out animate-fade-in-up border border-gray-100 hover:border-dore/40"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-dore/10 rounded-full mr-4 group-hover:bg-dore/20 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                  {module.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-bleu-nuit group-hover:text-dore transition-colors duration-300">
                  {module.title}
                </h3>
              </div>
              <p className="text-noir-profond/80 group-hover:text-noir-profond transition-colors duration-300 leading-relaxed">
                {module.description}
              </p>

              {/* Particules flottantes avec doré */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-dore/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-300 shadow-sm" style={{ animationDelay: '0.1s' }} />
              <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-yellow-400/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-300 shadow-sm" style={{ animationDelay: '0.3s' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
