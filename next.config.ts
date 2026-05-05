import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
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
