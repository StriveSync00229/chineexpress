import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, Plane } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative bg-bleu-nuit text-white min-h-[calc(100vh-80px)] flex items-center justify-center py-20 overflow-hidden">
      <Image
        src="https://source.unsplash.com/1920x1080/?abstract,global,network,logistics"
        alt="Arrière-plan abstrait logistique"
        layout="fill"
        objectFit="cover"
        className="opacity-20 z-0"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bleu-nuit/50 to-bleu-nuit z-10"></div>
      <div className="container mx-auto px-4 md:px-6 text-center relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Package size={32} className="text-dore" />
            <Plane size={32} className="text-dore" />
          </div>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Importez de Chine sans stress :<br /> nous nous occupons de tout pour vous
          </h1>
          <p className="text-lg text-white md:text-xl text-white/80 mb-10">
            ChineExpresse : Votre partenaire expert en importation et logistique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-dore text-bleu-nuit hover:bg-dore/90 font-semibold px-8 py-3">
              <Link href="#contact-form-home">Demande de sourcing</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-dore text-dore hover:bg-dore/10 hover:text-dore font-semibold px-8 py-3" // Removed bg-transparent
            >
              <Link href="/formation-alibaba">Formation pratique Alibaba</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
