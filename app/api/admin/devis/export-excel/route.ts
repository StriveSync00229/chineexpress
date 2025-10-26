import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import * as XLSX from 'xlsx'

export async function GET() {
  try {
    const supabase = createAdminClient()

    // Récupérer tous les devis depuis la table unifiée submissions
    const { data: devis, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('type', 'devis')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (!devis || devis.length === 0) {
      return NextResponse.json(
        { error: 'Aucun devis à exporter' },
        { status: 404 }
      )
    }

    // Préparer les données pour l'export Excel
    const excelData = devis.map(devisItem => ({
      'ID': devisItem.id,
      'Nom': devisItem.name,
      'Email': devisItem.email,
      'Téléphone': devisItem.phone || 'N/A',
      'Pays/Ville': devisItem.country_city || 'N/A',
      'Produit': devisItem.product || 'N/A',
      'Quantité': devisItem.quantity || 'N/A',
      'Budget': devisItem.budget || 'N/A',
      'Message': devisItem.message || 'N/A',
      'Service': devisItem.service || 'N/A',
      'Statut':
        devisItem.status === 'pending' ? 'En attente' :
        devisItem.status === 'quoted' ? 'Devis envoyé' :
        devisItem.status === 'completed' ? 'Terminé' : devisItem.status,
      'Date de création': new Date(devisItem.created_at).toLocaleString('fr-FR')
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
      { wch: 30 }, // Produit
      { wch: 15 }, // Quantité
      { wch: 15 }, // Budget
      { wch: 50 }, // Message
      { wch: 20 }, // Service
      { wch: 15 }, // Statut
      { wch: 20 }  // Date
    ]

    // Ajouter la feuille au workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Devis')

    // Générer le fichier Excel en buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    // Retourner le fichier Excel
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=devis-${new Date().toISOString().split('T')[0]}.xlsx`
      }
    })

  } catch (error) {
    console.error('Erreur lors de l\'export Excel des devis:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'export Excel' },
      { status: 500 }
    )
  }
}
