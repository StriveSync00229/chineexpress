import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { createClient } from '@supabase/supabase-js'

/**
 * Proxy Next.js 16 - Protection des routes admin avec authentification hybride
 *
 * Supporte deux modes d'authentification:
 * 1. JWT local (si ADMIN_USERNAME/ADMIN_PASSWORD configurés)
 * 2. Supabase Auth (fallback automatique)
 *
 * Note: Next.js 16 utilise proxy.ts pour la protection des routes.
 * Ce code s'exécute à la frontière réseau avant l'application.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */

// Clé secrète pour JWT (doit correspondre à lib/auth.ts)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-this-in-production'
)

// Client Supabase pour vérification des sessions
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Routes qui nécessitent une authentification
const PROTECTED_ROUTES = [
  '/secure/melissa/import007/admin'
]

// Routes publiques sous /secure qui ne nécessitent pas d'auth
const PUBLIC_ROUTES = [
  '/secure/melissa/import007/login'
]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Vérifier si la route est protégée
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route))

  // Si ce n'est pas une route protégée, laisser passer
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Si c'est une route publique sous /secure, laisser passer
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // MODE 1: Vérifier le token JWT local
  const jwtToken = request.cookies.get('admin-session')?.value

  if (jwtToken) {
    try {
      // Vérifier la validité du token JWT local
      await jwtVerify(jwtToken, JWT_SECRET)

      // Token valide, laisser passer
      console.log('✅ [PROXY] Authentification locale réussie pour:', pathname)
      return NextResponse.next()
    } catch (error) {
      console.log('⚠️  [PROXY] Token JWT local invalide, tentative Supabase...')
      // Ne pas rediriger ici, essayer d'abord Supabase Auth
    }
  }

  // MODE 2: Vérifier la session Supabase (fallback)
  const supabaseToken = request.cookies.get('supabase-session')?.value

  if (supabaseToken) {
    try {
      // Vérifier la validité du token Supabase
      const { data, error } = await supabase.auth.getUser(supabaseToken)

      if (!error && data.user) {
        console.log('✅ [PROXY] Authentification Supabase réussie pour:', pathname)
        return NextResponse.next()
      }

      console.log('⚠️  [PROXY] Token Supabase invalide:', error?.message)
    } catch (error) {
      console.log('⚠️  [PROXY] Erreur vérification Supabase:', error)
    }
  }

  // Aucune authentification valide trouvée
  console.log('❌ [PROXY] Aucune authentification valide, redirection vers login')
  const loginUrl = new URL('/secure/melissa/import007/login', request.url)
  loginUrl.searchParams.set('redirect', pathname)

  const response = NextResponse.redirect(loginUrl)
  // Supprimer les cookies invalides
  response.cookies.delete('admin-session')
  response.cookies.delete('supabase-session')

  return response
}

// Configuration du matcher Next.js 16
// Applique le proxy uniquement aux routes admin pour de meilleures performances
export const config = {
  matcher: [
    '/secure/melissa/import007/:path*',
  ],
}
