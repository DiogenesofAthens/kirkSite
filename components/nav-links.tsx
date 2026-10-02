"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function NavLinks({ hasWriting }: { hasWriting: boolean }) {
  const pathname = usePathname()

  const items = [
    { href: "/about", label: "About", match: ["/about"] },
    { href: "/portfolio", label: "Portfolio", match: ["/portfolio", "/projects"] },
    ...(hasWriting ? [{ href: "/writing", label: "Writing", match: ["/writing"] }] : []),
    { href: "/resume", label: "Resume", match: ["/resume"] },
  ]

  return (
    <div className="flex min-w-0 items-center gap-3 overflow-x-auto [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden">
      {items.map((item) => {
        const active = item.match.some((m) => pathname === m || pathname.startsWith(`${m}/`))
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "whitespace-nowrap text-sm transition-colors",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
