/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res-console.cloudinary.com'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
