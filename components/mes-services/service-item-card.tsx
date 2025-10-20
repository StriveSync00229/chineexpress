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
    <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-dore/20 rounded-full mr-4">{icon}</div>
        <h3 className="text-2xl font-serif font-semibold text-bleu-nuit">{title}</h3>
      </div>
      <p className="text-noir-profond/80 mb-6 flex-grow">{description}</p>
      <Button
        asChild
        className="mt-auto bg-dore text-bleu-nuit hover:bg-dore/90 font-semibold w-full sm:w-auto self-start"
      >
        <Link href={ctaLink}>{ctaText}</Link>
      </Button>
    </div>
  )
}
