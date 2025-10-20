import ServicesListSection from "@/components/mes-services/services-list-section"

export default function ServicesPage() {
  return (
    <div className="bg-blanc">
      <header className="py-16 md:py-24 bg-bleu-nuit text-blanc text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Nos Services d'Importation</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-blanc/80">
            Des solutions complètes et sur mesure pour faciliter vos importations depuis la Chine.
          </p>
        </div>
      </header>
      <ServicesListSection />
    </div>
  )
}
