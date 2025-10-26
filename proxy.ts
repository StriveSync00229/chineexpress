import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

/**
 * Proxy Next.js 16 - Protection des routes admin avec JWT
 *
 * Note: Next.js 16 utilise proxy.ts pour la protection des routes.
 * Ce code s'exécute à la frontière réseau avant l'application.
 *
 * Différences avec middleware.ts:
 * - Runtime: Node.js (pas Edge)
 * - Nom: "proxy" clarifie qu'on est à la couche réseau
 * - Accès complet à l'API Node.js
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */

// Clé secrète pour JWT (doit correspondre à lib/auth.ts)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-this-in-production'
)

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

  // Vérifier le token d'authentification
  const token = request.cookies.get('admin-session')?.value

  if (!token) {
    // Pas de token, rediriger vers la page de login
    const loginUrl = new URL('/secure/melissa/import007/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    // Vérifier la validité du token JWT
    await jwtVerify(token, JWT_SECRET)

    // Token valide, laisser passer
    console.log('✅ [PROXY] Authentification réussie pour:', pathname)
    return NextResponse.next()
  } catch (error) {
    // Token invalide, rediriger vers la page de login
    console.log('❌ [PROXY] Token invalide, redirection vers login')
    const loginUrl = new URL('/secure/melissa/import007/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)

    const response = NextResponse.redirect(loginUrl)
    // Supprimer le cookie invalide
    response.cookies.delete('admin-session')

    return response
  }
}

// Configuration du matcher Next.js 16
// Applique le proxy uniquement aux routes admin pour de meilleures performances
export const config = {
  matcher: [
    '/secure/melissa/import007/:path*',
  ],
}
