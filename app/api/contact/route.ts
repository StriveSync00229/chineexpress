import { NextResponse } from "next/server"
import * as z from "zod"
import { createAdminClient } from "@/lib/supabase"

// Schéma unifié pour contact et devis
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  countryCity: z.string().min(2).optional(),
  address: z.string().optional(),
  need: z.string().min(10).optional(),
  message: z.string().min(10).optional(),
  phone: z.string().optional(),
  whatsappPhone: z.string().optional(),
  service: z.string().optional(),
  subject: z.string().optional(),
  product: z.string().optional(),
  quantity: z.string().optional(),
  budget: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsedData = formSchema.safeParse(body)

    if (!parsedData.success) {
      return NextResponse.json(
        { message: "Données invalides.", errors: parsedData.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const data = parsedData.data

    // Déterminer le type de soumission
    const isDevis = !!data.subject?.includes("Demande de devis") || !!data.product
    const type = isDevis ? 'devis' : 'contact'

    // Préparer le message
    const message = data.message || data.need || ''

    // Sauvegarder dans Supabase
    const supabase = createAdminClient()
    const { data: submission, error } = await supabase
      .from('submissions')
      .insert({
        type,
        name: data.name,
        email: data.email,
        phone: data.phone || data.whatsappPhone,
        country_city: data.countryCity,
        message,
        product: data.product,
        quantity: data.quantity,
        budget: data.budget,
        address: data.address,
        subject: data.subject,
        service: data.service,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error("Erreur Supabase:", error)
      throw error
    }

    console.log(`Nouvelle soumission ${type} créée:`, submission.id)

    // Envoyer les emails de confirmation et notification
    try {
      if (type === 'devis') {
        // Import dynamique pour éviter les problèmes de build
        const { sendDevisConfirmationEmail, sendAdminDevisNotification } = await import('@/lib/email/service')

        // Email de confirmation à l'utilisateur
        await sendDevisConfirmationEmail(data.email, data.name, data.service)

        // Notification à l'admin
        await sendAdminDevisNotification({
          name: data.name,
          email: data.email,
          phone: data.phone || data.whatsappPhone,
          countryCity: data.countryCity,
          message,
          service: data.service,
          product: data.product,
          quantity: data.quantity,
          budget: data.budget
        })
      } else {
        // Type contact
        const { sendContactConfirmationEmail, sendAdminContactNotification } = await import('@/lib/email/service')

        // Email de confirmation à l'utilisateur
        await sendContactConfirmationEmail(data.email, data.name)

        // Notification à l'admin
        await sendAdminContactNotification({
          name: data.name,
          email: data.email,
          phone: data.phone || data.whatsappPhone,
          countryCity: data.countryCity,
          message,
          service: data.service
        })
      }
    } catch (emailError) {
      // Ne pas bloquer la réponse si l'envoi d'email échoue
      console.error('Erreur envoi emails:', emailError)
    }

    return NextResponse.json({
      message: "Message envoyé avec succès !",
      submissionId: submission.id
    }, { status: 200 })
  } catch (error) {
    console.error("Erreur API Contact:", error)
    return NextResponse.json({ message: "Erreur interne du serveur." }, { status: 500 })
  }
}
