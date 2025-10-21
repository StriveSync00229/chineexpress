export default function ConditionsGeneralesVentePage() {
  return (
    <div className="bg-white">
      <header className="py-16 md:py-24 bg-bleu-nuit text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl text-dore md:text-5xl font-serif font-bold">Mentions Légales</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white">
            Informations légales et mentions obligatoires de Chineexpresse
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">1. Identification de l'entreprise</h2>
            <p className="text-noir-profond/80 mb-4">
              <strong>Nom de l'entreprise :</strong> Chineexpresse
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Forme juridique et capital :</strong> SARL au capital de 750 000 US
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Siège social :</strong> 广州市白云区鹤龙街尹边村8262联兴路20号SEA仓非快国际
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Email :</strong> contact@chineexpresse.com
            </p>
            <p className="text-noir-profond/80">
              <strong>Téléphone :</strong> +229 01 55 44 82 58
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">2. Propriété intellectuelle</h2>
            <p className="text-noir-profond/80">
              Tous les éléments (textes, images, logos, icônes, vidéos, documents téléchargeables, etc.) présents sur le site de Chineexpresse sont protégés par le droit d'auteur, les marques et autres droits de propriété intellectuelle. Toute reproduction ou représentation totale ou partielle, modification, adaptation, traduction ou commercialisation de ces contenus, par quelque procédé que ce soit, est strictement interdite sans l'autorisation écrite préalable de Chineexpresse.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">3. Protection des données personnelles</h2>
            <p className="text-noir-profond/80 mb-4">
              <strong>Données collectées :</strong> nom, prénom, adresse, email, téléphone, informations douanières, données de suivi d'envoi.
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Finalités :</strong> gestion des expéditions, relation client, facturation, suivi logistique, conformité réglementaire.
            </p>
            <p className="text-noir-profond/80">
              <strong>Droits des personnes :</strong> droit d'accès, de rectification, d'effacement et d'opposition. Pour exercer ces droits, adressez votre demande au support.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">4. Responsabilité</h2>
            <p className="text-noir-profond/80 mb-4">
              Chineexpresse vérifie la conformité apparente des colis avant remise aux transporteurs. Passé ce transfert, sa responsabilité se limite à l'assistance à la réclamation auprès des transporteurs tiers.
            </p>
            <p className="text-noir-profond/80">
              En aucun cas Chineexpresse ne pourra être tenue pour responsable des retards, pertes ou dommages survenus après remise au transporteur, ni des conséquences indirectes subies par le Client.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">5. Cookies</h2>
            <p className="text-noir-profond/80">
              Le site Chineexpresse utilise des cookies pour améliorer la navigation, mesurer l'audience et mémoriser vos préférences. Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté de leur utilisation. Le refus de certains cookies peut toutefois altérer votre expérience utilisateur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">6. Litiges</h2>
            <p className="text-noir-profond/80">
              En cas de différend, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut d'accord, les tribunaux de la République du Bénin (Tribunal de Commerce de Cotonou) seront seuls compétents.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">7. Contact</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-noir-profond/80 mb-2">
                <strong>Email :</strong> contact@chineexpresse.com
              </p>
              <p className="text-noir-profond/80">
                <strong>Téléphone :</strong> +229 01 55 44 82 58
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}