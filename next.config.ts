import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api-send/:path*",
        destination: "https://mail-smpt-vercel.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
// firebasestorage.googleapis.com
