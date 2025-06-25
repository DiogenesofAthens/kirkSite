"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Star, BookOpen, PenTool, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/my-expertise", label: "My Expertise", icon: Briefcase },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/recommendations", label: "Recommendations", icon: Star },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/blog", label: "Blog", icon: PenTool },
]

export function FloatingNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-[calc(100vw-200px)]">
      <div className="glass-nav rounded-full px-4 py-2 shadow-lg shadow-black/5 dark:shadow-black/20">
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 text-sm font-medium",
                  "hover:bg-slate-100 dark:hover:bg-slate-800",
                  isActive
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    : "text-slate-700 dark:text-slate-300",
                )}
                title={item.label}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline whitespace-nowrap">{item.label}</span>
              </Link>
            )
          })}
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
