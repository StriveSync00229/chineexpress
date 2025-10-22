import type { NextRequest } from 'next/server'

// Types pour les fonctions d'authentification
export interface AuthResult {
  authenticated: boolean
  user?: any
}

export interface LoginResult {
  success: boolean
  error?: string
  user?: any
}

// Fonction pour vérifier l'authentification admin (utilisée côté serveur uniquement)
export async function verifyAdminAuth(request: NextRequest): Promise<AuthResult> {
  try {
    // Récupérer le token d'accès depuis les cookies ou headers
    const token = request.cookies.get('sb-access-token')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '')

    console.log('=== MIDDLEWARE DEBUG ===')
    console.log('Token found:', !!token)
    console.log('Token length:', token?.length || 0)

    if (!token) {
      console.log('❌ No token found in cookies')
      return { authenticated: false }
    }

    // Vérifier le token avec Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Variables d\'environnement Supabase manquantes')
      return { authenticated: false }
    }

    console.log('Verifying token with Supabase...')
    const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': supabaseServiceKey,
        'Content-Type': 'application/json'
      }
    })

    console.log('Supabase response status:', response.status)

    if (response.ok) {
      const userData = await response.json()
      console.log('Full user data response:', JSON.stringify(userData, null, 2))

      // La réponse peut être directement l'utilisateur, pas dans userData.user
      const userEmail = userData?.email || userData?.user?.email

      console.log('User email extracted:', userEmail)
      const adminEmails = ['contact@chineexpresse.com']
      console.log('Admin emails:', adminEmails)
      console.log('Is admin check:', userEmail && adminEmails.includes(userEmail))

      if (userEmail && adminEmails.includes(userEmail)) {
        console.log('✅ User authenticated successfully')
        return { authenticated: true, user: userData }
      }
    }

    console.log('❌ Authentication failed')
    return { authenticated: false }
  } catch (error: unknown) {
    console.error('Erreur lors de la vérification de l\'authentification:', error)
    return { authenticated: false }
  }
}