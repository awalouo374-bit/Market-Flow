import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
