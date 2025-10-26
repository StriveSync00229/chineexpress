import { NextResponse } from 'next/server'
import { deleteSessionCookie } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Supprimer le cookie JWT local
    await deleteSessionCookie()

    // Supprimer aussi le cookie Supabase s'il existe
    const cookieStore = await cookies()
    cookieStore.delete('supabase-session')

    console.log('✅ Admin déconnecté (tous les tokens supprimés)')

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
