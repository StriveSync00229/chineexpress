"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  Calendar,
  Eye,
  Download
} from "lucide-react"

interface QuoteRequest {
  id: string
  name: string
  email: string
  phone?: string
  country?: string
  product: string
  quantity?: string
  budget?: string
  message?: string
  status: 'pending' | 'quoted' | 'completed'
  created_at: string
}

export default function DevisAdmin() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalQuotes: 0,
    pendingQuotes: 0,
    quotedQuotes: 0,
    completedQuotes: 0
  })

  useEffect(() => {
    fetchQuotes()
    fetchStats()
  }, [])

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/admin/devis')
      const data = await response.json()
      setQuotes(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des devis:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/devis/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error)
    }
  }

  const handleStatusUpdate = async (id: string, status: 'pending' | 'quoted' | 'completed') => {
    try {
      await fetch(`/api/admin/devis/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      await fetchQuotes()
      await fetchStats()
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
    }
  }

  const handleExportExcel = async () => {
    try {
      const response = await fetch('/api/admin/devis/export-excel')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'demandes-devis.xlsx'
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
          <h1 className="text-3xl font-bold text-gray-900">Demandes de Devis</h1>
          <p className="text-gray-600 mt-2">Gérez les demandes de devis reçues depuis votre site</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleExportExcel}>
            <Download className="h-4 w-4 mr-2" />
            Exporter Excel
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devis</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuotes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingQuotes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devis envoyés</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.quotedQuotes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminés</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedQuotes}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.isArray(quotes) && quotes.length > 0 ? (
          quotes.map((quote) => (
            <Card key={quote.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{quote.name}</CardTitle>
                    <p className="text-sm text-gray-600">{quote.email}</p>
                  </div>
                  <Badge variant={
                    quote.status === 'pending' ? 'default' :
                    quote.status === 'quoted' ? 'secondary' : 'outline'
                  }>
                    {quote.status === 'pending' ? 'En attente' :
                     quote.status === 'quoted' ? 'Devis envoyé' : 'Terminé'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    {quote.product}
                    {quote.quantity && <span className="ml-2">• Qté: {quote.quantity}</span>}
                  </div>

                  {quote.budget && (
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Budget: {quote.budget}
                    </div>
                  )}

                  {quote.country && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">🌍</span>
                      {quote.country}
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(quote.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>

                {quote.message && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">{quote.message}</p>
                  </div>
                )}

                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusUpdate(quote.id, 'quoted')}
                    disabled={quote.status !== 'pending'}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Envoyer devis
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusUpdate(quote.id, 'completed')}
                    disabled={quote.status === 'completed'}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Terminer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande de devis</h3>
            <p className="text-gray-600">Les demandes de devis apparaîtront ici.</p>
          </div>
        )}
      </div>
    </div>
  )
}