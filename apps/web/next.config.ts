import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  turbopack: {
    resolveAlias: {
      "pg-native": "./empty-module.ts",
      dgram: "./empty-module.ts",
      dns: "./empty-module.ts",
      net: "./empty-module.ts",
      tls: "./empty-module.ts",
      fs: "./empty-module.ts",
    },
  },
};
export default nextConfig;
