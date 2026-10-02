/** Posts from the previous version of the site; each now redirects to /portfolio. */
const RETIRED_POSTS = [
  "ai-hype",
  "api-product-lessons",
  "capability-overhang",
  "cut-cable",
  "discovery-is-architecture",
  "enterprise-contract-sales-processes",
  "future-of-saas-sales-2024",
  "government-contract-sales-processes",
  "groq-apps",
  "jules-developer",
  "optimizing-enterprise-tech-implementations",
  "speedtest-tracker",
  "universal-remote",
  "vibe-coding-with-claude",
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/oai",
        destination: "https://portkey-one.vercel.app/demo?provider=openai",
        permanent: false,
      },
      { source: "/my-expertise", destination: "/about", permanent: true },
      { source: "/recommendations", destination: "/about", permanent: true },
      ...RETIRED_POSTS.map((slug) => ({ source: `/portfolio/${slug}`, destination: "/portfolio", permanent: true })),
      { source: "/resources/:path*", destination: "/portfolio", permanent: true },
      { source: "/tools/:path*", destination: "/portfolio", permanent: true },
      { source: "/arcade", destination: "/", permanent: true },
      { source: "/clock", destination: "/", permanent: true },
      { source: "/launchpad", destination: "/", permanent: true },
      { source: "/sales-playbook/:path*", destination: "/", permanent: true },
      { source: "/downloads/:path*", destination: "/", permanent: true },
    ]
  },
  reactCompiler: true,
  cacheComponents: true,
}

export default nextConfig
