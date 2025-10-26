import { NextResponse } from 'next/server'
import { deleteSessionCookie } from '@/lib/auth'

export async function POST() {
  try {
    await deleteSessionCookie()

    console.log('✅ Admin déconnecté')

    return NextResponse.json({
      success: true,
      message: 'Déconnexion réussie'
    })

  } catch (error) {
    console.error('❌ Erreur lors de la déconnexion:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
