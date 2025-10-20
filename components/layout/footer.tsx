import Link from "next/link"
import Logo from "@/components/layout/logo"
import { Facebook, Linkedin, Instagram, TwitterIcon as TikTok } from 'lucide-react' // Added TikTok import

export default function Footer() {
  return (
    <footer className="bg-bleu-nuit text-blanc py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-blanc/70">Votre partenaire de confiance pour l'import depuis la Chine.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
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
            <h3 className="font-semibold mb-4">Légal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/conditions-generales-vente" className="text-sm hover:text-dore transition-colors">
                CGV
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
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="text-sm text-blanc/70 space-y-2">
              <p>contact@chineexpresse.com</p>
              <p>+229 01 55 44 82 58</p>
              <p>广州市白云区鹤龙街尹边村8262联兴路20号SEA仓非快国际</p>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href="#" aria-label="Facebook" className="text-blanc/70 hover:text-dore">
                <Facebook size={20} />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-blanc/70 hover:text-dore">
                <Linkedin size={20} />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-blanc/70 hover:text-dore">
                <Instagram size={20} />
              </Link>
              <Link href="#" aria-label="TikTok" className="text-blanc/70 hover:text-dore">
                <TikTok size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-blanc/20 pt-8 text-center text-sm text-blanc/70">
          &copy; {new Date().getFullYear()} ChineExpresse. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
