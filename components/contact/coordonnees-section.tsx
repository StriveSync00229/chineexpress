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
              <a href="mailto:contact@chineexpresse.com" className="hover:text-dore">
              contact@chineexpresse.com
              </a>
            </div>
          </div>
          <div className="flex items-start">
            <Phone size={24} className="text-dore mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-bleu-nuit">Téléphone</h3>
              <a href="tel:+229 01 55 44 82 58" className="hover:text-dore">
              +229 01 55 44 82 58
              </a>{" "}
            </div>
          </div>
          <div className="flex items-start">
            <MapPin size={24} className="text-dore mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-bleu-nuit">Localisation</h3>
              <p>广州市白云区鹤龙街尹边村8262联兴路20号SEA仓非快国际
              <br />
              Abomey Calavi, République du Bénin</p> 
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
