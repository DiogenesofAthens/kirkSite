import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDate, getPost } from "@/lib/writing"
import { postParams } from "@/lib/writing-params"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return postParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description || undefined,
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      url: `/writing/${post.slug}`,
      siteName: "Kirk Wessman",
      type: "article",
      publishedTime: post.date || undefined,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description || undefined },
  }
}

export default async function Post({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <article className="pb-6 pt-28 sm:pt-32">
      <Link
        href="/writing"
        className="mb-7 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Writing
      </Link>
      <h1 className="mb-3 max-w-[40rem] font-serif text-[40px] font-normal leading-[1.05] tracking-tight text-foreground sm:text-[44px]">
        {post.title}
      </h1>
      <p className="meta mb-10">
        {formatDate(post.date)}
        {post.draft && " · Draft"}
      </p>
      <div className="prose-body" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  )
}
