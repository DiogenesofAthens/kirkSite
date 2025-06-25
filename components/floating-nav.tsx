"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Star, BookOpen, PenTool, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

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
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full px-3 py-1.5 shadow-md">
        <div className="flex items-center space-x-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-1.5 px-2 py-1.5 rounded-full transition-all duration-200 hover:bg-gray-100/50",
                  isActive && "bg-blue-100/70 text-blue-600",
                )}
                title={item.label}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium hidden sm:inline whitespace-nowrap">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
