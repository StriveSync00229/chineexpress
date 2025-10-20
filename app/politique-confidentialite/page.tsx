export default function PolitiqueConfidentialitePage() {
  return (
    <div className="bg-blanc">
      <header className="py-16 md:py-24 bg-bleu-nuit text-blanc text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Politique de Confidentialité</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-blanc/80">
            Protection et traitement de vos données personnelles
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">1. Introduction</h2>
            <p className="text-noir-profond/80 mb-4">
              ChineExpresse, représentée par Madame Mélissa, s'engage à protéger la confidentialité et la sécurité des
              données personnelles de ses clients et utilisateurs.
            </p>
            <p className="text-noir-profond/80 mb-4">
              Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos
              informations personnelles conformément aux réglementations applicables en matière de protection des
              données.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">2. Responsable du traitement</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-noir-profond/80 mb-1">
                <strong>Entreprise :</strong> ChineExpresse
              </p>
              <p className="text-noir-profond/80 mb-1">
                <strong>Représentant :</strong> Madame Mélissa
              </p>
              <p className="text-noir-profond/80 mb-1">
                <strong>Adresse :</strong> 广州市白云区鹤龙街尹边村8262联兴路20号SEA仓非快国际
              </p>
              <p className="text-noir-profond/80 mb-1">
                <strong>Email :</strong> contact@chineexpresse.com
              </p>
              <p className="text-noir-profond/80">
                <strong>Téléphone :</strong> +229 01 55 44 82 58
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">3. Données collectées</h2>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">3.1 Données d'identification</h3>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Nom et prénom</li>
              <li>Adresse postale complète</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Pays et ville de résidence</li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">3.2 Données commerciales</h3>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Historique des commandes</li>
              <li>Préférences de produits</li>
              <li>Communications avec notre service client</li>
              <li>Évaluations et commentaires</li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">3.3 Données techniques</h3>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Adresse IP</li>
              <li>Type de navigateur et version</li>
              <li>Système d'exploitation</li>
              <li>Pages visitées et durée de visite</li>
              <li>Cookies et technologies similaires</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">4. Finalités du traitement</h2>
            <p className="text-noir-profond/80 mb-4">Nous utilisons vos données personnelles pour :</p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">4.1 Exécution des services</h3>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Traitement et suivi des commandes</li>
              <li>Communication sur l'avancement des projets</li>
              <li>Facturation et gestion des paiements</li>
              <li>Service client et support technique</li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">4.2 Amélioration des services</h3>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Analyse de l'utilisation du site web</li>
              <li>Personnalisation de l'expérience utilisateur</li>
              <li>Développement de nouveaux services</li>
              <li>Études de satisfaction client</li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">4.3 Marketing (avec consentement)</h3>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Envoi de newsletters et offres promotionnelles</li>
              <li>Information sur nos nouveaux services</li>
              <li>Invitations à des événements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">5. Base légale du traitement</h2>
            <p className="text-noir-profond/80 mb-4">Le traitement de vos données repose sur :</p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>
                <strong>Exécution contractuelle :</strong> pour la fourniture de nos services
              </li>
              <li>
                <strong>Intérêt légitime :</strong> pour l'amélioration de nos services et la sécurité
              </li>
              <li>
                <strong>Consentement :</strong> pour les communications marketing
              </li>
              <li>
                <strong>Obligation légale :</strong> pour la comptabilité et les obligations fiscales
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">6. Partage des données</h2>
            <p className="text-noir-profond/80 mb-4">Vos données peuvent être partagées avec :</p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">6.1 Partenaires de service</h3>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Transporteurs et logisticiens</li>
              <li>Agents douaniers</li>
              <li>Prestataires de paiement</li>
              <li>Hébergeurs web et services cloud</li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">6.2 Autorités compétentes</h3>
            <p className="text-noir-profond/80 mb-4">
              En cas d'obligation légale ou de demande des autorités judiciaires ou administratives.
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">6.3 Garanties</h3>
            <p className="text-noir-profond/80 mb-4">
              Tous nos partenaires sont tenus par des accords de confidentialité et s'engagent à respecter la sécurité
              de vos données.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">7. Transferts internationaux</h2>
            <p className="text-noir-profond/80 mb-4">
              En raison de la nature internationale de nos services, vos données peuvent être transférées vers des pays
              tiers. Nous nous assurons que ces transferts respectent les réglementations applicables et sont protégés
              par des garanties appropriées.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">8. Durée de conservation</h2>
            <p className="text-noir-profond/80 mb-4">Nous conservons vos données :</p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>
                <strong>Données clients actifs :</strong> pendant la durée de la relation commerciale
              </li>
              <li>
                <strong>Données comptables :</strong> 10 ans après la fin de l'exercice
              </li>
              <li>
                <strong>Données marketing :</strong> 3 ans après le dernier contact
              </li>
              <li>
                <strong>Données techniques :</strong> 13 mois maximum
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">9. Vos droits</h2>
            <p className="text-noir-profond/80 mb-4">Vous disposez des droits suivants :</p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">
              9.1 Droits d'accès et de rectification
            </h3>
            <p className="text-noir-profond/80 mb-4">
              Vous pouvez demander l'accès à vos données et leur rectification si elles sont inexactes.
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">9.2 Droit à l'effacement</h3>
            <p className="text-noir-profond/80 mb-4">
              Vous pouvez demander la suppression de vos données dans certaines conditions.
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">9.3 Droit à la portabilité</h3>
            <p className="text-noir-profond/80 mb-4">
              Vous pouvez récupérer vos données dans un format structuré et lisible.
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">9.4 Droit d'opposition</h3>
            <p className="text-noir-profond/80 mb-4">
              Vous pouvez vous opposer au traitement de vos données à des fins de marketing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">10. Sécurité des données</h2>
            <p className="text-noir-profond/80 mb-4">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
              contre :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>L'accès non autorisé</li>
              <li>La modification illicite</li>
              <li>La divulgation non autorisée</li>
              <li>La perte accidentelle</li>
              <li>La destruction malveillante</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">11. Cookies</h2>
            <p className="text-noir-profond/80 mb-4">
              Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences de
              cookies dans les paramètres de votre navigateur.
            </p>
            <p className="text-noir-profond/80">
              Les cookies essentiels au fonctionnement du site ne peuvent pas être désactivés.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">12. Modifications de la politique</h2>
            <p className="text-noir-profond/80 mb-4">
              Cette politique de confidentialité peut être modifiée pour refléter les changements dans nos pratiques ou
              la réglementation. Nous vous informerons de toute modification importante par email ou via notre site web.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">13. Contact et réclamations</h2>
            <p className="text-noir-profond/80 mb-4">
              Pour exercer vos droits ou pour toute question concernant cette politique :
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-noir-profond/80 mb-1">
                <strong>Email :</strong> support@chineexpresse.com / contact@chineexpresse.com
              </p>
              <p className="text-noir-profond/80 mb-1">
                <strong>Téléphone :</strong> +229 01 55 44 82 58
              </p>
              <p className="text-noir-profond/80">
                <strong>Adresse :</strong> 广州市白云区鹤龙街尹边村8262联兴路20号SEA仓非快国际
              </p>
            </div>
            <p className="text-noir-profond/80">
              Si vous n'êtes pas satisfait de notre réponse, vous pouvez introduire une réclamation auprès de l'autorité
              de protection des données compétente.
            </p>
          </section>

          <section className="mb-8">
            <p className="text-sm text-noir-profond/60 italic">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
