import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Turbopack/webpack from bundling these packages.
  // They must run in Node's native runtime so they have access to Node's
  // TLS stack. When bundled by Turbopack the fetch polyfill it injects
  // does not support the same TLS options, causing "fetch failed" errors.
  allowedDevOrigins: [
    "localhost:3000",
    "localhost:3001",
    "localhost:3003",
    "192.168.50.130",
    "192.168.50.130:3003",
  ],

  serverExternalPackages: [
    "@neondatabase/serverless",
    "better-auth",
    "drizzle-orm",
    "pg",
  ],

  images: {
    remotePatterns: [
      // Unsplash CDN (optimised delivery)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Unsplash web URLs (category/product imageUrl from seed data)
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      // Placeholder / mock image services
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // Common CDN for product images you may upload later
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
