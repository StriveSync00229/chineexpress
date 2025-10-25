import Link from "next/link"
import Logo from "@/components/layout/logo"
import { Mail, Phone, MapPin } from "lucide-react"

import { Facebook, Linkedin, Instagram } from 'lucide-react'

// Composant SVG personnalisé pour TikTok (depuis Bootstrap Icons)
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-bleu-nuit text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-white">ChineExpresse est une entreprise spécialisée dans l'import-export de produits en provenance de Chine. Elle propose également des services de formation dans divers domaines. L'objectif est de permettre à ses clients d'accéder à des produits à prix compétitifs tout leur permettant de gagner de l'argent.</p>
          </div>
          <div>
            <h3 className="font-semibold text-dore mb-4">Navigation</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/a-propos" className="text-sm hover:text-dore transition-colors">
                À propos
              </Link>
              <Link href="/mes-services" className="text-sm hover:text-dore transition-colors">
                Mes services
              </Link>
              <Link href="/formation-alibaba" className="text-sm hover:text-dore transition-colors">
                Formation
              </Link>
              <Link href="/contact" className="text-sm hover:text-dore transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-dore font-semibold mb-4">Légal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/conditions-generales-vente" className="text-sm hover:text-dore transition-colors">
                CGA
              </Link>
              <Link href="/conditions-utilisation-services" className="text-sm hover:text-dore transition-colors">
                Conditions d'utilisation
              </Link>
              <Link href="/mentions-legales" className="text-sm hover:text-dore transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-sm hover:text-dore transition-colors">
                Confidentialité
              </Link>
              <Link href="/retours-rappels" className="text-sm hover:text-dore transition-colors">
                Retours & Rappels
              </Link>
              <Link href="/clauses-non-responsabilite" className="text-sm hover:text-dore transition-colors">
                Non-responsabilité
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-dore mb-4">Contact</h3>
            <div className="text-sm text-white space-y-2">
              <p className="flex text-white"><MapPin size={16} className="text-dore mr-3 mt-1 flex-shrink-0" />
              contact@chineexpresse.com</p>
              <p className="flex text-white"><Phone size={16} className="text-dore mr-3 mt-1 flex-shrink-0" />
              +229 01 55 44 82 58</p>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href="https://www.facebook.com/share/1AZ25McuRZ" aria-label="Facebook" className="text-white hover:text-dore" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </Link>
              <Link href="https://www.instagram.com/chineexpresse.bj?igsh=Mzh4aDlhOHY5dTB6&utm_source=qr" aria-label="Instagram" className="text-white hover:text-dore" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </Link>
              <Link href="https://www.tiktok.com/@chineexpresse.bj" aria-label="TikTok" className="text-white hover:text-dore" target="_blank" rel="noopener noreferrer">
                <TikTokIcon size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/70">
          &copy; {new Date().getFullYear()} ChineExpresse. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
