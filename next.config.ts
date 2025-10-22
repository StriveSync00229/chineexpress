import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // Remove ignoreBuildErrors to see actual errors
    // typescript: {
    //   ignoreBuildErrors: true,
    // },
  },
  images: {
    unoptimized: true,
  },
  // Fix for React 18 compatibility
  transpilePackages: ['lucide-react'],
  // Proper webpack configuration for React 18
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Handle module resolution for React 18
    if (isServer) {
      // Remove problematic externals that cause "react is not defined"
      config.externals = config.externals.filter(
        (external: string | object) => {
          if (typeof external === 'string') {
            return !['react', 'react-dom'].includes(external)
          }
          return true
        }
      )
    }

    // Fix for node modules compatibility
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    return config
  }
}

export default nextConfig