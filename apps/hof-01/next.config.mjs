const origin = process.env.CLIENT_ASSET_ORIGIN;
const remotePatterns = origin ? [new URL("/**", origin)] : [];

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: process.cwd() },
  images: { remotePatterns },
  devIndicators: false,
};
export default nextConfig;
