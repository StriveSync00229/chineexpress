import Image from "next/image"

export default function PortraitMelissaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square max-w-md mx-auto md:mx-0 rounded-lg overflow-hidden shadow-xl">
          <Image
              src="/equipe-chineexpress-reunion.jpg"
              alt="Équipe de ChineExpresse en réunion"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-bleu-nuit mb-6">
              ChineExpresse : Votre Partenaire Expert en Importation
            </h2>
            <p className="text-lg text-noir-profond/80 mb-4">
              Fondée sur une passion pour le commerce international et une solide expertise en gestion et logistique,
              ChineExpresse a été créée pour simplifier l'importation depuis la Chine pour les entrepreneurs et
              entreprises.
            </p>
            <p className="text-noir-profond/80">
              Notre mission : vous offrir un service clé en main, transparent et efficace, pour que vous puissiez vous
              concentrer sur la croissance de votre activité. Nous combinons rigueur financière et connaissance
              approfondie du marché chinois pour garantir le succès de vos opérations d'import.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
