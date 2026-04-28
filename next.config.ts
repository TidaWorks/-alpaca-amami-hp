import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
        search: "",
      },
      {
        pathname: "/images/**",
        search: "?v=*",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
