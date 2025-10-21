"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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
  whatsappPhone: z.string().min(10, "Le numéro WhatsApp doit contenir au moins 10 caractères.").regex(/^[\+]?[0-9\s\-\(\)]+$/, "Format de numéro de téléphone invalide."),
  countryCity: z.string().min(2, "Veuillez indiquer votre pays et ville."),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
})

type ContactFormData = z.infer<typeof formSchema>

interface ServiceQuoteModalProps {
  isOpen: boolean
  onClose: () => void
  serviceTitle: string
}

export default function ServiceQuoteModal({ isOpen, onClose, serviceTitle }: ServiceQuoteModalProps) {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          subject: `Demande de devis - ${serviceTitle}`,
          service: serviceTitle
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message.")
      }

      toast({
        title: "Demande de devis envoyée !",
        description: "Nous vous contacterons bientôt avec un devis personnalisé.",
      })
      reset()
      onClose()
    } catch (error) {
      toast({
        title: "Erreur",
        description: (error as Error).message || "Une erreur s'est produite.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold text-center text-blue-950">
            Demande de devis - {serviceTitle}
          </DialogTitle>
          <DialogDescription className="text-black">
            Remplissez ce formulaire pour recevoir un devis personnalisé pour nos services d'importation.
          </DialogDescription>
        </DialogHeader>
        












        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              {...register("whatsappPhone")}
              type="tel"
              placeholder="Numéro WhatsApp (ex: +33 6 12 34 56 78)"
              className="bg-gray-100 border-gray-300 focus:border-dore focus:ring-dore"
            />
            {errors.whatsappPhone && <p className="text-red-500 text-sm mt-1">{errors.whatsappPhone.message}</p>}
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
              placeholder="Décrivez votre projet et vos besoins spécifiques..."
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
            {isSubmitting ? "Envoi en cours..." : "Recevoir mon devis"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
