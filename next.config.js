/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lms.gift-ed.com',
        pathname: '/static/**',
      },
    ],
  },
}

module.exports = nextConfig
