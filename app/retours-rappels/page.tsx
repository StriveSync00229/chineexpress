export default function ConditionsGeneralesVentePage() {
  return (
    <div className="bg-white">
      <header className="py-16 md:py-24 bg-bleu-nuit text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl text-dore md:text-5xl font-serif font-bold">Politique de Retour et de Remboursement</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white">
            Conditions de retour et remboursement des services logistiques de Chineexpresse
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">1. Définitions</h2>
            <p className="text-noir-profond/80 mb-4">
              <strong>Colis :</strong> Marchandise expédiée par le Client via les services de Chineexpresse.
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Transporteur :</strong> Société tierce assurant l'acheminement et la livraison du Colis.
            </p>
            <p className="text-noir-profond/80">
              <strong>Non-conformité :</strong> Écart entre le contenu ou l'état du Colis et les informations portées sur la commande.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">2. Retour des Colis</h2>
            <p className="text-noir-profond/80">
              Aucun retour de Colis ne pourra être accepté une fois la livraison effectuée à l'adresse finale indiquée par le Client. Le Client est tenu de vérifier l'état du Colis dès sa remise et, le cas échéant, de refuser la livraison et de signaler immédiatement l'anomalie au Transporteur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">3. Remboursements</h2>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">3.1. Dommages dus au transport</h3>
            <p className="text-noir-profond/80 mb-4">
              Remboursement pris en charge exclusivement par le Transporteur selon ses conditions.
            </p>
            <p className="text-noir-profond/80 mb-4">
              Le Client doit ouvrir une réclamation et fournir toutes les preuves requises (photos, vidéos, bordereaux signés « endommagé »).
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">3.2. Non-conformité avant expédition</h3>
            <p className="text-noir-profond/80 mb-4">
              À signaler à Chineexpresse dans les 48h suivant la transmission des visuels avant expédition.
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Substitution par un Colis similaire</strong>
            </p>
            <p className="text-noir-profond/80">
              <strong>Remboursement intégral du montant facturé</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">4. Procédure de Réclamation</h2>
            <p className="text-noir-profond/80 mb-4">
              Constituer un dossier :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Preuves visuelles (photos/vidéos)</li>
              <li>Numéro de suivi et bordereau</li>
            </ul>
            <p className="text-noir-profond/80 mb-4">
              Envoyer à Chineexpresse ou au Transporteur selon le cas :
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>48h après réception du Colis (dommages transport)</strong>
            </p>
            <p className="text-noir-profond/80">
              <strong>48h après transmission des visuels (non-conformités)</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">5. Responsabilité de Chineexpresse</h2>
            <p className="text-noir-profond/80 mb-4">
              <strong>Avant expédition :</strong> vérification de la conformité apparente
            </p>
            <p className="text-noir-profond/80">
              <strong>Après remise au Transporteur :</strong> assistance uniquement, sans engagement de résultat
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">6. Exclusions de Remboursement</h2>
            <p className="text-noir-profond/80 mb-4">
              Aucune prise en charge après remise au Transporteur
            </p>
            <p className="text-noir-profond/80 mb-4">
              Pas de retours ou échanges pour convenance personnelle
            </p>
            <p className="text-noir-profond/80">
              Rejet des réclamations hors délais
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">7. Modifications de la Politique</h2>
            <p className="text-noir-profond/80">
              Chineexpresse se réserve le droit de modifier cette Politique. Les mises à jour seront publiées sur le site officiel et s'appliqueront aux Colis expédiés après publication.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">Contact Service Client Chineexpresse</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-noir-profond/80 mb-2">
                <strong>Email :</strong> support@Chineexpresse.com
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