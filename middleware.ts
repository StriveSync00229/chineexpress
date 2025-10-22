import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAdminAuth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log('=== MIDDLEWARE DEBUG ===')
  console.log('Current path:', path)
  console.log('Is admin route:', path.startsWith('/secure/melissa/import007/admin'))
  console.log('Is login page:', path.endsWith('/login'))

  // Protéger les routes admin (sauf la page de login)
  if (path.startsWith('/secure/melissa/import007/admin') && !path.endsWith('/login')) {
    console.log('🔒 Protecting admin route...')

    // Vérifier si l'utilisateur a un cookie d'authentification valide
    const authResult = await verifyAdminAuth(request)

    console.log('Auth result:', authResult.authenticated)

    if (!authResult.authenticated) {
      console.log('❌ User not authenticated, redirecting to login...')
      return NextResponse.redirect(new URL('/secure/melissa/import007/admin/login', request.url))
    }

    console.log('✅ User authenticated, allowing access to:', path)
    // L'utilisateur est authentifié et autorisé
  } else {
    console.log('✅ Route not protected, allowing access')
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/secure/:path*']
}