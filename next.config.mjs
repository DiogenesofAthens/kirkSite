/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/oai",
        destination: "https://portkey-one.vercel.app/demo",
        permanent: false,
      },
      { source: "/my-expertise", destination: "/about", permanent: true },
      { source: "/recommendations", destination: "/about", permanent: true },
    ]
  },
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
