import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  // Let the dev server (and its HMR socket) be reached via 127.0.0.1 as well as localhost.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
