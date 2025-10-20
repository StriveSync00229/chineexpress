import { Award, Briefcase, Users } from 'lucide-react'

const expertiseItems = [
  {
    icon: <Award size={32} className="text-dore" />,
    title: "Rigueur Financière et Comptable",
    description: "Une base solide pour une gestion financière rigoureuse de vos importations et projets.",
  },
  {
    icon: <Briefcase size={32} className="text-dore" />,
    title: "Expertise Éprouvée en Import-Export",
    description:
      "Une connaissance approfondie des dynamiques du commerce international et des spécificités du marché chinois, acquise sur des années.",
  },
  {
    icon: <Users size={32} className="text-dore" />,
    title: "Réseau de Partenaires Stratégiques en Chine",
    description:
      "Un réseau fiable de fournisseurs et de partenaires logistiques pour des opérations fluides et sécurisées.",
  },
]

export default function ParcoursExpertiseSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-bleu-nuit text-center mb-12">
          Parcours et Expertises
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {expertiseItems.map((item, index) => (
            <div key={index} className="p-6 bg-blanc rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {item.icon}
                <h3 className="ml-3 text-xl font-serif font-semibold text-bleu-nuit">{item.title}</h3>
              </div>
              <p className="text-noir-profond/80">{item.description.replace(/ChineExpress/g, "ChineExpresse")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
