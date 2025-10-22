export default function PolitiqueConfidentialitePage() {
  return (
    <div className="bg-white">
      <header className="py-16 md:py-24 bg-bleu-nuit text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl text-dore md:text-5xl font-serif font-bold">Politique de Confidentialité</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white">
            Protection et traitement de vos données personnelles
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">1. Introduction</h2>
            <p className="text-noir-profond/80 mb-4">
              Chez chineexpresse, la confidentialité et la sécurité de vos données personnelles sont une priorité. 
              Cette politique de confidentialité explique quelles informations nous collectons, comment nous les utilisons, 
              avec qui nous les partageons et quels droits vous avez concernant vos données personnelles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">2. Données collectées</h2>
            
            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">Données fournies par l'utilisateur :</h3>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Nom, prénom, adresse postale, numéro de téléphone, adresse e-mail, informations de paiement, etc.</li>
              <li>Toute autre donnée que vous partagez volontairement, par exemple lors de la création d'un compte ou via des formulaires.</li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">Données collectées automatiquement :</h3>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Adresse IP, type et version de navigateur, appareil utilisé, pages visitées, durée de navigation, cookies et technologies similaires.</li>
              <li>Données d'utilisation concernant vos interactions avec nos services (clics, préférences, historique d'achat).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">3. Finalités et bases légales d'utilisation des données</h2>
            <p className="text-noir-profond/80 mb-4">Vos données personnelles sont utilisées pour :</p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Fournir nos services, traiter vos commandes et gérer votre compte utilisateur (exécution du contrat).</li>
              <li>Communiquer avec vous concernant vos commandes, nos services, ou pour des fins promotionnelles (sur la base de votre consentement).</li>
              <li>Améliorer l'expérience utilisateur grâce à des recommandations personnalisées et des fonctionnalités adaptées (intérêt légitime).</li>
              <li>Garantir la sécurité et la conformité légale de nos services (obligations légales).</li>
              <li>Analyser et comprendre l'utilisation de nos plateformes pour améliorer nos produits et services (intérêt légitime).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">4. Partage des données</h2>
            <p className="text-noir-profond/80 mb-4">
              Nous nous engageons à ne pas vendre vos données personnelles. Toutefois, elles peuvent être partagées dans les cas suivants :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Avec votre consentement (par exemple, pour des campagnes marketing ciblées).</li>
              <li>Avec des prestataires tiers strictement nécessaires à la fourniture de nos services (hébergeurs, fournisseurs de paiement, prestataires de livraison, partenaires marketing), qui sont soumis à des engagements de confidentialité.</li>
              <li>En cas d'obligations légales ou judiciaires valides.</li>
              <li>En cas de fusion, acquisition ou restructuration, vos données pourraient être transférées à l'entité concernée.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">5. Sécurité des données</h2>
            <p className="text-noir-profond/80 mb-4">
              Chineexpresse met en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Chiffrement des données sensibles lors de la transmission.</li>
              <li>Accès restreint aux données aux seuls employés et partenaires habilités.</li>
              <li>Audits réguliers pour prévenir les vulnérabilités.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">5 bis. Gestion des violations de données</h2>
            <p className="text-noir-profond/80 mb-4">
              En cas de violation de données à caractère personnel susceptible de porter atteinte à vos droits ou libertés, 
              Chineexpresse appliquera les procédures légales de notification aux autorités compétentes et vous informera 
              rapidement des mesures prises.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">6. Durée de conservation des données</h2>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li><strong>Données liées aux transactions :</strong> conservées selon les obligations fiscales et comptables.</li>
              <li><strong>Données de compte :</strong> supprimées ou anonymisées après désactivation du compte, sauf conservation obligatoire par la loi.</li>
              <li><strong>En règle générale :</strong> vos données sont conservées au maximum 5 ans après la fin de la relation contractuelle.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">7. Vos droits</h2>
            <p className="text-noir-profond/80 mb-4">
              Conformément aux lois en vigueur (RGPD, CCPA, etc.), vous disposez :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li><strong>Du droit d'accès :</strong> obtenir une copie des données que nous détenons vous concernant.</li>
              <li><strong>Du droit de rectification :</strong> corriger les informations inexactes ou incomplètes.</li>
              <li><strong>Du droit à l'effacement :</strong> demander la suppression de vos données, sous réserve des obligations légales.</li>
              <li><strong>Du droit d'opposition :</strong> vous opposer au traitement à des fins spécifiques (marketing direct notamment).</li>
              <li><strong>Du droit à la portabilité :</strong> recevoir vos données dans un format structuré et couramment utilisé.</li>
            </ul>
            <p className="text-noir-profond/80 mb-4">
              Pour exercer vos droits, contactez-nous à : <strong>contact@chineexpresse.com</strong>. 
              Nous pourrons vous demander des justificatifs afin de vérifier votre identité. 
              Notre réponse interviendra dans un délai d'un mois maximum.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">8. Cookies et technologies similaires</h2>
            <p className="text-noir-profond/80 mb-4">Nous utilisons des cookies pour :</p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Assurer le bon fonctionnement de notre site web.</li>
              <li>Analyser les performances et améliorer nos services.</li>
              <li>Personnaliser les publicités (avec votre consentement).</li>
            </ul>
            <p className="text-noir-profond/80 mb-4">
              Vous pouvez gérer vos préférences cookies ou les désactiver via les paramètres de votre navigateur, 
              sachant que cela peut limiter l'accès à certaines fonctionnalités.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">9. Modifications de la politique de confidentialité</h2>
            <p className="text-noir-profond/80 mb-4">
              Nous nous réservons le droit de modifier cette politique à tout moment. Toute modification substantielle 
              sera notifiée via notre site web ou par tout moyen approprié. La date de dernière mise à jour sera 
              toujours indiquée en bas du document.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">10. Contact</h2>
            <p className="text-noir-profond/80 mb-4">
              Pour toute question ou préoccupation concernant cette politique de confidentialité, veuillez nous contacter :
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-noir-profond/80 mb-1">
                <strong>Email :</strong> contact@chineexpresse.com
              </p>
              <p className="text-noir-profond/80 mb-1">
                <strong>Téléphone :</strong> +229 01 55 44 82 58
              </p>
            </div>
          </section>

          <section className="mb-8">
            <p className="text-sm text-noir-profond/60 italic">
              Date de dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}