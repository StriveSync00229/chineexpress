"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  countryCity: z.string().min(2, "Veuillez indiquer votre pays et ville."),
  address: z.string().optional(),
  need: z.string().min(10, "Veuillez décrire votre besoin (au moins 10 caractères)."),
  email: z.string().email("L'adresse e-mail n'est pas valide."),
  phone: z.string().optional(),
  service: z.string().optional(), // For pre-filling from query param
})

type FormData = z.infer<typeof formSchema>

export default function ContactFormSection() {
  const searchParams = useSearchParams()
  const serviceQuery = searchParams.get("service")
  const subjectQuery = searchParams.get("subject")
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Ajout de defaultValues pour une initialisation propre
      name: "",
      email: "",
      countryCity: "",
      address: "",
      need: "",
      phone: "",
      service: "",
    },
  })

  useEffect(() => {
    let initialNeedMessage = ""
    if (serviceQuery) {
      setValue("service", serviceQuery)
      initialNeedMessage = `Demande de devis pour le service : ${serviceQuery}. \n\nMon besoin : `
    }
    if (subjectQuery) {
      // Concatène si serviceQuery était aussi présent, sinon initialise.
      initialNeedMessage +=
        (initialNeedMessage ? "\n\n" : "") + `Demande concernant : ${subjectQuery}. \n\nMon message : `
    }
    if (initialNeedMessage) {
      setValue("need", initialNeedMessage)
    }
  }, [serviceQuery, subjectQuery, setValue]) // setValue est stable et peut être omise, mais la garder ici est ok.

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erreur lors de l_envoi du message.")
      }

      toast({
        title: "Message envoyé !",
        description: "Nous vous recontacterons bientôt.",
      })
      reset() // Réinitialise le formulaire aux defaultValues
      // Si vous voulez spécifiquement re-préremplir après un reset, il faudrait une logique additionnelle
      // ou s'assurer que les defaultValues sont mis à jour si les query params changent.
      // Pour l'instant, un reset simple est appliqué.
      // Pour vider spécifiquement les champs liés aux query params après reset et soumission réussie :
      if (serviceQuery || subjectQuery) {
        setValue("need", "") // Vider le message pré-rempli
        setValue("service", "") // Vider le service
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: (error as Error).message || "Une erreur s'est produite.",
        variant: "destructive",
      })
    }
  }

  return (
    <div id="form" className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-bleu-nuit mb-6">Envoyez-nous un message</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" {...register("service")} />
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-noir-profond/80 mb-1">
            Nom & Prénom *
          </label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Votre nom complet"
            className="bg-blanc border-gray-300 focus:border-dore focus:ring-dore"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-noir-profond/80 mb-1">
            Email *
          </label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Votre adresse email"
            className="bg-blanc border-gray-300 focus:border-dore focus:ring-dore"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="countryCity" className="block text-sm font-medium text-noir-profond/80 mb-1">
            Pays & Ville *
          </label>
          <Input
            id="countryCity"
            {...register("countryCity")}
            placeholder="Ex: France, Paris"
            className="bg-blanc border-gray-300 focus:border-dore focus:ring-dore"
          />
          {errors.countryCity && <p className="text-red-500 text-sm mt-1">{errors.countryCity.message}</p>}
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-noir-profond/80 mb-1">
            Adresse (Optionnel)
          </label>
          <Input
            id="address"
            {...register("address")}
            placeholder="Votre adresse postale"
            className="bg-blanc border-gray-300 focus:border-dore focus:ring-dore"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-noir-profond/80 mb-1">
            Téléphone (Optionnel)
          </label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="Votre numéro de téléphone"
            className="bg-blanc border-gray-300 focus:border-dore focus:ring-dore"
          />
        </div>
        <div>
          <label htmlFor="need" className="block text-sm font-medium text-noir-profond/80 mb-1">
            Besoin / Produit recherché *
          </label>
          <Textarea
            id="need"
            {...register("need")}
            placeholder="Décrivez votre projet, le produit que vous recherchez, etc."
            rows={5}
            className="bg-blanc border-gray-300 focus:border-dore focus:ring-dore"
          />
          {errors.need && <p className="text-red-500 text-sm mt-1">{errors.need.message}</p>}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-dore text-bleu-nuit hover:bg-dore/90 font-semibold py-3"
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </Button>
      </form>
    </div>
  )
}
