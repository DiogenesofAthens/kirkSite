import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PROJECTS, getNeighbors, getProject } from "@/lib/projects"
import { PROJECT_BODIES } from "@/content/projects"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  const title = `${project.name} — Kirk Wessman`
  return {
    title: project.name,
    description: project.line,
    openGraph: { title, description: project.line, url: `/projects/${project.slug}` },
    twitter: { title, description: project.line },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  const Body = PROJECT_BODIES[slug]
  if (!project || !Body) notFound()
  const { prev, next } = getNeighbors(slug)

  return (
    <article className="pb-6 pt-28 sm:pt-32">
      <Link
        href="/portfolio"
        className="mb-7 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Portfolio
      </Link>
      <h1 className="mb-3 font-serif text-[40px] font-normal leading-[1.05] tracking-tight text-foreground sm:text-[44px]">
        {project.name}
      </h1>
      <p className="meta mb-3.5">
        Since {project.since} · {project.status} · {project.stack}
      </p>
      <p className="mb-9 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[15px]">
        {project.links.map((l) => (
          <span key={l.href} className="whitespace-nowrap">
            <a className="link" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
            {l.note && <span className="ml-2 text-muted-foreground">{l.note}</span>}
          </span>
        ))}
        {project.linksNote && <span className="text-muted-foreground">{project.linksNote}</span>}
      </p>

      <div className="prose-body">
        <Body />
      </div>

      <nav
        aria-label="More projects"
        className="mt-12 flex max-w-[40rem] justify-between gap-4 border-t border-border pt-5 text-[15px]"
      >
        {prev ? (
          <Link className="link" href={`/projects/${prev.slug}`}>
            ← {prev.name}
          </Link>
        ) : (
          <Link className="link" href="/portfolio">
            ← Portfolio
          </Link>
        )}
        {next ? (
          <Link className="link" href={`/projects/${next.slug}`}>
            {next.name} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
