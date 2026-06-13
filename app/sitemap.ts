import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kirkwessman.com"
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/my-expertise`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/recommendations`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/launchpad`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/sales-playbook`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/arcade`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ]
}
