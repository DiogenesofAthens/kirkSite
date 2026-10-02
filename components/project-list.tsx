import Link from "next/link"
import type { Project } from "@/lib/projects"

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="space-y-6">
      {projects.map((p) => (
        <li key={p.slug}>
          <Link href={`/projects/${p.slug}`} className="group block">
            <span className="flex items-baseline justify-between gap-4">
              <span className="text-[17px] font-medium text-foreground underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-underline">
                {p.name}
              </span>
              <span className="meta whitespace-nowrap">{p.status}</span>
            </span>
            <span className="mt-1 block max-w-[40rem] text-base leading-relaxed text-body">{p.line}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
