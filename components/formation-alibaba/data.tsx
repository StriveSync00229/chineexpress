/**
 * Données statiques pour la section Formation Alibaba
 */

import { UserPlus, Search, MessageSquareWarning, Settings2 } from "lucide-react"
import type { FormationModule, Country, MomoNetwork } from "./types"

export const modules: FormationModule[] = [
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

export const countries: Country[] = [
  { value: "CI", label: "Côte d'Ivoire" },
  { value: "SN", label: "Sénégal" },
  { value: "ML", label: "Mali" },
  { value: "BF", label: "Burkina Faso" },
  { value: "TG", label: "Togo" },
  { value: "BJ", label: "Bénin" },
  { value: "GN", label: "Guinée" },
  { value: "NE", label: "Niger" }
]

export const momoNetworks: MomoNetwork[] = [
  { value: "orange", label: "Orange Money" },
  { value: "mtn", label: "MTN Money" },
  { value: "moov", label: "Moov Money" },
  { value: "wave", label: "Wave" }
]

export const formationConfig = {
  price: 50000, // Prix en FCFA
  currency: "FCFA",
  title: "Formation Pratique Alibaba",
  // Utiliser null au lieu de "" pour éviter les erreurs en base de données
  // TODO: Remplacer par l'ID réel de la formation créée dans Supabase
  id: null as string | null
}
