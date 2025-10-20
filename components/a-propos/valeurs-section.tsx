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
          {values.map((value) => (
            <div key={value.name} className="p-8 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-2xl font-serif font-semibold text-bleu-nuit mb-2">{value.name}</h3>
              <p className="text-noir-profond/80">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
