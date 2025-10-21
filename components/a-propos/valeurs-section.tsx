import { ShieldCheck, Eye, Zap } from "lucide-react"

const values = [
  {
    icon: <ShieldCheck size={40} className="text-dore" />,
    name: "Confiance",
    description: "Nous bâtissons des relations durables basées sur l'intégrité et la fiabilité.",
  },
  {
    icon: <Eye size={40} className="text-dore" />,
    name: "Transparence",
    description: "Une communication claire et honnête à chaque étape de votre projet d'importation.",
  },
  {
    icon: <Zap size={40} className="text-dore" />,
    name: "Réactivité",
    description: "Nous sommes à votre écoute et agissons rapidement pour répondre à vos besoins.",
  },
]

export default function ValeursSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-bleu-nuit text-center mb-12">
          Nos Valeurs Fondamentales
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {values.map((value, index) => (
            <div
              key={value.name}
              className="group p-8 bg-gray-50 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-2xl font-serif font-semibold text-bleu-nuit mb-2 group-hover:text-dore transition-colors duration-300">
                {value.name}
              </h3>
              <p className="text-noir-profond/80 group-hover:text-noir-profond transition-colors duration-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
