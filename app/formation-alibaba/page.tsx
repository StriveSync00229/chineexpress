import PresentationFormationSection from "@/components/formation-alibaba/presentation-formation-section"
import ModulesFormationSection from "@/components/formation-alibaba/modules-formation-section"
import FormatTarifFormationSection from "@/components/formation-alibaba/format-tarif-formation-section"
import Image from "next/image"

export default function FormationAlibabaPage() {
  return (
    <div className="bg-blanc">
      <header className="py-16 md:py-24 bg-bleu-nuit text-blanc text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Formation Pratique Alibaba</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-blanc/80">
            Maîtrisez la plateforme Alibaba pour sourcer vous-même vos produits en toute confiance.
          </p>
        </div>
      </header>
      <PresentationFormationSection />
      <ModulesFormationSection />
      <FormatTarifFormationSection />
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-bleu-nuit mb-8">
            Visualisez Votre Succès sur Alibaba
          </h2>
          <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://source.unsplash.com/1200x600/?ecommerce,dashboard,online,learning"
              alt="Capture d'écran d'Alibaba et icônes de formation"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-bleu-nuit/30 flex items-center justify-center">
              <p className="text-xl md:text-2xl font-serif text-blanc font-semibold p-4 bg-black/30 rounded">
                Devenez un expert Alibaba
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
