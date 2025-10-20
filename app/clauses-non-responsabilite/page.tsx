export default function ClausesNonResponsabilitePage() {
  return (
    <div className="bg-blanc">
      <header className="py-16 md:py-24 bg-bleu-nuit text-blanc text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Clauses de Non-Responsabilité</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-blanc/80">
            Limitations de responsabilité et exclusions de garantie
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">
              1. Limitation générale de responsabilité
            </h2>
            <p className="text-noir-profond/80 mb-4">
              ChineExpresse fournit ses services d'importation et de logistique avec le plus grand soin. Cependant, notre
              responsabilité est limitée dans les conditions définies ci-après.
            </p>
            <p className="text-noir-profond/80 mb-4">
              En aucun cas, ChineExpresse ne pourra être tenue responsable de dommages indirects, consécutifs,
              accessoires, spéciaux ou punitifs, y compris mais sans s'y limiter :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Perte de profits ou de revenus</li>
              <li>Perte d'opportunités commerciales</li>
              <li>Perte de données ou d'informations</li>
              <li>Interruption d'activité</li>
              <li>Dommages à la réputation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">2. Responsabilité liée au transport</h2>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">2.1 Transport international</h3>
            <p className="text-noir-profond/80 mb-4">
              Pour le transport international, notre responsabilité est limitée par les conventions internationales
              applicables :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>
                <strong>Transport maritime :</strong> Convention de Hambourg (limite : 835 DTS par colis)
              </li>
              <li>
                <strong>Transport aérien :</strong> Convention de Montréal (limite : 22 DTS par kg)
              </li>
              <li>
                <strong>Transport routier :</strong> Convention CMR (limite : 8,33 DTS par kg)
              </li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">
              2.2 Exclusions de responsabilité transport
            </h3>
            <p className="text-noir-profond/80 mb-4">
              ChineExpresse ne peut être tenue responsable des dommages causés par :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Conditions météorologiques exceptionnelles</li>
              <li>Catastrophes naturelles (force majeure)</li>
              <li>Actes de guerre, terrorisme ou piraterie</li>
              <li>Grèves et mouvements sociaux</li>
              <li>Défaillance des systèmes informatiques</li>
              <li>Emballage insuffisant ou inadéquat par le client</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">3. Responsabilité douanière</h2>
            <p className="text-noir-profond/80 mb-4">ChineExpresse n'assume aucune responsabilité concernant :</p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Les modifications de réglementation douanière</li>
              <li>Les retards dus aux contrôles douaniers</li>
              <li>La saisie de marchandises par les autorités</li>
              <li>Les taxes et droits de douane supplémentaires</li>
              <li>Le refus d'importation par les autorités compétentes</li>
            </ul>
            <p className="text-noir-profond/80">
              Il appartient au client de s'assurer de la conformité de ses marchandises avec la réglementation du pays
              de destination.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">4. Responsabilité des fournisseurs</h2>
            <p className="text-noir-profond/80 mb-4">
              ChineExpresse agit en tant qu'intermédiaire dans la relation entre le client et les fournisseurs. Nous ne
              pouvons être tenus responsables de :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>La qualité des produits fournis par les fabricants</li>
              <li>Le respect des délais de production par les fournisseurs</li>
              <li>La conformité des produits aux normes locales</li>
              <li>Les défauts de fabrication ou de conception</li>
              <li>La disponibilité des produits</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">5. Limitation financière</h2>
            <p className="text-noir-profond/80 mb-4">
              En toutes circonstances, la responsabilité totale de ChineExpresse, quelle qu'en soit la cause, ne pourra
              excéder le montant des prestations facturées au client pour la commande concernée.
            </p>
            <p className="text-noir-profond/80">
              Cette limitation s'applique même si ChineExpresse a été informée de la possibilité de tels dommages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">6. Assurance recommandée</h2>
            <p className="text-noir-profond/80 mb-4">
              Compte tenu des limitations de responsabilité mentionnées ci-dessus, ChineExpresse recommande fortement à
              ses clients de souscrire :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Une assurance transport pour la valeur totale des marchandises</li>
              <li>Une assurance responsabilité civile professionnelle</li>
              <li>Une assurance crédit pour se protéger contre les défaillances de fournisseurs</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">7. Obligations du client</h2>
            <p className="text-noir-profond/80 mb-4">Pour bénéficier de nos services, le client s'engage à :</p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Fournir des informations exactes et complètes</li>
              <li>Respecter les réglementations en vigueur</li>
              <li>Signaler immédiatement tout problème ou anomalie</li>
              <li>Collaborer activement aux démarches nécessaires</li>
              <li>Payer les prestations dans les délais convenus</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">8. Cas de force majeure</h2>
            <p className="text-noir-profond/80 mb-4">
              ChineExpresse ne saurait être tenue responsable de l'inexécution ou des retards d'exécution de ses
              obligations dus à des cas de force majeure, notamment :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Catastrophes naturelles (séismes, inondations, typhons)</li>
              <li>Conflits armés et actes de terrorisme</li>
              <li>Épidémies et pandémies</li>
              <li>Décisions gouvernementales restrictives</li>
              <li>Grèves générales et blocages</li>
              <li>Pannes généralisées des systèmes de communication</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">9. Acceptation des clauses</h2>
            <p className="text-noir-profond/80 mb-4">
              L'utilisation de nos services implique l'acceptation pleine et entière des présentes clauses de
              non-responsabilité. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">Contact</h2>
            <p className="text-noir-profond/80 mb-4">
              Pour toute question concernant ces clauses de non-responsabilité :
            </p>
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
