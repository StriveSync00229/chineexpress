import { NextResponse } from "next/server"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  countryCity: z.string().min(2),
  address: z.string().optional(),
  need: z.string().min(10),
  phone: z.string().optional(),
  service: z.string().optional(),
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

    const { name, email, countryCity, address, need, phone, service } = parsedData.data

    // Ici, vous intégreriez l'envoi d'email ou la sauvegarde en base de données.
    // Par exemple, avec Nodemailer, Resend, ou une API CRM.
    console.log("Nouvelle demande de contact reçue:")
    console.log("Nom:", name)
    console.log("Email:", email)
    console.log("Pays/Ville:", countryCity)
    if (address) console.log("Adresse:", address)
    console.log("Besoin:", need)
    if (phone) console.log("Téléphone:", phone)
    if (service) console.log("Service concerné (via query param):", service)

    // Simuler un traitement
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ message: "Message envoyé avec succès !" }, { status: 200 })
  } catch (error) {
    console.error("Erreur API Contact:", error)
    return NextResponse.json({ message: "Erreur interne du serveur." }, { status: 500 })
  }
}
