import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PostList } from "@/components/post-list"
import { getPosts } from "@/lib/writing"

export const metadata: Metadata = {
  title: "Writing",
  openGraph: { title: "Writing — Kirk Wessman", url: "/writing" },
}

export default function Writing() {
  const posts = getPosts()
  // The section stays hidden until the first post is published.
  if (posts.length === 0) notFound()

  return (
    <div className="pb-6 pt-28 sm:pt-32">
      <h1 className="mb-10 font-serif text-[40px] font-normal leading-[1.05] tracking-tight text-foreground sm:text-[44px]">
        Writing
      </h1>
      <section className="border-t border-border py-10">
        <PostList posts={posts} />
      </section>
    </div>
  )
}
