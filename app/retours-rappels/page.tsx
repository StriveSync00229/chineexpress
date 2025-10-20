export default function RetoursRappelsPage() {
  return (
    <div className="bg-blanc">
      <header className="py-16 md:py-24 bg-bleu-nuit text-blanc text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Retours & Rappels</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-blanc/80">
            Politique de retours et procédures de rappel de marchandises
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">1. Politique de retours</h2>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">1.1 Conditions générales</h3>
            <p className="text-noir-profond/80 mb-4">
              Les retours de marchandises ne sont acceptés que dans les cas suivants :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Non-conformité avérée par rapport à la commande</li>
              <li>Défaut de fabrication constaté à la réception</li>
              <li>Dommages survenus pendant le transport</li>
              <li>Erreur de notre part dans l'expédition</li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">1.2 Délais de réclamation</h3>
            <p className="text-noir-profond/80 mb-4">
              Toute réclamation doit être formulée dans les <strong>7 jours ouvrables</strong> suivant la réception des
              marchandises, accompagnée de :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Photos détaillées du problème constaté</li>
              <li>Numéro de commande et bon de livraison</li>
              <li>Description précise du défaut ou de la non-conformité</li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">1.3 Procédure de retour</h3>
            <ol className="list-decimal pl-6 text-noir-profond/80 mb-4">
              <li>Contactez notre service client par email ou téléphone</li>
              <li>Obtenez un numéro d'autorisation de retour (RMA)</li>
              <li>Emballez soigneusement les marchandises dans leur emballage d'origine</li>
              <li>Expédiez à l'adresse indiquée avec le numéro RMA visible</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">2. Frais de retour</h2>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">2.1 Retours justifiés</h3>
            <p className="text-noir-profond/80 mb-4">
              Les frais de retour sont à la charge de ChineExpresse dans les cas suivants :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Erreur de notre part</li>
              <li>Marchandise défectueuse</li>
              <li>Non-conformité avérée</li>
              <li>Dommages pendant le transport sous notre responsabilité</li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">2.2 Autres cas</h3>
            <p className="text-noir-profond/80 mb-4">
              Dans tous les autres cas (changement d'avis, commande erronée du client, etc.), les frais de retour sont à
              la charge du client.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">3. Remboursements et échanges</h2>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">3.1 Modalités de remboursement</h3>
            <p className="text-noir-profond/80 mb-4">
              Les remboursements sont effectués dans un délai de <strong>14 jours ouvrables</strong>
              après réception et vérification des marchandises retournées.
            </p>
            <p className="text-noir-profond/80 mb-4">
              Le remboursement s'effectue par le même moyen de paiement que celui utilisé pour l'achat initial.
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">3.2 Échanges</h3>
            <p className="text-noir-profond/80 mb-4">
              Les échanges sont possibles sous réserve de disponibilité des produits de remplacement. Les frais
              d'expédition du produit de remplacement sont gratuits si l'échange est justifié.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">4. Procédures de rappel</h2>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">4.1 Rappel volontaire</h3>
            <p className="text-noir-profond/80 mb-4">
              ChineExpresse peut procéder au rappel volontaire de marchandises en cas de :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Défaut de sécurité découvert après livraison</li>
              <li>Non-conformité réglementaire</li>
              <li>Risque pour la santé ou la sécurité des utilisateurs</li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">4.2 Notification de rappel</h3>
            <p className="text-noir-profond/80 mb-4">
              En cas de rappel, les clients concernés sont immédiatement informés par :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Email à l'adresse fournie lors de la commande</li>
              <li>SMS si le numéro de téléphone est disponible</li>
              <li>Publication sur notre site web</li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">4.3 Procédure de rappel</h3>
            <ol className="list-decimal pl-6 text-noir-profond/80 mb-4">
              <li>Cessez immédiatement l'utilisation du produit concerné</li>
              <li>Contactez notre service client</li>
              <li>Suivez les instructions spécifiques au rappel</li>
              <li>Retournez le produit selon les modalités indiquées</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">5. Marchandises non retournables</h2>
            <p className="text-noir-profond/80 mb-4">
              Certaines marchandises ne peuvent pas être retournées pour des raisons d'hygiène ou de sécurité :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Produits alimentaires et cosmétiques ouverts</li>
              <li>Produits personnalisés ou sur mesure</li>
              <li>Marchandises périssables</li>
              <li>Produits d'hygiène personnelle</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">Contact pour retours et rappels</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-noir-profond/80 mb-1">
                <strong>Service Client :</strong>
              </p>
              <p className="text-noir-profond/80 mb-1">
                <strong>Email :</strong> support@Chineexpresse.com / contact@Chineexpresse.com
              </p>
              <p className="text-noir-profond/80 mb-1">
                <strong>Téléphone :</strong> +229 01 55 44 82 58
              </p>
              <p className="text-noir-profond/80 mb-1">
                <strong>Horaires :</strong> Lundi - Vendredi, 9h00 - 18h00
              </p>
              <p className="text-noir-profond/80">
                <strong>Adresse de retour :</strong> 广州市白云区鹤龙街尹边村8262联兴路20号SEA仓非快国际
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
