import type { MetadataRoute } from "next"
import { PROJECTS } from "@/lib/projects"
import { getPosts } from "@/lib/writing"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kirkwessman.com"
  const posts = getPosts()

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/resume`, changeFrequency: "monthly", priority: 0.7 },
    ...PROJECTS.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...(posts.length > 0 ? [{ url: `${base}/writing`, changeFrequency: "weekly" as const, priority: 0.8 }] : []),
    ...posts.map((p) => ({
      url: `${base}/writing/${p.slug}`,
      lastModified: p.date || undefined,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ]
}
