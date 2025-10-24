import { Award, Briefcase, Users } from 'lucide-react'
import Image from "next/image"

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
        <div className="text-center mb-12">
          <div className="relative aspect-video max-w-4xl mx-auto mb-8 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/personnes-au-bureau-pendant-une-journee-de-travail.jpg"
              alt="Équipe de ChineExpresse en réunion"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-bleu-nuit">
            Notre Équipe en Action
          </h2>
          <p className="text-lg text-noir-profond/80 mt-4 max-w-2xl mx-auto">
            Une équipe passionnée et experte, réunie pour vous offrir le meilleur service d'importation depuis la Chine.
          </p>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-bleu-nuit text-center mb-12">
          Parcours et Expertises
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {expertiseItems.map((item, index) => (
            <div
              key={index}
              className="group p-6 bg-blanc rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out animate-fade-in-up border border-gray-100 hover:border-dore/30"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-dore/10 rounded-full mr-4 group-hover:bg-dore/20 transition-all duration-300 transform group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-bleu-nuit group-hover:text-dore transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
              <p className="text-noir-profond/80 group-hover:text-noir-profond transition-colors duration-300 leading-relaxed">
                {item.description.replace(/ChineExpress/g, "ChineExpresse")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}