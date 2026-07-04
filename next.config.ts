import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/v8-homepage.html",
      },
    ];
  },
};

export default nextConfig;
