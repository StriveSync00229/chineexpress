import { UserPlus, Search, MessageSquareWarning, Settings2, ChevronRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const modules = [
  {
    icon: <UserPlus size={32} className="text-dore" />,
    title: "Création de votre compte professionnel",
    description: "Configuration optimale de votre profil pour inspirer confiance et accéder à toutes les fonctionnalités.",
    steps: [
      "Création d'un compte professionnel Alibaba",
      "Vérification et certification du profil",
      "Configuration des paramètres de confidentialité",
      "Ajout des informations d'entreprise complètes",
      "Activation des notifications importantes"
    ],
    duration: "1 heure",
    difficulty: "Facile",
    tools: ["Compte Alibaba", "Documents d'entreprise"]
  },
  {
    icon: <Search size={32} className="text-dore" />,
    title: "Recherche et évaluation de fournisseurs",
    description: "Techniques pour trouver des fournisseurs fiables, vérifier leur crédibilité et éviter les arnaques.",
    steps: [
      "Utilisation avancée des filtres de recherche",
      "Analyse des certifications et badges de confiance",
      "Vérification des capacités de production",
      "Évaluation des avis et notations",
      "Contact initial et échantillonnage",
      "Audit des usines (si nécessaire)"
    ],
    duration: "2 heures",
    difficulty: "Intermédiaire",
    tools: ["Filtres Alibaba", "Outils de vérification", "Listes de contrôle"]
  },
  {
    icon: <MessageSquareWarning size={32} className="text-dore" />,
    title: "Négociation et gestion des litiges",
    description: "Stratégies de négociation efficaces et méthodes pour résoudre les conflits potentiels.",
    steps: [
      "Préparation d'une demande de devis structurée",
      "Techniques de négociation culturelle",
      "Gestion des différences de fuseaux horaires",
      "Rédaction de contrats clairs et complets",
      "Suivi des commandes et livraisons",
      "Résolution des litiges et réclamations"
    ],
    duration: "1.5 heures",
    difficulty: "Avancé",
    tools: ["Modèles de contrats", "Outils de suivi", "Guide de négociation"]
  },
  {
    icon: <Settings2 size={32} className="text-dore" />,
    title: "Optimisation des coûts logistiques",
    description: "Comprendre les Incoterms, choisir les bonnes options d'expédition et minimiser les frais.",
    steps: [
      "Compréhension des Incoterms 2020",
      "Calcul des coûts d'expédition réels",
      "Choix du transporteur optimal",
      "Optimisation du packaging",
      "Gestion des formalités douanières",
      "Suivi et assurance des expéditions"
    ],
    duration: "1.5 heures",
    difficulty: "Intermédiaire",
    tools: ["Calculateur Incoterms", "Comparateur transporteurs", "Check-list douane"]
  },
]

export default function ModulesFormationSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-bleu-nuit mb-4">
            Programme Détaillé de la Formation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un parcours structuré en 4 modules essentiels pour maîtriser l'import depuis la Chine
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-dore/10 rounded-full">
                      {module.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-serif font-semibold text-bleu-nuit">
                        {module.title}
                      </CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {module.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {module.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-dore">
                    {index + 1}
                  </span>
                </div>
                <CardDescription className="text-noir-profond/80">
                  {module.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-bleu-nuit mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-dore" />
                      Étapes détaillées :
                    </h4>
                    <ul className="space-y-1">
                      {module.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <ChevronRight className="w-3 h-3 text-dore mt-0.5 flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="font-medium">Outils fournis :</span>
                      <span>{module.tools.join(", ")}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      En savoir plus
                    </Button>
                    <Button size="sm" className="flex-1 bg-dore text-bleu-nuit hover:bg-dore/90">
                      Commencer ce module
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section récapitulative */}
        <div className="mt-16 bg-bleu-nuit text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-serif font-bold text-dore mb-4">
            Formation Complète : 6 Heures de Contenu
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold text-dore mb-2">4</div>
              <div className="text-white/80">Modules principaux</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-dore mb-2">15+</div>
              <div className="text-white/80">Étapes détaillées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-dore mb-2">8</div>
              <div className="text-white/80">Outils pratiques</div>
            </div>
          </div>
          <Button size="lg" className="bg-dore text-bleu-nuit hover:bg-dore/90">
            S'inscrire à la Formation Complète
          </Button>
        </div>
      </div>
    </section>
  )
}