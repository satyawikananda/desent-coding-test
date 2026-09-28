/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["takumi-js", "@takumi-rs/core", "@takumi-rs/wasm"],
  experimental: {
    // Lets `src/lib/i18n/request.ts` read the `[locale]` segment via
    // `next/root-params`, which replaces the deprecated `setRequestLocale`.
    rootParams: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
}

export default nextConfig
