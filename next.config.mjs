/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Domain-based redirects for your three domains
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'kylife.ca',
          },
        ],
        destination: '/personal',
        permanent: false,
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.kylife.ca',
          },
        ],
        destination: '/personal',
        permanent: false,
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'wildrosepainters.ca',
          },
        ],
        destination: '/business',
        permanent: false,
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.wildrosepainters.ca',
          },
        ],
        destination: '/business',
        permanent: false,
      },
      // kygroup.ca stays on the main page (/) - no redirect needed
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}

export default nextConfig
