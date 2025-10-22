"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  CheckCircle,
  Clock,
  Mail,
  User,
  Calendar,
  Eye,
  Download
} from "lucide-react"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'pending' | 'processed'
  created_at: string
}

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalContacts: 0,
    pendingContacts: 0,
    processedContacts: 0
  })

  useEffect(() => {
    fetchContacts()
    fetchStats()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts')
      const data = await response.json()
      setContacts(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/contacts/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error)
    }
  }

  const handleStatusUpdate = async (id: string, status: 'pending' | 'processed') => {
    try {
      await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      await fetchContacts()
      await fetchStats()
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
    }
  }

  const handleExportExcel = async () => {
    try {
      const response = await fetch('/api/admin/contacts/export-excel')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'demandes-contact.xlsx'
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
          <h1 className="text-3xl font-bold text-bleu-nuit">Demandes de Contact</h1>
          <p className="text-gray-600 mt-2">Gérez les demandes de contact reçues depuis votre site</p>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.totalContacts}</div>
            <p className="text-xs text-gray-500 mt-1">Messages reçus</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">En attente</CardTitle>
            <Clock className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.pendingContacts}</div>
            <p className="text-xs text-gray-500 mt-1">À traiter</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">Traités</CardTitle>
            <CheckCircle className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.processedContacts}</div>
            <p className="text-xs text-gray-500 mt-1">Messages traités</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contacts.map((contact, index) => (
          <Card
            key={contact.id}
            className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-in slide-in-from-bottom duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3 bg-gradient-to-r from-bleu-nuit/5 to-dore/5 rounded-t-lg">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-bleu-nuit font-bold">{contact.name}</CardTitle>
                  <p className="text-sm text-gray-600">{contact.email}</p>
                </div>
                <Badge
                  variant={contact.status === 'pending' ? 'default' : 'secondary'}
                  className={
                    contact.status === 'pending'
                      ? 'bg-dore text-bleu-nuit hover:bg-dore/90' :
                      'bg-green-100 text-green-800'
                  }
                >
                  {contact.status === 'pending' ? 'En attente' : 'Traité'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-dore" />
                  <span className="font-semibold text-bleu-nuit">Sujet: {contact.subject}</span>
                </div>

                {contact.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📞</span>
                    <span className="text-bleu-nuit font-medium">{contact.phone}</span>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-dore" />
                  {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-dore">
                <p className="text-sm text-gray-700">{contact.message}</p>
              </div>

              <div className="flex space-x-2 pt-4">
                {contact.status === 'pending' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusUpdate(contact.id, 'processed')}
                    className="flex-1 hover:bg-dore hover:text-bleu-nuit transition-all duration-300"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Marquer comme traité
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-12 animate-in fade-in duration-500">
          <Users className="h-12 w-12 text-dore mx-auto mb-4 animate-bounce" />
          <h3 className="text-lg font-medium text-bleu-nuit mb-2">Aucune demande de contact</h3>
          <p className="text-gray-600">Les demandes de contact apparaîtront ici.</p>
        </div>
      )}
    </div>
  )
}