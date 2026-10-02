import Link from "next/link"
import { NavLinks } from "@/components/nav-links"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPosts } from "@/lib/writing"

export function SiteNav() {
  const hasWriting = getPosts().length > 0

  return (
    <nav className="glass-nav fixed inset-x-0 top-0 z-50">
      <div className="px-6 sm:px-8">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4">
          <Link
            href="/"
            className="whitespace-nowrap text-[15px] font-medium tracking-[-0.005em] text-foreground"
          >
            Kirk Wessman
          </Link>
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <NavLinks hasWriting={hasWriting} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
