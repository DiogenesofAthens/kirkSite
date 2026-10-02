import { getPosts } from "@/lib/writing"

/**
 * Cache Components requires generateStaticParams to return at least one result.
 * Until the first post exists, build one placeholder path; its page calls notFound().
 */
export const NO_POSTS_SLUG = "none"

export function postParams() {
  const posts = getPosts()
  return posts.length > 0 ? posts.map((p) => ({ slug: p.slug })) : [{ slug: NO_POSTS_SLUG }]
}
