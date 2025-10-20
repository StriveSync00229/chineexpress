import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface ServiceItemCardProps {
  icon: React.ReactElement<LucideIcon>
  title: string
  description: string
  ctaLink: string
  ctaText: string
}

export default function ServiceItemCard({ icon, title, description, ctaLink, ctaText }: ServiceItemCardProps) {
  return (
    <div className="group relative bg-blanc-pur p-8 rounded-lg shadow-md hover:shadow-xl 
                    border border-gris-anthracite/10 hover:border-dore/40
                    transform hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer
                    animate-fade-in-up overflow-hidden">
      
      {/* Effet de fond animé au hover avec doré */}
      <div className="absolute inset-0 bg-gradient-to-br from-dore/8 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="p-4 bg-gradient-to-br from-dore/15 to-yellow-400/10
                          group-hover:from-dore/25 group-hover:to-yellow-400/15
                          rounded-full mr-4 shadow-sm group-hover:shadow-md
                          transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <div className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300
                           filter drop-shadow-sm">
              {/* Icône avec couleur dorée et effet de brillance */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative text-dore group-hover:text-yellow-500 transition-colors duration-300">
                  {icon}
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-logo-titres font-semibold text-gris-anthracite 
                         group-hover:text-dore transition-colors duration-300">
            {title}
          </h3>
        </div>
        
        <p className="text-gris-anthracite/70 mb-6 flex-grow leading-relaxed 
                     group-hover:text-gris-anthracite transition-colors duration-300">
          {description}
        </p>
        
        <Button
          asChild
          className="mt-auto bg-gradient-to-r from-dore to-yellow-500 text-gris-anthracite
                     hover:from-yellow-600 hover:to-dore font-boutons font-medium
                     w-full sm:w-auto self-start transform group-hover:scale-105 transition-all duration-300
                     shadow-md group-hover:shadow-lg border-0"
        >
          <Link href={ctaLink} className="flex items-center gap-2">
            <span>{ctaText}</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </Button>
      </div>
      
      {/* Particules flottantes avec doré */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-dore/50 rounded-full 
                      opacity-0 group-hover:opacity-100 group-hover:animate-bounce 
                      transition-opacity duration-300 shadow-sm" style={{ animationDelay: '0.1s' }} />
      <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-yellow-400/60 rounded-full 
                      opacity-0 group-hover:opacity-100 group-hover:animate-bounce 
                      transition-opacity duration-300 shadow-sm" style={{ animationDelay: '0.3s' }} />
      
      {/* Étincelles dorées supplémentaires */}
      <div className="absolute top-6 right-12 w-1 h-1 bg-yellow-400/70 rounded-full 
                      opacity-0 group-hover:opacity-100 group-hover:animate-ping 
                      transition-opacity duration-300" style={{ animationDelay: '0.5s' }} />
    </div>
  )
}