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
  type: 'devis'
  name: string
  email: string
  phone?: string
  country_city?: string
  product?: string
  quantity?: string
  budget?: string
  message?: string
  service?: string
  status: 'pending' | 'quoted' | 'completed'
  created_at: string
  updated_at: string
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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dore"></div>
        <span className="ml-3 text-bleu-nuit">Chargement...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-bleu-nuit">Demandes de Devis</h1>
          <p className="text-gray-600 mt-2">Gérez les demandes de devis reçues depuis votre site</p>
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
        </div>
      </div>

      {/* Statistiques rapides avec animations */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">Total Devis</CardTitle>
            <FileText className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.totalQuotes}</div>
            <p className="text-xs text-gray-500 mt-1">Demandes reçues</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">En attente</CardTitle>
            <Clock className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.pendingQuotes}</div>
            <p className="text-xs text-gray-500 mt-1">À traiter</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">Devis envoyés</CardTitle>
            <CheckCircle className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.quotedQuotes}</div>
            <p className="text-xs text-gray-500 mt-1">Propositions faites</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">Terminés</CardTitle>
            <CheckCircle className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.completedQuotes}</div>
            <p className="text-xs text-gray-500 mt-1">Commandes finalisées</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.isArray(quotes) && quotes.length > 0 ? (
          quotes.map((quote, index) => (
            <Card
              key={quote.id}
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3 bg-gradient-to-r from-bleu-nuit/5 to-dore/5 rounded-t-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-bleu-nuit font-bold">{quote.name}</CardTitle>
                    <p className="text-sm text-gray-600">{quote.email}</p>
                  </div>
                  <Badge
                    variant={
                      quote.status === 'pending' ? 'default' :
                      quote.status === 'quoted' ? 'secondary' : 'outline'
                    }
                    className={
                      quote.status === 'pending'
                        ? 'bg-dore text-bleu-nuit hover:bg-dore/90' :
                        quote.status === 'quoted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                    }
                  >
                    {quote.status === 'pending' ? 'En attente' :
                     quote.status === 'quoted' ? 'Devis envoyé' : 'Terminé'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {quote.product && (
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2 text-dore" />
                      <span className="font-semibold text-bleu-nuit">{quote.product}</span>
                      {quote.quantity && <span className="ml-2 text-dore">• Qté: {quote.quantity}</span>}
                    </div>
                  )}

                  {quote.budget && (
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2 text-dore" />
                      <span className="font-medium text-bleu-nuit">Budget: {quote.budget}</span>
                    </div>
                  )}

                  {quote.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📞</span>
                      <span className="text-bleu-nuit font-medium">{quote.phone}</span>
                    </div>
                  )}

                  {quote.country_city && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">🌍</span>
                      <span className="text-bleu-nuit font-medium">{quote.country_city}</span>
                    </div>
                  )}

                  {quote.service && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">🏢</span>
                      <span className="text-bleu-nuit font-medium">Service: {quote.service}</span>
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-dore" />
                    {new Date(quote.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>

                {quote.message && (
                  <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-dore">
                    <p className="text-sm text-gray-700">{quote.message}</p>
                  </div>
                )}

                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusUpdate(quote.id, 'quoted')}
                    disabled={quote.status !== 'pending'}
                    className="flex-1 hover:bg-dore hover:text-bleu-nuit transition-all duration-300"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Envoyer devis
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusUpdate(quote.id, 'completed')}
                    disabled={quote.status === 'completed'}
                    className="flex-1 hover:bg-green-100 hover:text-green-800 transition-all duration-300"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Terminer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 animate-in fade-in duration-500">
            <FileText className="h-12 w-12 text-dore mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-medium text-bleu-nuit mb-2">Aucune demande de devis</h3>
            <p className="text-gray-600">Les demandes de devis apparaîtront ici.</p>
          </div>
        )}
      </div>
    </div>
  )
}