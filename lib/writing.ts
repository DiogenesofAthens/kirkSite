import fs from "node:fs"
import path from "node:path"
import { marked } from "marked"

/**
 * Posts are Markdown files in content/writing/<slug>.md with a small front matter block:
 *
 *   ---
 *   title: What I learned swapping model providers
 *   date: 2026-10-04
 *   description: One sentence for link previews and the index.
 *   draft: true            # optional; drafts render in `next dev` only
 *   ---
 */
export type Post = {
  slug: string
  title: string
  date: string
  description: string
  draft: boolean
  html: string
}

const DIR = path.join(process.cwd(), "content", "writing")

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8")
  const slug = file.replace(/\.md$/, "")
  const meta: Record<string, string> = {}
  let body = raw

  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (fm) {
    for (const line of fm[1].split(/\r?\n/)) {
      const i = line.indexOf(":")
      if (i > 0) {
        meta[line.slice(0, i).trim()] = line
          .slice(i + 1)
          .replace(/\s+#.*$/, "")
          .trim()
          .replace(/^["']|["']$/g, "")
      }
    }
    body = fm[2]
  }

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    description: meta.description || "",
    draft: meta.draft === "true",
    html: wrapTables(marked.parse(body, { async: false, gfm: true }) as string),
  }
}

/** Full-width tables that scroll sideways on narrow screens instead of widening the page */
function wrapTables(html: string) {
  return html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>")
}

export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return []
  const showDrafts = process.env.NODE_ENV === "development"
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(readPost)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug)
}

export function formatDate(iso: string) {
  if (!iso) return ""
  const d = new Date(`${iso}T12:00:00Z`)
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
}
