import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Disable Partial Prerendering (PPR).
  // PPR wraps client component boundaries in <div hidden id="S:0"> during
  // SSR, then swaps them in via streaming after hydration. Our homepage uses
  // dangerouslySetInnerHTML (a static HTML blob, not a React tree), so
  // hydration can never reconcile it — the S:0 div stays hidden permanently,
  // making half the page invisible.
  experimental: {
    ppr: false,
  },
};

export default nextConfig;
