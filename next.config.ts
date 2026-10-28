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
  async redirects() {
    return [
      // www 付きで来た人は www 無しへ（Vercel をやめた後もこれで転送する）
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.alpaca-amami.com" }],
        destination: "https://alpaca-amami.com/:path*",
        permanent: true,
      },
      {
        source: "/agent",
        destination: "/smart",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
