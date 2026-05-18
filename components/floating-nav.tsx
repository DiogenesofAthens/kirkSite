"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/my-expertise", label: "Expertise" },
  { href: "/resume", label: "Resume" },
  { href: "/portfolio", label: "Portfolio" },
]

export function FloatingNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto scrollbar-hide -mx-1 px-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === "/portfolio" && pathname.startsWith("/portfolio"))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-xs sm:text-sm tracking-wide uppercase transition-opacity duration-200 whitespace-nowrap flex-shrink-0",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
