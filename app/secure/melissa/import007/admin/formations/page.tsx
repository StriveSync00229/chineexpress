"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Eye,
  Download,
  TrendingUp,
  Image as ImageIcon
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Formation {
  id: string
  title: string
  type: 'online' | 'presential'
  location?: string
  date: string
  time: string
  price: number
  currency: string
  promo_code?: string
  discount?: number
  max_participants: number
  current_participants: number
  image_url?: string
  status: 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export default function FormationsAdmin() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalFormations: 0,
    totalInscriptions: 0,
    totalPaidInscriptions: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    fetchFormations()
    fetchStats()
  }, [])

  const fetchFormations = async () => {
    try {
      const response = await fetch('/api/admin/formations')
      const data = await response.json()
      setFormations(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des formations:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/formations/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error)
    }
  }

  const handleDeleteFormation = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await fetch(`/api/admin/formations/${id}`, { method: 'DELETE' })
        await fetchFormations()
        await fetchStats()
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
      }
    }
  }

  const handleExportExcel = async () => {
    try {
      const response = await fetch('/api/admin/formations/export-excel')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'formations-inscriptions.xlsx'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Erreur lors de l\'export Excel:', error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Chargement...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Formations</h1>
          <p className="text-gray-600 mt-2">Programmez et gérez vos formations Alibaba</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleExportExcel}>
            <Download className="h-4 w-4 mr-2" />
            Exporter Excel
          </Button>
          <Button asChild>
            <Link href="/secure/melissa/import007/admin/formations/new">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Formation
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Formations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFormations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInscriptions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payées</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPaidInscriptions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.totalRevenue || 0).toLocaleString()} €</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.isArray(formations) && formations.length > 0 ? (
          formations.map((formation) => (
            <Card key={formation.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              {/* Image de la formation */}
              {formation.image_url ? (
                <div className="relative w-full h-48 bg-gray-100">
                  <Image
                    src={formation.image_url}
                    alt={formation.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full h-48 bg-gradient-to-br from-bleu-nuit to-blue-900 flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-dore/30" />
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{formation.title}</CardTitle>
                  <Badge variant={
                    formation.status === 'active' ? 'default' :
                    formation.status === 'completed' ? 'secondary' : 'destructive'
                  }>
                    {formation.status === 'active' ? 'Active' :
                     formation.status === 'completed' ? 'Terminée' : 'Annulée'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(formation.date).toLocaleDateString('fr-FR')} à {formation.time}
                </div>

                {formation.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {formation.location}
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {formation.price} {formation.currency}
                  {formation.promo_code && (
                    <Badge variant="outline" className="ml-2">
                      -{formation.discount}%
                    </Badge>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {formation.current_participants}/{formation.max_participants} participants
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/secure/melissa/import007/admin/formations/${formation.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Voir détails
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/secure/melissa/import007/admin/formations/${formation.id}/edit`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteFormation(formation.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune formation programmée</h3>
            <p className="text-gray-600 mb-4">Commencez par programmer votre première formation.</p>
            <Button asChild>
              <Link href="/secure/melissa/import007/admin/formations/new">
                <Plus className="h-4 w-4 mr-2" />
                Créer une formation
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}


