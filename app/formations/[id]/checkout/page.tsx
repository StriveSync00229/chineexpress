"use client"

/**
 * Page de checkout générique pour les formations
 * Route dynamique : /formations/[id]/checkout
 *
 * Cette page récupère les informations de la formation depuis Supabase
 * et affiche un formulaire d'inscription avec paiement PayDunya
 */

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckoutButton } from "@/components/payment/CheckoutButton"
import { Loader2, Home, ArrowLeft } from "lucide-react"
import type { CheckoutData } from "@/lib/payment/types"

// Pays disponibles (à déplacer dans une config partagée plus tard)
const countries = [
  { value: "ci", label: "Côte d'Ivoire" },
  { value: "sn", label: "Sénégal" },
  { value: "ml", label: "Mali" },
  { value: "bf", label: "Burkina Faso" },
  { value: "tg", label: "Togo" },
  { value: "bj", label: "Bénin" },
  { value: "gn", label: "Guinée" },
  { value: "ne", label: "Niger" }
]

interface Formation {
  id: string
  title: string
  description?: string
  price: number
  currency: string
  type: string
  max_participants?: number
  status: string
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default function FormationCheckoutPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const router = useRouter()

  const [formation, setFormation] = useState<Formation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")

  useEffect(() => {
    async function fetchFormation() {
      try {
        setIsLoading(true)

        // Récupérer les informations de la formation depuis Supabase
        // Pour l'instant, on simule avec des données en dur
        // TODO: Remplacer par un vrai appel à Supabase

        // Simulation d'une requête
        await new Promise(resolve => setTimeout(resolve, 500))

        // Formation fictive (à remplacer par les vraies données)
        const mockFormation: Formation = {
          id: resolvedParams.id,
          title: "Formation Pratique Alibaba",
          description: "Apprenez à importer depuis la Chine avec Alibaba",
          price: 50000,
          currency: "FCFA",
          type: "online",
          status: "active"
        }

        setFormation(mockFormation)

      } catch (err: any) {
        console.error("Erreur chargement formation:", err)
        setError("Impossible de charger les informations de la formation")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFormation()
  }, [resolvedParams.id])

  // Validation du formulaire
  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    email.includes("@") &&
    phone.trim() !== "" &&
    country !== "" &&
    city.trim() !== ""

  // Préparer les données du checkout
  const checkoutData: CheckoutData | null = (formation && isFormValid) ? {
    itemType: 'formation',
    itemId: formation.id,
    items: [{
      name: formation.title,
      quantity: 1,
      unitPrice: formation.price,
      totalPrice: formation.price,
      description: formation.description || formation.title
    }],
    totalAmount: formation.price,
    description: `Formation: ${formation.title}`,
    customer: {
      name,
      email,
      phone,
      country: countries.find(c => c.value === country)?.label || country,
      city
    }
  } : null

  // Chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Chargement de la formation...</p>
        </div>
      </div>
    )
  }

  // Erreur
  if (error || !formation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Erreur</h2>
          <p className="text-gray-600 mb-6">{error || "Formation introuvable"}</p>

          <Button asChild variant="outline">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Formation inactive
  if (formation.status !== 'active') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-orange-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Formation non disponible</h2>
          <p className="text-gray-600 mb-6">
            Cette formation n'est pas disponible actuellement.
          </p>

          <Button asChild variant="outline">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Formulaire de checkout
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* En-tête */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Link>
          </Button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inscription à la formation
          </h1>
          <p className="text-gray-600">
            Remplissez vos informations pour procéder au paiement
          </p>
        </div>

        {/* Carte de la formation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {formation.title}
          </h2>
          {formation.description && (
            <p className="text-gray-600 mb-4">{formation.description}</p>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-green-600">
              {formation.price.toLocaleString()} {formation.currency}
            </span>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Vos informations
          </h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nom et prénoms *</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom complet"
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+225 XX XX XX XX XX"
              />
            </div>

            <div>
              <Label htmlFor="country">Pays *</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre pays" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="city">Ville *</Label>
              <Input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Votre ville"
              />
            </div>

            {/* Message d'aide */}
            {!isFormValid && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Veuillez remplir tous les champs requis avant de procéder au paiement
                </p>
              </div>
            )}

            {/* Bouton de paiement */}
            <div className="pt-4">
              {checkoutData ? (
                <CheckoutButton
                  checkoutData={checkoutData}
                  buttonText={`Payer ${formation.price.toLocaleString()} ${formation.currency}`}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                />
              ) : (
                <Button
                  disabled
                  className="w-full bg-gray-400 cursor-not-allowed"
                  size="lg"
                >
                  Payer {formation?.price.toLocaleString() ?? 0} {formation?.currency ?? 'FCFA'}
                </Button>
              )}
            </div>

            <p className="text-xs text-gray-500 text-center">
              🔒 Paiement sécurisé par PayDunya • Carte bancaire et Mobile Money acceptés
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
