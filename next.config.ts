/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Fix for Next.js 16 Webpack vs Turbopack crash
  // @ts-ignore
  turbopack: {},
};

// Next 16 defaults to Turbopack for dev, which crashes if it detects Webpack plugins (like next-pwa).
// To fix this, we ONLY apply next-pwa in production and staging builds, leaving standard dev untouched.
export default process.env.NODE_ENV === "development"
  ? nextConfig
  : withPWAInit({
      dest: "public",
      register: true,
      skipWaiting: true,
    })(nextConfig);
