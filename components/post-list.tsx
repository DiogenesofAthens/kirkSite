import Link from "next/link"
import { formatDate, type Post } from "@/lib/writing"

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="space-y-6">
      {posts.map((p) => (
        <li key={p.slug}>
          <Link href={`/writing/${p.slug}`} className="group block">
            <span className="flex items-baseline justify-between gap-4">
              <span className="text-[17px] font-medium text-foreground underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-underline">
                {p.title}
              </span>
              <span className="meta whitespace-nowrap">{formatDate(p.date)}</span>
            </span>
            {p.description && (
              <span className="mt-1 block max-w-[40rem] text-base leading-relaxed text-body">{p.description}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
