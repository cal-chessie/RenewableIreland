import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  turbopack: {
    // Keep Turbopack inside this repository. Without an explicit root, Next can
    // select an unrelated parent lockfile and traverse the user's home folder.
    root: process.cwd(),
  },
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
