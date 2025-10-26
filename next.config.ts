import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Turbopack est maintenant le bundler par défaut en dev avec --turbo
  // et fonctionne aussi en production
  turbopack: {},

  // TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },

  // Optimisation des images Next.js
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ttzosonjpjphlpcyjvfu.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // Transpiler les packages qui en ont besoin
  transpilePackages: ['lucide-react'],
}

export default nextConfig
