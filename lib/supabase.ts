import { createClient } from '@supabase/supabase-js'

// Client Supabase pour les opérations côté serveur uniquement
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Types pour les tables
export interface Formation {
  id: string
  title: string
  type: 'online' | 'presential'
  location?: string
  date: string
  time: string
  price: number
  currency: string
  promo_code?: string
  discount?: number
  max_participants: number
  current_participants: number
  status: 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface FormationInscription {
  id: string
  formation_id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: 'pending' | 'paid' | 'cancelled'
  payment_date?: string
  amount?: number
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'pending' | 'processed'
  created_at: string
}

export interface QuoteRequest {
  id: string
  name: string
  email: string
  phone?: string
  country?: string
  product: string
  quantity?: string
  budget?: string
  message?: string
  status: 'pending' | 'quoted' | 'completed'
  created_at: string
}

// Fonction utilitaire pour créer les tables dans Supabase
export const createTables = async () => {
  const { error } = await supabaseAdmin.rpc('create_admin_tables')
  if (error) console.error('Erreur lors de la création des tables:', error)
}
