import ContactFormSection from "@/components/contact/contact-form-section"
import CoordonneesSection from "@/components/contact/coordonnees-section"
import Image from "next/image"
import { Suspense } from "react" // Importer Suspense

export default function ContactPage() {
  return (
    <div className="bg-blanc">
      <header className="py-16 md:py-24 bg-bleu-nuit text-blanc text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Contactez-Nous</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-blanc/80">
            Nous sommes à votre écoute pour tous vos besoins d'importation ou questions sur nos services et formations.
          </p>
        </div>
      </header>
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Suspense
            fallback={
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg min-h-[600px] flex items-center justify-center">
                <p className="text-bleu-nuit text-lg">Chargement du formulaire...</p>
              </div>
            }
          >
            <ContactFormSection />
          </Suspense>
          <CoordonneesSection />
        </div>
      </div>
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-bleu-nuit mb-8">Nous Localiser</h2>
          <div className="relative aspect-[16/7] max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://source.unsplash.com/1200x400/?modern,office,building,location"
              alt="Carte légère et icône WhatsApp"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
