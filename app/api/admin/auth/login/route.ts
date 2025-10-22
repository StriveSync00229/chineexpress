import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    // Authentification avec Supabase (côté serveur uniquement)
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.log('Supabase auth error:', error)
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    // Vérifier que l'utilisateur est autorisé (admin)
    const adminEmails = ['contact@chineexpresse.com']
    if (!adminEmails.includes(data.user?.email || '')) {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    console.log('User email:', data.user?.email)
    console.log('Admin emails:', adminEmails)
    console.log('Is admin:', adminEmails.includes(data.user?.email || ''))

    // Créer la réponse avec le cookie de session
    const response = NextResponse.json({
      message: 'Connexion réussie',
      user: data.user
    })

    // Définir le cookie de session
    if (data.session?.access_token) {
      response.cookies.set('sb-access-token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 jours
      })
    }

    return response

  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}