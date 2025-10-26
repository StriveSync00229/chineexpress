import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createToken, setSessionCookie } from '@/lib/auth'

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

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('⚠️ ADMIN_USERNAME ou ADMIN_PASSWORD non configurés dans .env.local')
      return NextResponse.json(
        { error: 'Configuration admin manquante' },
        { status: 500 }
      )
    }

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

    // Créer le token JWT
    const token = await createToken(username)

    // Définir le cookie de session
    await setSessionCookie(token)

    console.log('✅ Admin connecté:', username)

    return NextResponse.json({
      success: true,
      message: 'Connexion réussie'
    })

  } catch (error) {
    console.error('❌ Erreur lors de la connexion:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
