import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createToken, setSessionCookie } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Vérifier que les credentials sont fournis
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username et password requis' },
        { status: 400 }
      )
    }

    // Récupérer les credentials depuis les variables d'environnement
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

    // MODE 1: Authentification locale (si les variables sont configurées)
    if (ADMIN_USERNAME && ADMIN_PASSWORD) {
      console.log('🔐 Utilisation de l\'authentification locale')

      // Vérifier le username
      if (username !== ADMIN_USERNAME) {
        return NextResponse.json(
          { error: 'Identifiants incorrects' },
          { status: 401 }
        )
      }

      // Vérifier le mot de passe
      // Si le mot de passe en .env commence par $2a$ ou $2b$, c'est déjà un hash bcrypt
      let passwordMatch = false
      if (ADMIN_PASSWORD.startsWith('$2a$') || ADMIN_PASSWORD.startsWith('$2b$')) {
        passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD)
      } else {
        // Sinon, comparaison directe (mode développement)
        passwordMatch = password === ADMIN_PASSWORD
      }

      if (!passwordMatch) {
        return NextResponse.json(
          { error: 'Identifiants incorrects' },
          { status: 401 }
        )
      }

      // Créer le token JWT local
      const token = await createToken(username)

      // Définir le cookie de session
      await setSessionCookie(token)

      console.log('✅ Admin connecté (local):', username)

      return NextResponse.json({
        success: true,
        message: 'Connexion réussie',
        authMode: 'local'
      })
    }

    // MODE 2: Authentification Supabase (fallback)
    console.log('🔐 Utilisation de l\'authentification Supabase')

    const supabase = createAdminClient()

    // Authentifier avec Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username, // Le username est traité comme un email
      password: password
    })

    if (error || !data.session) {
      console.error('❌ Erreur Supabase Auth:', error?.message)
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      )
    }

    // Créer un token JWT avec les données Supabase
    const token = await createToken(data.user.email || username)

    // Définir le cookie de session
    await setSessionCookie(token)

    // Stocker aussi le token Supabase dans un cookie séparé pour les appels API
    const cookieStore = await import('next/headers').then(m => m.cookies())
    const cookies = await cookieStore
    cookies.set('supabase-session', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 jours
      path: '/'
    })

    console.log('✅ Admin connecté (Supabase):', data.user.email)

    return NextResponse.json({
      success: true,
      message: 'Connexion réussie',
      authMode: 'supabase'
    })

  } catch (error) {
    console.error('❌ Erreur lors de la connexion:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
