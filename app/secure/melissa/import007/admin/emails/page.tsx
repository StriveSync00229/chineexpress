"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, Users, Mail } from "lucide-react"

export default function EmailMarketing() {
  const [emailData, setEmailData] = useState({
    subject: '',
    content: '',
    recipients: 'all' // 'all', 'formation_paid', 'formation_pending'
  })
  const [sending, setSending] = useState(false)
  const [stats, setStats] = useState({
    totalClients: 0,
    clientsWithEmail: 0,
    formationPaid: 0
  })

  const handleSendEmail = async () => {
    if (!emailData.subject || !emailData.content) {
      alert('Veuillez remplir le sujet et le contenu de l\'email')
      return
    }

    setSending(true)
    try {
      const response = await fetch('/api/admin/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      })

      if (response.ok) {
        alert('Email envoyé avec succès !')
        setEmailData({ subject: '', content: '', recipients: 'all' })
      } else {
        alert('Erreur lors de l\'envoi de l\'email')
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi de l\'email')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-bleu-nuit">Email Marketing</h1>
        <p className="text-gray-600 mt-2">Envoyez des emails à vos clients depuis noreply@chineexpresse.com</p>
      </div>

      {/* Statistiques rapides avec animations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.totalClients}</div>
            <p className="text-xs text-gray-500 mt-1">Clients inscrits</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">Avec Email</CardTitle>
            <Mail className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.clientsWithEmail}</div>
            <p className="text-xs text-gray-500 mt-1">Contacts valides</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-left duration-500 delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-bleu-nuit">Formations Payées</CardTitle>
            <Users className="h-4 w-4 text-dore" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bleu-nuit">{stats.formationPaid}</div>
            <p className="text-xs text-gray-500 mt-1">Participants payants</p>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-in slide-in-from-bottom duration-500 delay-400">
        <CardHeader className="bg-gradient-to-r from-bleu-nuit/5 to-dore/5 rounded-t-lg">
          <CardTitle className="text-bleu-nuit font-bold">Composer un Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="recipients" className="text-bleu-nuit font-medium">Destinataires</Label>
            <select
              id="recipients"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-dore focus:ring-dore transition-colors"
              value={emailData.recipients}
              onChange={(e) => setEmailData({...emailData, recipients: e.target.value})}
            >
              <option value="all">Tous les clients</option>
              <option value="formation_paid">Clients formations payées</option>
              <option value="formation_pending">Clients formations en attente</option>
            </select>
          </div>

          <div>
            <Label htmlFor="subject" className="text-bleu-nuit font-medium">Sujet</Label>
            <Input
              id="subject"
              placeholder="Sujet de votre email"
              value={emailData.subject}
              onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
              className="border-gray-300 focus:border-dore focus:ring-dore transition-colors"
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-bleu-nuit font-medium">Contenu</Label>
            <Textarea
              id="content"
              placeholder="Contenu de votre email..."
              rows={10}
              value={emailData.content}
              onChange={(e) => setEmailData({...emailData, content: e.target.value})}
              className="border-gray-300 focus:border-dore focus:ring-dore transition-colors"
            />
          </div>

          <Button
            onClick={handleSendEmail}
            disabled={sending}
            className="w-full bg-dore text-bleu-nuit hover:bg-dore/90 transition-all duration-300 transform hover:scale-105"
          >
            {sending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bleu-nuit mr-2"></div>
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Envoyer l'Email
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}