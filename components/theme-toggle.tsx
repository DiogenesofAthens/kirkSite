"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const dark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="-mr-2 inline-flex h-8 w-8 flex-none items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
    >
      {!mounted ? (
        <span className="h-4 w-4" />
      ) : dark ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  )
}
