export default function ConditionsGeneralesVentePage() {
  return (
    <div className="bg-white">
      <header className="py-16 md:py-24 bg-bleu-nuit text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl text-dore md:text-5xl font-serif font-bold">Clause de non-responsabilité</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/80">
            Limitations de responsabilité et exclusions de garantie de Chineexpresse
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">1. Limitation générale de responsabilité</h2>
            <p className="text-noir-profond/80 mb-4">
              Chineexpresse agit en tant qu'intermédiaire logistique et prestataire de services d'affrètement pour le compte du Client. En aucun cas, Chineexpresse ne pourra être tenue responsable :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Des dommages directs ou indirects, pertes de profits, interruptions d'activité ou préjudices immatériels résultant de l'utilisation de ses services.</li>
              <li>Des contenus, produits ou services fournis par des tiers (transporteurs, fournisseurs, marketplaces).</li>
              <li>Des erreurs techniques, pannes ou interruptions de service imputables à des facteurs externes (hébergeurs, opérateurs télécom, fournisseurs d'accès Internet, etc.).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">2. Responsabilité logistique</h2>
            <p className="text-noir-profond/80 mb-4">
              Une fois les colis remis au transporteur désigné, la responsabilité de Chineexpresse est limitée à l'assistance dans les réclamations ; les litiges relatifs aux retards, pertes ou dommages relèvent exclusivement des conditions contractualisées avec le transporteur.
            </p>
            <p className="text-noir-profond/80">
              En cas de force majeure (catastrophes naturelles, conflits armés, grèves, pandémies, décisions gouvernementales), Chineexpresse est exonérée de toute obligation de respect des délais estimés.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">3. Produits et fournisseurs tiers</h2>
            <p className="text-noir-profond/80 mb-4">
              Chineexpresse ne garantit pas la qualité, la conformité réglementaire ou la sécurité des marchandises expédiées par le Client, ni celles achetées pour son compte auprès de fournisseurs externes.
            </p>
            <p className="text-noir-profond/80">
              Toute réclamation relative à un défaut de fabrication, une erreur de description ou un vice caché doit être adressée directement au fournisseur ou au fabricant concerné.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">4. Transactions financières</h2>
            <p className="text-noir-profond/80 mb-4">
              Chineexpresse n'est pas responsable des retards ou erreurs de paiement liés aux institutions financières (banques, Mobile Money, plateformes de paiement), ni des erreurs techniques indépendantes de sa volonté.
            </p>
            <p className="text-noir-profond/80">
              Les litiges relatifs aux fluctuations de taux de change, frais bancaires ou réglementations monétaires incombent exclusivement au Client.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">5. Données et sécurité</h2>
            <p className="text-noir-profond/80 mb-4">
              Chineexpresse met en œuvre des mesures de sécurité conformes aux bonnes pratiques de l'industrie pour protéger les données clients, mais ne peut garantir une protection absolue contre les cyberattaques, pertes de données ou accès non autorisés.
            </p>
            <p className="text-noir-profond/80">
              Le Client est seul responsable de la sauvegarde de ses données et de la confidentialité de ses identifiants d'accès.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">6. Conformité légale et douanière</h2>
            <p className="text-noir-profond/80 mb-4">
              Le Client assume l'entière responsabilité du respect des réglementations douanières, fiscales et commerciales applicables au Bénin ou dans le pays de destination.
            </p>
            <p className="text-noir-profond/80">
              Tous droits de douane, taxes à l'importation, frais administratifs ou amendes résultant d'un non-respect de ces réglementations sont à la charge du Client.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">7. Absence de garanties</h2>
            <p className="text-noir-profond/80">
              Les services de Chineexpresse sont fournis « en l'état » et « selon disponibilité », sans garantie expresse ou implicite quant à leur adéquation à un usage particulier, leur continuité ou leur qualité marchande.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">8. Plafonnement de responsabilité</h2>
            <p className="text-noir-profond/80">
              En cas de responsabilité prouvée de Chineexpresse, l'indemnisation due au Client ne pourra excéder le montant total des frais facturés par Chineexpresse pour la transaction concernée, hors dommages-intérêts éventuellement accordés par une juridiction compétente.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}