export default function MentionsLegalesPage() {
  return (
    <div className="bg-blanc">
      <header className="py-16 md:py-24 bg-bleu-nuit text-blanc text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Mentions Légales</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-blanc/80">
            Informations légales et réglementaires
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">1. Informations sur l'entreprise</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="text-noir-profond/80 mb-2">
                <strong>Dénomination sociale :</strong> ChineExpresse
              </p>
              <p className="text-noir-profond/80 mb-2">
                <strong>Représentant légal :</strong> Madame Mélissa
              </p>
              <p className="text-noir-profond/80 mb-2">
                <strong>Adresse du siège social :</strong> 广州市白云区鹤龙街尹边村8262联兴路20号SEA仓非快国际
              </p>
              <p className="text-noir-profond/80 mb-2">
                <strong>Pays :</strong> République Populaire de Chine
              </p>
              <p className="text-noir-profond/80 mb-2">
                <strong>Téléphone :</strong> +229 01 55 44 82 58
              </p>
              <p className="text-noir-profond/80 mb-2">
                <strong>Email :</strong> contact@chineexpresse.com
              </p>
              <p className="text-noir-profond/80">
                <strong>Activité :</strong> Services d'importation et de logistique internationale
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">2. Hébergement du site web</h2>
            <p className="text-noir-profond/80 mb-4">Le site web www.chineexpresse.com est hébergé par :</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-noir-profond/80 mb-1">
                <strong>Hébergeur :</strong> Vercel Inc.
              </p>
              <p className="text-noir-profond/80 mb-1">
                <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
              </p>
              <p className="text-noir-profond/80">
                <strong>Site web :</strong> https://vercel.com
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">3. Propriété intellectuelle</h2>
            <p className="text-noir-profond/80 mb-4">
              L'ensemble du contenu de ce site web (textes, images, vidéos, logos, graphismes, etc.) est la propriété
              exclusive de ChineExpresse ou fait l'objet d'une autorisation d'utilisation.
            </p>
            <p className="text-noir-profond/80 mb-4">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments
              du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable
              de ChineExpresse.
            </p>
            <p className="text-noir-profond/80">
              La marque "ChineExpresse" ainsi que les logos associés sont des marques déposées. Toute utilisation non
              autorisée constitue une contrefaçon passible de sanctions pénales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">4. Données personnelles</h2>
            <p className="text-noir-profond/80 mb-4">
              ChineExpresse s'engage à protéger la vie privée de ses utilisateurs. Les informations personnelles
              collectées sur ce site sont traitées conformément à notre
              <a href="/politique-confidentialite" className="text-dore hover:underline">
                {" "}
                Politique de Confidentialité
              </a>
              .
            </p>
            <p className="text-noir-profond/80">
              Conformément aux réglementations applicables, vous disposez d'un droit d'accès, de rectification et de
              suppression des données vous concernant.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">5. Cookies</h2>
            <p className="text-noir-profond/80 mb-4">
              Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. En continuant à
              naviguer sur ce site, vous acceptez l'utilisation de cookies.
            </p>
            <p className="text-noir-profond/80">
              Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter le
              fonctionnement du site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">6. Responsabilité</h2>
            <p className="text-noir-profond/80 mb-4">
              ChineExpresse s'efforce de maintenir les informations de ce site à jour et exactes. Cependant, nous ne
              pouvons garantir l'exactitude, la complétude ou l'actualité de toutes les informations.
            </p>
            <p className="text-noir-profond/80 mb-4">
              ChineExpresse ne saurait être tenue responsable des dommages directs ou indirects résultant de
              l'utilisation de ce site ou de l'impossibilité d'y accéder.
            </p>
            <p className="text-noir-profond/80">
              Les liens vers des sites tiers sont fournis à titre informatif. ChineExpresse n'est pas responsable du
              contenu de ces sites externes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">7. Droit applicable</h2>
            <p className="text-noir-profond/80 mb-4">
              Les présentes mentions légales sont soumises au droit chinois. En cas de litige, les tribunaux compétents
              de Guangzhou seront seuls compétents.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-bleu-nuit mb-4">8. Contact</h2>
            <p className="text-noir-profond/80 mb-4">
              Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
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
