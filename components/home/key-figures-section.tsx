import { Users, PackageCheck, Smile } from "lucide-react"

const figures = [
  {
    icon: <Users size={48} className="text-dore" />,
    value: "+100",
    label: "Clients satisfaits",
  },
  {
    icon: <PackageCheck size={48} className="text-dore" />,
    value: "+50",
    label: "Tonnes importées en 2024",
  },
  {
    icon: <Smile size={48} className="text-dore" />,
    value: "98%",
    label: "Taux de satisfaction",
  },
]

export default function KeyFiguresSection() {
  return (
    <section className="py-16 md:py-24 bg-bleu-nuit text-blanc">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">Nos Résultats en Chiffres</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {figures.map((figure, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border border-dore/30 rounded-lg bg-blanc/5 hover:bg-blanc/10 transition-colors"
            >
              <div className="mb-4">{figure.icon}</div>
              <p className="text-4xl font-bold text-dore mb-2">{figure.value}</p>
              <p className="text-lg text-blanc/80">{figure.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
