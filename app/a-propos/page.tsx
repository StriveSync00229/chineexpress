import PortraitMelissaSection from "@/components/a-propos/portrait-melissa-section"
import ParcoursExpertiseSection from "@/components/a-propos/parcours-expertise-section"
import ValeursSection from "@/components/a-propos/valeurs-section"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="bg-blanc">
      <header className="py-16 md:py-24 bg-bleu-nuit text-blanc text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">À Propos de ChineExpresse</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-blanc/80">
            Découvrez l'expertise et l'engagement de ChineExpresse, votre partenaire privilégié pour l'import depuis la
            Chine.
          </p>
        </div>
      </header>
      <PortraitMelissaSection />
      <ParcoursExpertiseSection />
      <ValeursSection />
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-bleu-nuit mb-8">
            Notre Vision : Connecter les Opportunités
          </h2>
          <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://source.unsplash.com/1200x600/?map,network,connection,china,africa"
              alt="Carte stylisée Chine-Afrique avec icônes de partenaires"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-bleu-nuit/30 flex items-center justify-center">
              <p className="text-xl md:text-2xl font-serif text-blanc font-semibold p-4 bg-black/30 rounded">
                Partenariats Stratégiques Chine - Afrique
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
