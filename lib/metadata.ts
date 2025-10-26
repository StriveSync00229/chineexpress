import type { Metadata } from 'next'

/**
 * Configuration de base pour les métadonnées du site
 * Conforme aux meilleures pratiques Next.js 16
 */
export const siteConfig = {
  name: 'ChineExpresse',
  description: 'Importez de Chine sans stress avec ChineExpresse, votre partenaire expert en importation et logistique.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://chineexpresse.com',
  ogImage: '/og-image.png',
  links: {
    facebook: 'https://www.facebook.com/share/1AZ25McuRZ',
    instagram: 'https://www.instagram.com/chineexpresse.bj',
    tiktok: 'https://www.tiktok.com/@chineexpresse.bj',
  },
}

/**
 * Générer les métadonnées de base pour une page
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const pageDescription = description || siteConfig.description
  const pageImage = image || siteConfig.ogImage
  const pageUrl = `${siteConfig.url}${path}`

  return {
    title: `${title} | ${siteConfig.name}`,
    description: pageDescription,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: pageUrl,
      title,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: pageDescription,
      images: [pageImage],
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}

/**
 * Métadonnées pour une formation spécifique
 */
export function generateFormationMetadata(formation: {
  title: string
  description?: string
  price: number
  currency: string
}): Metadata {
  return generatePageMetadata({
    title: formation.title,
    description: formation.description || `Formation pratique : ${formation.title}. Prix : ${formation.price} ${formation.currency}`,
    path: '/formation-alibaba',
  })
}
