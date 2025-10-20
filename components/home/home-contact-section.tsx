"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("L'adresse e-mail n'est pas valide."),
  countryCity: z.string().min(2, "Veuillez indiquer votre pays et ville."),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
})

type FormData = z.infer<typeof formSchema>

export default function HomeContactSection() {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l_envoi du message.")
      }

      toast({
        title: "Message envoyé !",
        description: "Nous vous recontacterons bientôt.",
      })
      reset()
    } catch (error) {
      toast({
        title: "Erreur",
        description: (error as Error).message || "Une erreur s'est produite.",
        variant: "destructive",
      })
    }
  }

  return (
    <section id="contact-form-home" className="py-16 md:py-24 bg-gray-50 text-noir-profond">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-bleu-nuit mb-4">
            Prêt à démarrer votre projet d'import ?
          </h2>
          <p className="text-noir-profond/80 mb-8">
            Remplissez ce formulaire pour une demande de sourcing ou toute autre question.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl mx-auto space-y-6 bg-blanc p-8 rounded-lg shadow-lg"
        >
          <div>
            <Input
              {...register("name")}
              placeholder="Nom & Prénom"
              className="bg-gray-100 border-gray-300 focus:border-dore focus:ring-dore"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Adresse Email"
              className="bg-gray-100 border-gray-300 focus:border-dore focus:ring-dore"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Input
              {...register("countryCity")}
              placeholder="Pays & Ville"
              className="bg-gray-100 border-gray-300 focus:border-dore focus:ring-dore"
            />
            {errors.countryCity && <p className="text-red-500 text-sm mt-1">{errors.countryCity.message}</p>}
          </div>
          <div>
            <Textarea
              {...register("message")}
              placeholder="Votre besoin / Produit recherché"
              rows={5}
              className="bg-gray-100 border-gray-300 focus:border-dore focus:ring-dore"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-dore text-bleu-nuit hover:bg-dore/90 font-semibold py-3"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
          </Button>
        </form>
      </div>
    </section>
  )
}
