import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

// Clé secrète pour JWT
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-this-in-production'
)

export interface SessionData {
  username: string
  isAdmin: boolean
  expiresAt: number
}

/**
 * Créer un token JWT
 */
export async function createToken(username: string): Promise<string> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours

  const token = await new SignJWT({
    username,
    isAdmin: true,
    expiresAt: expiresAt.getTime()
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  return token
}

/**
 * Vérifier et décoder un token JWT
 */
export async function verifyToken(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as SessionData
  } catch (error) {
    return null
  }
}

/**
 * Définir le cookie de session
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()

  cookieStore.set('admin-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 jours
    path: '/'
  })
}

/**
 * Supprimer le cookie de session
 */
export async function deleteSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-session')
}

/**
 * Récupérer la session actuelle
 */
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin-session')?.value

  if (!token) return null

  return verifyToken(token)
}

/**
 * Vérifier si l'utilisateur est authentifié
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null && session.expiresAt > Date.now()
}
