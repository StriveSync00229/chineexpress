import { Loader2 } from 'lucide-react'

/**
 * Composants de chargement pour Suspense boundaries
 * Conformes aux best practices Next.js 16
 */

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 text-dore mx-auto animate-spin" />
        <p className="text-gray-600">Chargement...</p>
      </div>
    </div>
  )
}

export function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-3">
        <Loader2 className="h-8 w-8 text-dore mx-auto animate-spin" />
        <p className="text-sm text-gray-600">Chargement...</p>
      </div>
    </div>
  )
}

export function CardLoader() {
  return (
    <div className="flex items-center justify-center p-6">
      <Loader2 className="h-6 w-6 text-dore animate-spin" />
    </div>
  )
}

export function InlineLoader({ size = 16 }: { size?: number }) {
  return (
    <Loader2
      className="animate-spin text-dore"
      style={{ width: size, height: size }}
    />
  )
}
