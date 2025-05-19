import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // you can add pathname if needed, e.g. pathname: '/your-folder/**'
      },
    ],
  },
};

export default nextConfig;
