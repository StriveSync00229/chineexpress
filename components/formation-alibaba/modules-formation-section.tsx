"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { UserPlus, Search, MessageSquareWarning, Settings2, ChevronRight, CheckCircle } from "lucide-react"
import { PaymentModal } from "./payment-modal"

interface InscriptionData {
  name: string
  email: string
  phone: string
  country: string
  city: string
}

interface CardPaymentData {
  cardName: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

interface MomoPaymentData {
  firstName: string
  lastName: string
  country: string
  network: string
  phoneNumber: string
}

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
  const [isInscriptionModalOpen, setIsInscriptionModalOpen] = useState(false)
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo' | null>(null)
  const [inscriptionData, setInscriptionData] = useState<InscriptionData>({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: ""
  })
  const [cardPaymentData, setCardPaymentData] = useState<CardPaymentData>({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  })
  const [momoPaymentData, setMomoPaymentData] = useState<MomoPaymentData>({
    firstName: "",
    lastName: "",
    country: "",
    network: "",
    phoneNumber: ""
  })
  const [formErrors, setFormErrors] = useState<Partial<InscriptionData>>({})
  const [paymentFormErrors, setPaymentFormErrors] = useState<Partial<CardPaymentData & MomoPaymentData>>({})

  const formationPrice = 299
  const promoCode = "CHINE20"

  const countries = [
    { value: "CI", label: "Côte d'Ivoire" },
    { value: "SN", label: "Sénégal" },
    { value: "ML", label: "Mali" },
    { value: "BF", label: "Burkina Faso" },
    { value: "TG", label: "Togo" },
    { value: "BJ", label: "Bénin" },
    { value: "GN", label: "Guinée" },
    { value: "NE", label: "Niger" }
  ]

  const momoNetworks = [
    { value: "orange", label: "Orange Money" },
    { value: "mtn", label: "MTN Money" },
    { value: "moov", label: "Moov Money" },
    { value: "wave", label: "Wave" }
  ]

  const validateInscriptionForm = (): boolean => {
    const errors: Partial<InscriptionData> = {}

    if (!inscriptionData.name.trim()) {
      errors.name = "Le nom et prénoms sont requis"
    }

    if (!inscriptionData.email.trim()) {
      errors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(inscriptionData.email)) {
      errors.email = "L'email n'est pas valide"
    }

    if (!inscriptionData.phone.trim()) {
      errors.phone = "Le téléphone est requis"
    }

    if (!inscriptionData.country.trim()) {
      errors.country = "Le pays est requis"
    }

    if (!inscriptionData.city.trim()) {
      errors.city = "La ville est requise"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateCardPaymentForm = (): boolean => {
    const errors: Partial<CardPaymentData> = {}

    if (!cardPaymentData.cardName.trim()) {
      errors.cardName = "Le nom sur la carte est requis"
    }

    if (!cardPaymentData.cardNumber.trim()) {
      errors.cardNumber = "Le numéro de carte est requis"
    } else if (!/^\d{16}$/.test(cardPaymentData.cardNumber.replace(/\s/g, ''))) {
      errors.cardNumber = "Le numéro de carte doit contenir 16 chiffres"
    }

    if (!cardPaymentData.expiryDate.trim()) {
      errors.expiryDate = "La date d'expiration est requise"
    } else if (!/^\d{2}\/\d{2}$/.test(cardPaymentData.expiryDate)) {
      errors.expiryDate = "Format invalide (MM/AA)"
    }

    if (!cardPaymentData.cvv.trim()) {
      errors.cvv = "Le code CVV est requis"
    } else if (!/^\d{3}$/.test(cardPaymentData.cvv)) {
      errors.cvv = "Le CVV doit contenir 3 chiffres"
    }

    setPaymentFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateMomoPaymentForm = (): boolean => {
    const errors: Partial<MomoPaymentData> = {}

    if (!momoPaymentData.firstName.trim()) {
      errors.firstName = "Le prénom est requis"
    }

    if (!momoPaymentData.lastName.trim()) {
      errors.lastName = "Le nom est requis"
    }

    if (!momoPaymentData.country.trim()) {
      errors.country = "Le pays est requis"
    }

    if (!momoPaymentData.network.trim()) {
      errors.network = "Le réseau est requis"
    }

    if (!momoPaymentData.phoneNumber.trim()) {
      errors.phoneNumber = "Le numéro de téléphone est requis"
    }

    setPaymentFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInscription = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateInscriptionForm()) {
      setIsInscriptionModalOpen(false)
      setIsPaymentMethodModalOpen(true)
    }
  }

  const handlePaymentMethodSelection = (method: 'card' | 'momo') => {
    setPaymentMethod(method)
    setIsPaymentMethodModalOpen(false)
    setIsPaymentModalOpen(true)
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    let isValid = false

    if (paymentMethod === 'card') {
      isValid = validateCardPaymentForm()
    } else if (paymentMethod === 'momo') {
      isValid = validateMomoPaymentForm()
    }

    if (isValid) {
      // Ici vous pouvez implémenter la logique de paiement
      console.log('Paiement validé', {
        inscription: inscriptionData,
        paymentMethod,
        paymentData: paymentMethod === 'card' ? cardPaymentData : momoPaymentData
      })

      // Fermer la modal et afficher le succès
      setIsPaymentModalOpen(false)
      // TODO: Afficher le pop-up de succès
    }
  }

  const handleInputChange = (field: keyof InscriptionData, value: string) => {
    setInscriptionData(prev => ({
      ...prev,
      [field]: value
    }))

    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleCardPaymentInputChange = (field: keyof CardPaymentData, value: string) => {
    setCardPaymentData(prev => ({
      ...prev,
      [field]: value
    }))

    if (paymentFormErrors[field]) {
      setPaymentFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleMomoPaymentInputChange = (field: keyof MomoPaymentData, value: string) => {
    setMomoPaymentData(prev => ({
      ...prev,
      [field]: value
    }))

    if (paymentFormErrors[field]) {
      setPaymentFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const resetForm = () => {
    setInscriptionData({
      name: "",
      email: "",
      phone: "",
      country: "",
      city: ""
    })
    setCardPaymentData({
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    })
    setMomoPaymentData({
      firstName: "",
      lastName: "",
      country: "",
      network: "",
      phoneNumber: ""
    })
    setFormErrors({})
    setPaymentFormErrors({})
    setPaymentMethod(null)
  }

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
          <Button
            size="lg"
            onClick={() => setIsInscriptionModalOpen(true)}
            className="bg-dore text-bleu-nuit hover:bg-dore/90"
          >
            S'inscrire à la Formation Complète
          </Button>
        </div>
      </div>

      {/* Modal d'inscription */}
      <Dialog open={isInscriptionModalOpen} onOpenChange={setIsInscriptionModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Inscription à la Formation Alibaba</DialogTitle>
            <DialogDescription>
              Remplissez vos informations pour vous inscrire à la formation
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleInscription} className="space-y-4">
            <div>
              <Label htmlFor="name">Nom et prénoms *</Label>
              <Input
                id="name"
                type="text"
                value={inscriptionData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={formErrors.name ? "border-red-500" : ""}
                placeholder="Votre nom et prénoms"
              />
              {formErrors.name && (
                <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="country">Pays *</Label>
              <Select
                value={inscriptionData.country}
                onValueChange={(value) => handleInputChange("country", value)}
              >
                <SelectTrigger className={formErrors.country ? "border-red-500" : ""}>
                  <SelectValue placeholder="Sélectionnez votre pays" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.country && (
                <p className="text-sm text-red-500 mt-1">{formErrors.country}</p>
              )}
            </div>

            <div>
              <Label htmlFor="city">Ville *</Label>
              <Input
                id="city"
                type="text"
                value={inscriptionData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={formErrors.city ? "border-red-500" : ""}
                placeholder="Votre ville"
              />
              {formErrors.city && (
                <p className="text-sm text-red-500 mt-1">{formErrors.city}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={inscriptionData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={formErrors.email ? "border-red-500" : ""}
                placeholder="votre.email@exemple.com"
              />
              {formErrors.email && (
                <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                value={inscriptionData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={formErrors.phone ? "border-red-500" : ""}
                placeholder="+225 XX XX XX XX XX"
              />
              {formErrors.phone && (
                <p className="text-sm text-red-500 mt-1">{formErrors.phone}</p>
              )}
            </div>

            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <p className="font-semibold mb-1">Informations importantes :</p>
              <ul className="text-xs space-y-1">
                <li>• Prix : {formationPrice}€ (paiement unique)</li>
                <li>• Code promo : {promoCode} (-20%)</li>
                <li>• Paiement sécurisé via PayDunya</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsInscriptionModalOpen(false)
                  resetForm()
                }}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Continuer vers le paiement
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de choix de méthode de paiement */}
      <Dialog open={isPaymentMethodModalOpen} onOpenChange={setIsPaymentMethodModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choisir votre méthode de paiement</DialogTitle>
            <DialogDescription>
              Comment souhaitez-vous effectuer votre paiement ?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Button
              onClick={() => handlePaymentMethodSelection('card')}
              className="w-full p-4 h-auto flex flex-col items-center gap-2 bg-white border-2 border-gray-200 hover:bg-gray-50"
            >
              💳 Carte bancaire
              <span className="text-sm text-gray-600">Visa, Mastercard, etc.</span>
            </Button>

            <Button
              onClick={() => handlePaymentMethodSelection('momo')}
              className="w-full p-4 h-auto flex flex-col items-center gap-2 bg-white border-2 border-gray-200 hover:bg-gray-50"
            >
              📱 Mobile Money
              <span className="text-sm text-gray-600">Orange Money, MTN Money, etc.</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de paiement */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {paymentMethod === 'card' ? 'Paiement par carte bancaire' : 'Paiement Mobile Money'}
            </DialogTitle>
            <DialogDescription>
              {paymentMethod === 'card'
                ? 'Remplissez les informations de votre carte bancaire'
                : 'Remplissez les informations Mobile Money'
              }
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePayment} className="space-y-4">
            {paymentMethod === 'card' ? (
              // Formulaire carte bancaire
              <>
                <div>
                  <Label htmlFor="cardName">Nom sur la carte bancaire *</Label>
                  <Input
                    id="cardName"
                    type="text"
                    value={cardPaymentData.cardName}
                    onChange={(e) => handleCardPaymentInputChange("cardName", e.target.value)}
                    className={paymentFormErrors.cardName ? "border-red-500" : ""}
                    placeholder="Nom complet sur la carte"
                  />
                  {paymentFormErrors.cardName && (
                    <p className="text-sm text-red-500 mt-1">{paymentFormErrors.cardName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cardNumber">Numéro de la carte bancaire *</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    value={cardPaymentData.cardNumber}
                    onChange={(e) => handleCardPaymentInputChange("cardNumber", e.target.value)}
                    className={paymentFormErrors.cardNumber ? "border-red-500" : ""}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {paymentFormErrors.cardNumber && (
                    <p className="text-sm text-red-500 mt-1">{paymentFormErrors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Date d'expiration *</Label>
                    <Input
                      id="expiryDate"
                      type="text"
                      value={cardPaymentData.expiryDate}
                      onChange={(e) => handleCardPaymentInputChange("expiryDate", e.target.value)}
                      className={paymentFormErrors.expiryDate ? "border-red-500" : ""}
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                    {paymentFormErrors.expiryDate && (
                      <p className="text-sm text-red-500 mt-1">{paymentFormErrors.expiryDate}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cvv">Code CVV *</Label>
                    <Input
                      id="cvv"
                      type="text"
                      value={cardPaymentData.cvv}
                      onChange={(e) => handleCardPaymentInputChange("cvv", e.target.value)}
                      className={paymentFormErrors.cvv ? "border-red-500" : ""}
                      placeholder="123"
                      maxLength={3}
                    />
                    {paymentFormErrors.cvv && (
                      <p className="text-sm text-red-500 mt-1">{paymentFormErrors.cvv}</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              // Formulaire Mobile Money
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={momoPaymentData.firstName}
                      onChange={(e) => handleMomoPaymentInputChange("firstName", e.target.value)}
                      className={paymentFormErrors.firstName ? "border-red-500" : ""}
                      placeholder="Votre prénom"
                    />
                    {paymentFormErrors.firstName && (
                      <p className="text-sm text-red-500 mt-1">{paymentFormErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={momoPaymentData.lastName}
                      onChange={(e) => handleMomoPaymentInputChange("lastName", e.target.value)}
                      className={paymentFormErrors.lastName ? "border-red-500" : ""}
                      placeholder="Votre nom"
                    />
                    {paymentFormErrors.lastName && (
                      <p className="text-sm text-red-500 mt-1">{paymentFormErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="momoCountry">Pays *</Label>
                  <Select
                    value={momoPaymentData.country}
                    onValueChange={(value) => handleMomoPaymentInputChange("country", value)}
                  >
                    <SelectTrigger className={paymentFormErrors.country ? "border-red-500" : ""}>
                      <SelectValue placeholder="Sélectionnez votre pays" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {paymentFormErrors.country && (
                    <p className="text-sm text-red-500 mt-1">{paymentFormErrors.country}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="network">Réseau *</Label>
                  <Select
                    value={momoPaymentData.network}
                    onValueChange={(value) => handleMomoPaymentInputChange("network", value)}
                  >
                    <SelectTrigger className={paymentFormErrors.network ? "border-red-500" : ""}>
                      <SelectValue placeholder="Sélectionnez votre réseau" />
                    </SelectTrigger>
                    <SelectContent>
                      {momoNetworks.map((network) => (
                        <SelectItem key={network.value} value={network.value}>
                          {network.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {paymentFormErrors.network && (
                    <p className="text-sm text-red-500 mt-1">{paymentFormErrors.network}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Numéro de téléphone *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={momoPaymentData.phoneNumber}
                    onChange={(e) => handleMomoPaymentInputChange("phoneNumber", e.target.value)}
                    className={paymentFormErrors.phoneNumber ? "border-red-500" : ""}
                    placeholder="+225 XX XX XX XX XX"
                  />
                  {paymentFormErrors.phoneNumber && (
                    <p className="text-sm text-red-500 mt-1">{paymentFormErrors.phoneNumber}</p>
                  )}
                </div>
              </>
            )}

            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <p className="font-semibold mb-1">Récapitulatif :</p>
              <p>• Formation : {formationPrice}€</p>
              <p>• Méthode : {paymentMethod === 'card' ? 'Carte bancaire' : 'Mobile Money'}</p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsPaymentModalOpen(false)
                  setPaymentMethod(null)
                  resetForm()
                }}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Payer {formationPrice}€
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}