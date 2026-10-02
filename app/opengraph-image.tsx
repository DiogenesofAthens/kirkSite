import { OG_SIZE, ogCard } from "@/lib/og"

export const alt = "Kirk Wessman — Solutions Engineer, Enterprise AI Systems"
export const size = OG_SIZE
export const contentType = "image/png"

export default async function Image() {
  return ogCard({
    eyebrow: "kirkwessman.com",
    title: "Kirk Wessman",
    subtitle: "Solutions Engineer · Enterprise AI Systems",
    footerLeft: "Discovery, architecture, evals, and security review.",
    footerRight: "Los Angeles",
  })
}
