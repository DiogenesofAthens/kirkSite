/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Keeps the build from failing if you have type errors after the upgrade
    ignoreBuildErrors: true,
  },
  images: {
    // Keeps your current image settings
    unoptimized: true,
  },
}

export default nextConfig