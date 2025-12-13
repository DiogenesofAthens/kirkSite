"use client"

import { useState, useEffect, useRef, useMemo, Suspense } from "react"
import { Clock, X, GripVertical, Link2, Calendar, MapPin, Search } from "lucide-react"
import { FloatingNav } from "@/components/floating-nav"
import { cn } from "@/lib/utils"
import { useSearchParams, useRouter } from "next/navigation"

type TimeFormat = "ampm" | "24hr"

const ALL_ZONES = Intl.supportedValuesOf("timeZone")

const COMMON_ZONES = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Asia/Kolkata",
  "Australia/Sydney",
  "America/Sao_Paulo",
  "America/Chicago",
  "Europe/Berlin",
  "Africa/Johannesburg",
  "Asia/Dubai"
]

function ClockPageContent() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<number | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialized = useRef(false)

  const [zones, setZones] = useState<string[]>([])
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("ampm")
  const [copied, setCopied] = useState(false)
  const [selectedHour, setSelectedHour] = useState<number | null>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [now, setNow] = useState<Date | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  // Initialize from URL or local storage or defaults
  // Run only ONCE on mount to prevent infinite loops with router.replace
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    setNow(new Date())

    const urlZones = searchParams.get("zones")?.split(",")
    const urlHour = searchParams.get("hour")

    if (urlZones && urlZones.length > 0) {
      setZones(urlZones)
    } else {
      const savedZones = localStorage.getItem("zones")
      if (savedZones) setZones(JSON.parse(savedZones))
      else setZones(["America/New_York", "Europe/London", "Asia/Tokyo"])
    }

    if (urlHour) {
      setSelectedHour(parseInt(urlHour))
    } else {
       // Default to current hour in first zone if not specified
       const currentHour = new Date().getHours()
       setSelectedHour(currentHour)
    }

    const savedFormat = localStorage.getItem("format")
    if (savedFormat === "24hr") setTimeFormat("24hr")
  }, []) // Empty dependency array = run once on mount

  // Sync state to URL and LocalStorage
  // Only run when zones or selectedHour actually change
  useEffect(() => {
    if (!initialized.current) return // Don't sync before init

    if (zones.length > 0) {
      localStorage.setItem("zones", JSON.stringify(zones))

      const params = new URLSearchParams()
      params.set("zones", zones.join(","))
      if (selectedHour !== null) params.set("hour", selectedHour.toString())

      // Update URL without full reload
      router.replace(`?${params.toString()}`, { scroll: false })
    }
  }, [zones, selectedHour, router])

  useEffect(() => {
    localStorage.setItem("format", timeFormat)
  }, [timeFormat])

  // Scroll logic
  useEffect(() => {
    if (selectedHour !== null && scrollRef.current) {
        // Center the selected hour
        // 180px sidebar + 56px per hour.
        // We want (180 + selectedHour * 56) to be in the middle
        const targetX = (selectedHour * 56) - (scrollRef.current.clientWidth / 2) + 180 + 28
        scrollRef.current.scrollTo({ left: targetX, behavior: "smooth" })
    }
  }, [selectedHour]) // Only scroll when selectedHour changes explicitly (usually user interaction or init)


  const removeZone = (tz: string) => setZones(zones.filter((z) => z !== tz))
  const addZone = (tz: string) => {
    if (!zones.includes(tz)) setZones([...zones, tz])
    setShowSearch(false)
    setSearchQuery("")
  }

  const reorderZones = (from: number, to: number) => {
    const updated = [...zones]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    setZones(updated)
  }

  const formatDay = (offset: number) => {
    if (!now) return ""
    const date = new Date(now)
    date.setDate(date.getDate() + offset)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const getHourData = (tz: string, hour: number, offset: number) => {
    if (!now) return { hour: 0, display: "--", minute: "", ampm: "", isBusiness: false, isNight: false }
    const base = new Date(now)
    base.setDate(base.getDate() + offset)
    base.setHours(hour, 0, 0, 0)

    // Get hour in that timezone
    const tzDateStr = base.toLocaleString("en-US", { timeZone: tz })
    const tzDate = new Date(tzDateStr)
    const h24 = tzDate.getHours()

    // Business hours: 9am - 5pm (17:00)
    const isBusiness = h24 >= 9 && h24 < 17
    // Night hours: 10pm - 7am
    const isNight = h24 >= 22 || h24 < 7

    // Formatting
    const options: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      hour: "numeric",
      minute: "2-digit",
      hour12: timeFormat === "ampm"
    }
    const timeStr = base.toLocaleTimeString("en-US", options)
    const [h, m] = timeStr.split(":")
    const [minute, ampm] = m.split(" ")

    return {
      hour: h24,
      display: h,
      minute: minute === "00" ? "" : minute,
      ampm,
      isBusiness,
      isNight
    }
  }

  // Handle click-drag selection
  const handleMouseDown = (hour: number) => {
      setIsMouseDown(true)
      setSelectedHour(hour)
  }
  const handleMouseEnter = (hour: number) => {
      if (isMouseDown) {
          setSelectedHour(hour)
      }
  }
  const handleMouseUp = () => {
      setIsMouseDown(false)
  }

  // Global mouse up to catch drags outside
  useEffect(() => {
      window.addEventListener("mouseup", handleMouseUp)
      return () => window.removeEventListener("mouseup", handleMouseUp)
  }, [])

  const filteredZones = useMemo(() => {
    if (!searchQuery) return COMMON_ZONES
    return ALL_ZONES.filter(z => z.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
          // Prioritize startsWith
          const aStarts = a.toLowerCase().startsWith(searchQuery.toLowerCase())
          const bStarts = b.toLowerCase().startsWith(searchQuery.toLowerCase())
          if (aStarts && !bStarts) return -1
          if (!aStarts && bStarts) return 1
          return a.localeCompare(b)
      })
      .slice(0, 20)
  }, [searchQuery])


  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav />
      <main className="px-4 pt-24 pb-12 max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Clock className="w-8 h-8 text-primary" /> Global Meeting Planner
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex bg-muted rounded-lg p-1">
              {(["ampm", "24hr"] as TimeFormat[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTimeFormat(mode)}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md transition-all",
                    timeFormat === mode
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {mode === "ampm" ? "AM/PM" : "24h"}
                </button>
              ))}
            </div>
            <button
              className="text-sm font-medium flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              onClick={() => {
                const url = window.location.href
                navigator.clipboard.writeText(url)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
            >
              <Link2 className="w-4 h-4" /> {copied ? "Link Copied!" : "Share Event"}
            </button>
          </div>
        </div>

        {/* Calendar / Grid */}
        <div className="relative rounded-xl border border-border/50 bg-card shadow-xl overflow-hidden select-none">
            {/* Scrubber Line */}
            {selectedHour !== null && (
                 <div
                    className="absolute top-0 bottom-0 w-[54px] border-2 border-yellow-500/50 bg-yellow-500/10 z-20 pointer-events-none rounded transition-all duration-100"
                    style={{
                        left: 180 + (selectedHour * 56),
                        // Offset for 2 days worth of hours
                    }}
                >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-bold px-1.5 rounded-full">
                        {selectedHour > 23 ? selectedHour - 24 : selectedHour}:00
                    </div>
                </div>
            )}

          <div
            ref={scrollRef}
            className="grid grid-cols-[180px_repeat(48,56px)] overflow-x-auto relative pb-4"
          >
            {/* Header Row: Days */}
            <div className="sticky left-0 z-30 bg-muted/80 backdrop-blur border-r border-b p-3 font-semibold text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Locations
            </div>
            {Array.from({ length: 2 }).flatMap((_, offset) =>
              Array.from({ length: 24 }).map((_, hour) => (
                <div
                  key={`day-${offset}-hour-${hour}`}
                  className={cn(
                    "border-r border-b text-center py-2 text-xs font-semibold bg-muted/50 text-muted-foreground",
                    // Highlight first column of a new day
                    hour === 0 && "border-l-2 border-l-border"
                  )}
                >
                  {hour === 0 ? formatDay(offset) : ""}
                </div>
              ))
            )}

            {/* Timezone Rows */}
            {zones.map((tz, i) => (
              <>
                {/* Timezone Label (Sticky Left) */}
                <div
                  key={`tz-${tz}`}
                  className="sticky left-0 z-30 bg-card border-r border-b flex items-center justify-between px-3 py-3 group hover:bg-muted/30 transition-colors"
                  draggable
                  onDragStart={() => (dragStart.current = i)}
                  onDragOver={(e) => {
                    e.preventDefault()
                    if (dragStart.current !== null && dragStart.current !== i) {
                      reorderZones(dragStart.current, i)
                      dragStart.current = i
                    }
                  }}
                >
                  <div className="flex flex-col min-w-0">
                      <span className="font-bold text-sm truncate">{tz.split("/").pop()?.replaceAll("_", " ")}</span>
                      <span className="text-[10px] text-muted-foreground truncate">{tz.split("/")[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                      <button onClick={() => removeZone(tz)} className="hover:text-destructive"><X className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Hours Grid */}
                {Array.from({ length: 2 }).flatMap((_, offset) =>
                  Array.from({ length: 24 }).map((_, hour) => {
                    // Adjust hour for the 2-day view logic if needed, but here simple 0-23 + offset is easier to render
                    // Actually, we render 48 columns (0-47).
                    const actualHourIndex = offset * 24 + hour
                    const { display, minute, ampm, isBusiness, isNight } = getHourData(tz, hour, offset)

                    return (
                      <div
                        key={`${tz}-${offset}-${hour}`}
                        onMouseDown={() => handleMouseDown(actualHourIndex)}
                        onMouseEnter={() => handleMouseEnter(actualHourIndex)}
                        className={cn(
                          "border-r border-b text-center relative h-14 flex flex-col items-center justify-center cursor-pointer transition-colors select-none",
                          // Colors
                          isBusiness ? "bg-emerald-500/10 hover:bg-emerald-500/20" :
                          isNight ? "bg-slate-900/10 dark:bg-slate-100/5 hover:bg-slate-900/20" :
                          "bg-amber-500/5 hover:bg-amber-500/15",

                          // Selection Highlight (vertical column is handled by absolute div, but we can add subtle effect)
                          selectedHour === actualHourIndex && "bg-primary/5"
                        )}
                      >
                        <span className={cn(
                            "text-sm font-medium",
                            isBusiness ? "text-emerald-700 dark:text-emerald-400" :
                            isNight ? "text-slate-500 dark:text-slate-400" :
                            "text-amber-700 dark:text-amber-400"
                        )}>
                            {display}
                        </span>
                        {timeFormat === "ampm" && (
                            <span className="text-[9px] uppercase text-muted-foreground leading-none">{ampm}</span>
                        )}
                      </div>
                    )
                  })
                )}
              </>
            ))}
          </div>
        </div>

        {/* Add Zone Search */}
        <div className="max-w-md">
            {!showSearch ? (
                <button
                    onClick={() => setShowSearch(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                >
                    <Search className="w-4 h-4" /> Add Timezone
                </button>
            ) : (
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search city or timezone..."
                        className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <div className="absolute top-full mt-1 w-full bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                            {filteredZones.map(z => (
                                <button
                                    key={z}
                                    onClick={() => addZone(z)}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors border-b border-border/50 last:border-0"
                                >
                                    {z}
                                </button>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={() => setShowSearch(false)}
                        className="absolute right-3 top-2.5 text-xs text-muted-foreground hover:text-foreground"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>

        {/* Legend */}
        <div className="flex gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500/20 border border-emerald-500/50 rounded" />
                <span>Business Hours (9am-5pm)</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500/10 border border-amber-500/50 rounded" />
                <span>Personal Time</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-500/10 border border-slate-500/50 rounded" />
                <span>Night</span>
            </div>
        </div>

      </main>
    </div>
  )
}

export default function ClockPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ClockPageContent />
        </Suspense>
    )
}
