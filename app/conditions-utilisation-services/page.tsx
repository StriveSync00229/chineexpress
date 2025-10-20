export default function ConditionsUtilisationServicesPage() {
  return (
    <div className="bg-blanc">
      <header className="py-16 md:py-24 bg-bleu-nuit text-blanc text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            Conditions d'Utilisation de Nos Services Logistiques
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-blanc/80">
            Modalités d'utilisation de nos services de logistique internationale
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">Article 1 - Définitions</h2>
            <p className="text-noir-profond/80 mb-4">
              <strong>Services logistiques :</strong> Ensemble des prestations de transport, stockage, manutention,
              dédouanement et livraison proposées par ChineExpresse.
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Client :</strong> Toute personne physique ou morale ayant recours aux services logistiques de
              ChineExpresse.
            </p>
            <p className="text-noir-profond/80">
              <strong>Marchandises :</strong> Tous biens confiés à ChineExpresse pour transport et/ou stockage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">Article 2 - Champ d'application</h2>
            <p className="text-noir-profond/80 mb-4">
              Les présentes conditions s'appliquent à tous les services logistiques fournis par ChineExpresse, notamment
              :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Transport maritime, aérien et terrestre</li>
              <li>Stockage et entreposage</li>
              <li>Dédouanement import/export</li>
              <li>Livraison finale</li>
              <li>Assurance transport</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">Article 3 - Obligations du client</h2>
            <p className="text-noir-profond/80 mb-4">Le client s'engage à :</p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Fournir des informations exactes sur les marchandises (nature, poids, dimensions, valeur)</li>
              <li>Respecter la réglementation douanière et les restrictions d'importation</li>
              <li>Emballer correctement les marchandises selon les standards internationaux</li>
              <li>Payer les frais convenus dans les délais impartis</li>
              <li>Être présent ou représenté lors de la livraison</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">
              Article 4 - Marchandises interdites ou restreintes
            </h2>
            <p className="text-noir-profond/80 mb-4">ChineExpresse refuse le transport des marchandises suivantes :</p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Matières dangereuses, explosives ou inflammables</li>
              <li>Produits périssables sans accord préalable</li>
              <li>Marchandises illégales ou contrefaites</li>
              <li>Animaux vivants</li>
              <li>Objets de valeur non déclarés (bijoux, métaux précieux)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">
              Article 5 - Tarification et facturation
            </h2>
            <p className="text-noir-profond/80 mb-4">
              Les tarifs sont calculés selon le poids volumétrique ou réel (le plus avantageux pour le client). Ils
              incluent :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Frais de transport principal</li>
              <li>Frais de manutention</li>
              <li>Frais de dédouanement (le cas échéant)</li>
              <li>Livraison finale</li>
            </ul>
            <p className="text-noir-profond/80">
              Les frais supplémentaires (stockage prolongé, livraisons multiples, etc.) sont facturés en sus.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">Article 6 - Délais de transport</h2>
            <p className="text-noir-profond/80 mb-4">
              Les délais de transport sont indicatifs et peuvent varier selon :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Les conditions météorologiques</li>
              <li>Les formalités douanières</li>
              <li>La disponibilité des moyens de transport</li>
              <li>Les contraintes réglementaires</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">
              Article 7 - Assurance et responsabilité
            </h2>
            <p className="text-noir-profond/80 mb-4">
              ChineExpresse propose une assurance transport optionnelle. En l'absence d'assurance, notre responsabilité
              est limitée selon les conventions internationales applicables (Convention de Montréal pour le transport
              aérien, Convention de Hambourg pour le transport maritime).
            </p>
            <p className="text-noir-profond/80">
              Le client doit déclarer toute avarie dans les 7 jours suivant la réception.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">Article 8 - Stockage</h2>
            <p className="text-noir-profond/80 mb-4">
              Le stockage gratuit est limité à 7 jours ouvrables. Au-delà, des frais de stockage sont appliqués selon
              notre tarif en vigueur.
            </p>
            <p className="text-noir-profond/80">
              Les marchandises non réclamées après 30 jours peuvent être vendues aux enchères pour couvrir les frais
              engagés.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">Contact</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-noir-profond/80 mb-1">
                <strong>Email :</strong> support@Chineexpresse.com / contact@Chineexpresse.com
              </p>
              <p className="text-noir-profond/80 mb-1">
                <strong>Téléphone :</strong> +229 01 55 44 82 58
              </p>
              <p className="text-noir-profond/80">
                <strong>Adresse :</strong> 广州市白云区鹤龙街尹边村8262联兴路20号SEA仓非快国际
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
