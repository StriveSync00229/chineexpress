import { Mail, Phone, MapPin } from "lucide-react"

export default function CoordonneesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-bleu-nuit mb-6">Nos Coordonnées</h2>
        <div className="space-y-4 text-noir-profond/80">
          <div className="flex items-start">
            <Mail size={24} className="text-dore mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-bleu-nuit">Email</h3>
              <a href="mailto:contact@chineexpress.com" className="hover:text-dore">
                contact@chineexpress.com
              </a>
            </div>
          </div>
          <div className="flex items-start">
            <Phone size={24} className="text-dore mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-bleu-nuit">Téléphone</h3>
              <a href="tel:+33123456789" className="hover:text-dore">
                +33 1 23 45 67 89
              </a>{" "}
              {/* Replace with actual number */}
            </div>
          </div>
          <div className="flex items-start">
            <MapPin size={24} className="text-dore mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-bleu-nuit">Bureau (sur RDV)</h3>
              <p>123 Rue de l'Import, 75000 Paris, France</p> {/* Replace with actual address if relevant */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">Horaires d'ouverture</h3>
        <p className="text-noir-profond/80">Lundi - Vendredi : 9h00 - 18h00</p>
        <p className="text-noir-profond/80">Samedi - Dimanche : Fermé</p>
      </div>
    </div>
  )
}
