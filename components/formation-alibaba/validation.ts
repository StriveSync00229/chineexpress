/**
 * Fonctions de validation pour le formulaire d'inscription
 */

import type { InscriptionData } from "./types"

export function validateInscriptionForm(
  data: InscriptionData
): { isValid: boolean; errors: Partial<InscriptionData> } {
  const errors: Partial<InscriptionData> = {}

  if (!data.name.trim()) {
    errors.name = "Le nom et prénoms sont requis"
  }

  if (!data.email.trim()) {
    errors.email = "L'email est requis"
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "L'email n'est pas valide"
  }

  if (!data.phone.trim()) {
    errors.phone = "Le téléphone est requis"
  }

  if (!data.country.trim()) {
    errors.country = "Le pays est requis"
  }

  if (!data.city.trim()) {
    errors.city = "La ville est requise"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
