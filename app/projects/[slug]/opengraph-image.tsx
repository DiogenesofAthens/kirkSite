import { OG_SIZE, ogCard } from "@/lib/og"
import { PROJECTS, getProject } from "@/lib/projects"

export const alt = "Project by Kirk Wessman"
export const size = OG_SIZE
export const contentType = "image/png"

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  return ogCard({
    eyebrow: "kirkwessman.com · Projects",
    title: project?.name ?? "Kirk Wessman",
    subtitle: project?.line,
    footerLeft: "Kirk Wessman",
    footerRight: project ? `${project.status} · since ${project.since}` : undefined,
  })
}
