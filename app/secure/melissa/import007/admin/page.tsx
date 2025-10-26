"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  GraduationCap,
  Mail,
  FileText,
  TrendingUp,
  Calendar,
  DollarSign,
  Download,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Eye
} from "lucide-react"
import Link from "next/link"

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
  status: 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

interface DashboardStats {
  totalFormations: number
  totalInscriptions: number
  totalPaidInscriptions: number
  totalRevenue: number
  pendingDevis: number
  pendingContacts: number
}

export default function AdminDashboard() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalFormations: 0,
    totalInscriptions: 0,
    totalPaidInscriptions: 0,
    totalRevenue: 0,
    pendingDevis: 0,
    pendingContacts: 0
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
      const [formationsResponse, contactsResponse, quotesResponse] = await Promise.all([
        fetch('/api/admin/formations/stats'),
        fetch('/api/admin/contacts/stats'),
        fetch('/api/admin/devis/stats')
      ])

      const formationsData = await formationsResponse.json()
      const contactsData = await contactsResponse.json()
      const quotesData = await quotesResponse.json()

      setStats({
        ...formationsData,
        pendingContacts: contactsData.totalPending || 0,
        pendingDevis: quotesData.pendingQuotes || 0
      })
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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Chargement...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-bleu-nuit">Gestion des Formations</h1>
          <p className="text-gray-600 mt-2">Programmez et gérez vos formations Alibaba</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleExportExcel}
            className="border-dore text-dore hover:bg-dore hover:text-bleu-nuit transition-all duration-300"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter Excel
          </Button>
          <Button
            asChild
            className="bg-dore text-bleu-nuit hover:bg-dore/90 transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/secure/melissa/import007/admin/formations/new">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Formation
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistiques rapides avec animations */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">Total Formations</CardTitle>
            <Calendar className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.totalFormations}</div>
            <p className="text-xs text-gray-500 mt-1">Formations actives</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">Inscriptions</CardTitle>
            <Users className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.totalInscriptions}</div>
            <p className="text-xs text-gray-500 mt-1">Participants inscrits</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">Payées</CardTitle>
            <DollarSign className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.totalPaidInscriptions}</div>
            <p className="text-xs text-gray-500 mt-1">Inscriptions payées</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">Revenus</CardTitle>
            <TrendingUp className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{(stats.totalRevenue || 0).toLocaleString()} €</div>
            <p className="text-xs text-gray-500 mt-1">Chiffre d'affaires</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.isArray(formations) && formations.length > 0 ? (
          formations.map((formation, index) => (
            <Card
              key={formation.id}
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3 bg-gradient-to-r from-bleu-nuit/5 to-dore/5 rounded-t-lg">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-bleu-nuit font-bold">{formation.title}</CardTitle>
                  <Badge
                    variant={
                      formation.status === 'active' ? 'default' :
                      formation.status === 'completed' ? 'secondary' : 'destructive'
                    }
                    className={
                      formation.status === 'active'
                        ? 'bg-dore text-bleu-nuit hover:bg-dore/90' :
                        formation.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                    }
                  >
                    {formation.status === 'active' ? 'Active' :
                     formation.status === 'completed' ? 'Terminée' : 'Annulée'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-dore" />
                  {new Date(formation.date).toLocaleDateString('fr-FR')} à {formation.time}
                </div>

                {formation.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-dore" />
                    {formation.location}
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2 text-dore" />
                  <span className="font-semibold text-bleu-nuit">
                    {formation.price.toLocaleString()} {formation.currency}
                  </span>
                  {formation.promo_code && (
                    <Badge variant="outline" className="ml-2 border-dore text-dore">
                      -{formation.discount}%
                    </Badge>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-dore" />
                  <span className="font-medium text-bleu-nuit">
                    {formation.current_participants}/{formation.max_participants} participants
                  </span>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" size="sm" asChild className="flex-1 hover:bg-bleu-nuit hover:text-white transition-all duration-300">
                    <Link href={`/secure/melissa/import007/admin/formations/${formation.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Voir détails
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 hover:bg-dore hover:text-bleu-nuit transition-all duration-300"
                  >
                    <Link href={`/secure/melissa/import007/admin/formations/${formation.id}/edit`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteFormation(formation.id)}
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 animate-in fade-in duration-500">
            <Calendar className="h-12 w-12 text-dore mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-medium text-bleu-nuit mb-2">Aucune formation programmée</h3>
            <p className="text-gray-600 mb-4">Commencez par programmer votre première formation.</p>
            <Button
              asChild
              className="bg-dore text-bleu-nuit hover:bg-dore/90 transition-all duration-300 transform hover:scale-105"
            >
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