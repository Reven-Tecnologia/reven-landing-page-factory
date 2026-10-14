const origin = process.env.CLIENT_ASSET_ORIGIN;
const remotePatterns = origin ? [new URL("/**", origin)] : [];

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: process.cwd() },
  // Clinical images and portrait are already prepared: deliver their source bytes.
  images: { remotePatterns, unoptimized: true },
  devIndicators: false,
};
export default nextConfig;
