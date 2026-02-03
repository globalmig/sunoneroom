import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.qshop.ai",
      },
    ],
  },
};

export default nextConfig;
