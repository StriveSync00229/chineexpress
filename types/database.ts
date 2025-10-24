export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      formations: {
        Row: {
          id: string
          title: string
          type: 'online' | 'presential'
          location: string | null
          date: string
          time: string
          price: number
          currency: string
          promo_code: string | null
          discount: number | null
          max_participants: number
          current_participants: number
          status: 'active' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          type: 'online' | 'presential'
          location?: string | null
          date: string
          time: string
          price: number
          currency: string
          promo_code?: string | null
          discount?: number | null
          max_participants: number
          current_participants?: number
          status?: 'active' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: 'online' | 'presential'
          location?: string | null
          date?: string
          time?: string
          price?: number
          currency?: string
          promo_code?: string | null
          discount?: number | null
          max_participants?: number
          current_participants?: number
          status?: 'active' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      // Ajouter d'autres tables ici selon votre schéma
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      formation_status: 'active' | 'completed' | 'cancelled'
      formation_type: 'online' | 'presential'
    }
  }
}