/**
 * Types et interfaces pour la section Formation Alibaba
 */

export interface InscriptionData {
  name: string
  email: string
  phone: string
  country: string
  city: string
}

export interface FormationModule {
  icon: React.ReactNode
  title: string
  description: string
  steps: string[]
  duration: string
  difficulty: string
  tools: string[]
}

export interface Country {
  value: string
  label: string
}

export interface MomoNetwork {
  value: string
  label: string
}
