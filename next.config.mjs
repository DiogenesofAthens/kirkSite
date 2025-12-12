/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactCompiler: true,
  cacheComponents: true, // Moved to root based on warning
  experimental: {
     // cacheComponents: true, // Moved to root
  },
}

export default nextConfig
