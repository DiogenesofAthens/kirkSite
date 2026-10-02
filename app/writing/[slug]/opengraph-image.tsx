import { OG_SIZE, ogCard } from "@/lib/og"
import { formatDate, getPost } from "@/lib/writing"
import { postParams } from "@/lib/writing-params"

export const alt = "Writing by Kirk Wessman"
export const size = OG_SIZE
export const contentType = "image/png"

export function generateStaticParams() {
  return postParams()
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  return ogCard({
    eyebrow: post?.date ? `kirkwessman.com · ${formatDate(post.date)}` : "kirkwessman.com",
    title: post?.title ?? "Writing",
    subtitle: post?.description || undefined,
    footerLeft: "Kirk Wessman",
  })
}
