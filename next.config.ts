// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // 👇 TAMBAHKAN DOMAIN BARU INI
      {
        protocol: 'https',
        hostname: 'assets.suitdev.com',
      },
    ],
  },
};

export default nextConfig;