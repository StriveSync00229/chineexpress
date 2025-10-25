"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, DollarSign, Users, Clock } from 'lucide-react'
import Link from 'next/link'
import { FormationCheckoutModal } from './FormationCheckoutModal'
import { countries } from './data'

interface Formation {
  id: string
  title: string
  type: 'online' | 'presential'
  location?: string
  date: string
  time: string
  price: number
  currency: string
  max_participants: number
  current_participants: number
  status: 'active' | 'completed' | 'cancelled'
}

export default function FormationsScheduleSection() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null)

  useEffect(() => {
    fetchFormations()
  }, [])

  const fetchFormations = async () => {
    try {
      console.log('🔍 Tentative de récupération des formations...')
      const response = await fetch('/api/formation')
      console.log('📡 Réponse:', response.status, response.statusText)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('✅ Données reçues:', data)
      setFormations(data || [])
    } catch (error) {
      console.error('❌ Erreur lors du chargement des formations:', error)
      setFormations([])
    } finally {
      setLoading(false)
    }
  }

  const getTypeLabel = (type: string) => {
    return type === 'online' ? 'En ligne' : 'Présentiel'
  }

  const getTypeColor = (type: string) => {
    return type === 'online' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
  }

  const isAlmostFull = (current: number, max: number) => {
    return (current / max) > 0.8 // Plus de 80% des places prises
  }

  const handleInscription = (formation: Formation) => {
    setSelectedFormation(formation)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dore mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des formations...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-bleu-nuit mb-4">
            Formations Programées
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {formations.length} formations trouvées - Rejoignez nos formations pratiques
          </p>
        </div>

        {formations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((formation) => (
              <Card key={formation.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getTypeColor(formation.type)}>
                      {getTypeLabel(formation.type)}
                    </Badge>
                    {isAlmostFull(formation.current_participants, formation.max_participants) && (
                      <Badge variant="destructive">Plus que quelques places</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg font-serif font-semibold text-bleu-nuit">
                    {formation.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-dore" />
                    {new Date(formation.date).toLocaleDateString('fr-FR')}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-dore" />
                    {formation.time}
                  </div>

                  {formation.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-dore" />
                      {formation.location}
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-dore" />
                    {formation.current_participants}/{formation.max_participants} participants
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-dore" />
                      <span className="font-semibold text-bleu-nuit text-lg">
                        {formation.price.toLocaleString()} {formation.currency}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4 bg-dore text-bleu-nuit hover:bg-dore/90"
                    onClick={() => handleInscription(formation)}
                  >
                    S'inscrire à cette formation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune formation programmée</h3>
            <p className="text-gray-600 mb-4">Revenez bientôt pour découvrir nos nouvelles formations !</p>
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact?service=formation">
              Demander une formation personnalisée
            </Link>
          </Button>
        </div>
      </div>

      {/* Modal d'inscription avec paiement PayDunya */}
      {selectedFormation && (
        <FormationCheckoutModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedFormation(null)
          }}
          formation={{
            title: selectedFormation.title,
            price: selectedFormation.price,
            currency: selectedFormation.currency,
            id: selectedFormation.id
          }}
          countries={countries}
        />
      )}
    </section>
  )
}