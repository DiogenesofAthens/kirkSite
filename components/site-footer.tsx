import { ContactLink } from "@/components/contact-link"
import { CurrentYear } from "@/components/current-year"
import { LINKS } from "@/lib/projects"

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border px-6 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>
          © <CurrentYear /> Kirk Wessman
        </span>
        <div className="flex gap-5">
          <ContactLink className="link" />
          <a className="link" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="link" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
