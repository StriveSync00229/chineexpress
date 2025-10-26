import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import * as XLSX from 'xlsx'

export async function GET() {
  try {
    const supabase = createAdminClient()

    // Récupérer tous les contacts depuis la table unifiée submissions
    const { data: contacts, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('type', 'contact')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (!contacts || contacts.length === 0) {
      return NextResponse.json(
        { error: 'Aucun contact à exporter' },
        { status: 404 }
      )
    }

    // Préparer les données pour l'export Excel
    const excelData = contacts.map(contact => ({
      'ID': contact.id,
      'Nom': contact.name,
      'Email': contact.email,
      'Téléphone': contact.phone || 'N/A',
      'Pays/Ville': contact.country_city || 'N/A',
      'Adresse': contact.address || 'N/A',
      'Sujet': contact.subject || 'N/A',
      'Message': contact.message,
      'Service': contact.service || 'N/A',
      'Statut': contact.status === 'pending' ? 'En attente' : 'Traité',
      'Date de création': new Date(contact.created_at).toLocaleString('fr-FR')
    }))

    // Créer le workbook et worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Définir la largeur des colonnes
    worksheet['!cols'] = [
      { wch: 10 }, // ID
      { wch: 20 }, // Nom
      { wch: 30 }, // Email
      { wch: 15 }, // Téléphone
      { wch: 20 }, // Pays/Ville
      { wch: 30 }, // Adresse
      { wch: 30 }, // Sujet
      { wch: 50 }, // Message
      { wch: 20 }, // Service
      { wch: 15 }, // Statut
      { wch: 20 }  // Date
    ]

    // Ajouter la feuille au workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts')

    // Générer le fichier Excel en buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    // Retourner le fichier Excel
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=contacts-${new Date().toISOString().split('T')[0]}.xlsx`
      }
    })

  } catch (error) {
    console.error('Erreur lors de l\'export Excel des contacts:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'export Excel' },
      { status: 500 }
    )
  }
}
