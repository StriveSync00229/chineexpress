import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
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

      // Externalize paydunya on server-side to avoid bundling issues
      if (!Array.isArray(config.externals)) {
        config.externals = [config.externals]
      }
      config.externals.push('paydunya')
    }

    // Fix for node modules compatibility
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
    }

    return config
  }
}

export default nextConfig