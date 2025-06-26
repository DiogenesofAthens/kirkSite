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
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100vw-32px)] max-w-4xl">
      <div className="glass-nav rounded-full px-2 sm:px-4 py-2 shadow-lg shadow-black/5 dark:shadow-black/20">
        <div className="flex items-center justify-between">
          {/* Navigation Items */}
          <div className="flex items-center space-x-0.5 sm:space-x-1 flex-1 justify-center">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 sm:space-x-2 px-1.5 sm:px-3 py-2 rounded-full transition-all duration-200 text-xs sm:text-sm font-medium",
                    "hover:bg-slate-100 dark:hover:bg-slate-800",
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                      : "text-slate-700 dark:text-slate-300",
                  )}
                  title={item.label}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden md:inline whitespace-nowrap text-xs sm:text-sm">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center ml-2">
            <div className="w-px h-4 sm:h-6 bg-slate-200 dark:bg-slate-700 mr-2"></div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
