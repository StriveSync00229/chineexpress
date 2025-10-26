import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

/**
 * Types pour les tables Supabase
 * Alignés avec le schéma actuel de la base de données
 */
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
  image_url?: string
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
  payment_token?: string  // Token PayDunya pour tracer la transaction
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

export interface Submission {
  id: string
  type: 'contact' | 'devis'
  name: string
  email: string
  phone?: string
  country_city?: string
  message: string
  // Champs spécifiques aux devis
  product?: string
  quantity?: string
  budget?: string
  // Champs spécifiques aux contacts
  address?: string
  subject?: string
  service?: string
  // Métadonnées
  status: 'pending' | 'processed' | 'quoted' | 'completed'
  created_at: string
  updated_at: string
}

// Client pour le navigateur (côté client)
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Client pour le serveur (API routes, Server Components)
export async function createClientServer() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Client admin pour les opérations sensibles (API routes admin)
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// Instance du client admin (pour compatibilité)
export const supabaseAdmin = createAdminClient()