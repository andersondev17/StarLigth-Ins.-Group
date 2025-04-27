/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
    minimumCacheTTL: 31536000, // 1 año en segundos
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimizaciones de caché
  async headers() {
    return [
      {
        source: '/img/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Optimizaciones experimentales
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'gsap', 'react-use'],
  },
 
};

module.exports = nextConfig;