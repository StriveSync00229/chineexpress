export default function ConditionsGeneralesVentePage() {
  return (
    <div className="bg-white">
      <header className="py-16 md:py-24 bg-bleu-nuit text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl text-dore md:text-5xl font-serif font-bold">Conditions d'Utilisation des Services Logistiques</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white">
            Conditions régissant l'utilisation de nos services logistiques et d'expédition
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">1. Objet</h2>
            <p className="text-noir-profond/80">
              Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation des services logistiques fournis par Chineexpresse, une entreprise basée au Bénin facilitant l'importation et l'expédition de marchandises depuis la Chine.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">2. Description du Service</h2>
            <p className="text-noir-profond/80">
              Chineexpresse agit en tant qu'intermédiaire facilitant l'expédition de colis depuis la Chine vers le Bénin et autres destinations africaines. Nous proposons des solutions d'expédition par voie aérienne et maritime adaptées aux besoins de nos clients.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">3. Responsabilité et Limitation de Service</h2>
            <p className="text-noir-profond/80 mb-4">
              <strong>Avion (standard) :</strong> 4 semaines (estimation)
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Avion (express) :</strong> 20 jours (estimation)
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Bateau :</strong> 3 mois (estimation)
            </p>
            <p className="text-noir-profond/80">
              Le délai commence à la réception du colis par le transporteur. Chineexpresse s'engage à fournir des estimations réalistes mais ne peut garantir des délais précis en raison des aléas du transport international.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">4. Tarification et Paiement</h2>
            <p className="text-noir-profond/80 mb-4">
              La tarification dépend de la destination, du type d'envoi, du contenu du colis et du mode de transport choisi. Les tarifs sont communiqués au client avant toute expédition.
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Frais de stockage en cas de retard :</strong> 1000 F CFA/kg ou 5000 F CFA/m³
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Colis non récupéré après 2 semaines :</strong> Chineexpresse se dégage de toute responsabilité
            </p>
            <p className="text-noir-profond/80">
              <strong>Après 4 semaines :</strong> colis considéré comme abandonné
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">5. Service d'achat et négociation</h2>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">5.1. Définition</h3>
            <p className="text-noir-profond/80 mb-4">
              Chineexpresse agit comme mandataire-acheteur pour le Client, facilitant l'acquisition de produits depuis la Chine et leur expédition vers le Bénin.
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">5.2. Modalités de paiement</h3>
            <p className="text-noir-profond/80 mb-4">
              <strong>Acompte :</strong> 70 % à la signature du contrat
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Solde :</strong> 30 % à la réception à Cotonou
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">5.3. Retard de paiement</h3>
            <p className="text-noir-profond/80 mb-4">
              Des frais de stockage sont appliqués dès le premier jour de retard selon le tarif en vigueur. Le client reste responsable du paiement intégral même en cas de retard.
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">5.4. Ajustement automatique</h3>
            <p className="text-noir-profond/80 mb-4">
              Le Client autorise un ajustement jusqu'à +20 % du prix initial pour couvrir les variations de taux de change, frais de transport ou autres coûts imprévus.
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">5.5. Remboursement de l'acompte</h3>
            <p className="text-noir-profond/80 mb-4">
              <strong>Annulation sous 24h :</strong> remboursement à 30 %
            </p>
            <p className="text-noir-profond/80 mb-4">
              <strong>Après 24h :</strong> aucun remboursement
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">5.6. Réclamations</h3>
            <p className="text-noir-profond/80 mb-4">
              Délai de 48h pour toute réclamation après réception à Cotonou. Passé ce délai, aucune réclamation ne sera acceptée.
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">5.7. Taux de change</h3>
            <p className="text-noir-profond/80 mb-4">
              Application du taux BCEAO à la date de l'acompte pour la conversion des devises.
            </p>

            <h3 className="text-xl font-serif font-semibold text-bleu-nuit mb-3">5.8. Droits et taxes</h3>
            <p className="text-noir-profond/80">
              Les droits de douane sont à la charge du Client. Chineexpresse peut avancer ces frais qui seront refacturés au client avec justificatifs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">6. Engagements du Client</h2>
            <p className="text-noir-profond/80 mb-4">
              Le Client s'engage à fournir à Chineexpresse toutes les informations nécessaires pour l'exécution du service :
            </p>
            <ul className="list-disc pl-6 text-noir-profond/80 mb-4">
              <li>Coordonnées complètes du destinataire</li>
              <li>Photo du colis emballé</li>
              <li>Valeur marchande en FCFA</li>
              <li>Facture d'achat</li>
              <li>Bordereau d'expédition</li>
            </ul>
            <p className="text-noir-profond/80">
              En cas d'erreur ou absence d'information fournie par le Client, Chineexpresse décline toute responsabilité concernant les retards, pertes ou problèmes d'expédition.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">7. Perte ou Détérioration du Colis</h2>
            <p className="text-noir-profond/80 mb-4">
              <strong>En transit maritime :</strong> Chineexpresse facilite les démarches de réclamation auprès des compagnies maritimes et assiste le client dans les procédures d'indemnisation selon les conditions du transporteur.
            </p>
            <p className="text-noir-profond/80">
              <strong>En entrepôt :</strong> Chineexpresse assume toute responsabilité en cas de perte ou détérioration du colis pendant son stockage dans nos installations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">8. Modifications des CGU</h2>
            <p className="text-noir-profond/80">
              Chineexpresse peut modifier les CGU à tout moment. Les changements seront communiqués au Client par email ou via la plateforme. L'utilisation continue des services vaut acceptation des nouvelles conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">9. Droit Applicable et Litiges</h2>
            <p className="text-noir-profond/80 mb-4">
              Le droit béninois s'applique à l'ensemble des présentes CGU. En cas de litige, les parties s'efforceront de trouver une solution amiable.
            </p>
            <p className="text-noir-profond/80">
              À défaut d'accord amiable, compétence exclusive du Tribunal de Commerce de Cotonou pour trancher tout différend relatif à l'interprétation ou l'exécution des présentes CGU.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}