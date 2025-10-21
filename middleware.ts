import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Protéger les routes admin
  if (path.startsWith('/secure/melissa/import007/admin')) {
    // Vérifier si l'utilisateur a un cookie d'authentification valide
    const token = request.cookies.get('sb-access-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Ici vous pourriez vérifier la validité du token avec Supabase côté serveur
    // Pour l'instant, on considère qu'un token présent = authentifié
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/secure/:path*']
}