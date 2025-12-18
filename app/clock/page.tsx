"use client"

import { useState, useEffect, useRef, useMemo, Suspense } from "react"
import { Clock, X, GripVertical, Link2, MapPin, Search, Calendar, ChevronLeft, ChevronRight, Home } from "lucide-react"
import { FloatingNav } from "@/components/floating-nav"
import { cn } from "@/lib/utils"
import { useSearchParams, useRouter } from "next/navigation"
import { searchCities, CityResult } from "@/lib/search-cities"

type TimeFormat = "ampm" | "24hr"

interface ClockEntry {
    id: string
    city: string
    country: string
    timezone: string
}

function ClockPageContent() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<number | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialized = useRef(false)

  const [entries, setEntries] = useState<ClockEntry[]>([])
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("ampm")
  const [copied, setCopied] = useState(false)
  const [hoveredColIndex, setHoveredColIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<CityResult[]>([])
  const [showSearch, setShowSearch] = useState(false)

  // Initialize from URL or LocalStorage
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Load Entries
    const urlEntries = searchParams.get("locations")
    if (urlEntries) {
        // Format: City|Country|Timezone,City2|...
        try {
            const parsed = urlEntries.split(",").map(s => {
                const [city, country, timezone] = s.split("|")
                return { id: crypto.randomUUID(), city, country, timezone }
            })
            setEntries(parsed)
        } catch (e) {
            console.error("Failed to parse locations", e)
        }
    } else {
        const saved = localStorage.getItem("clock_entries")
        if (saved) {
            try {
                setEntries(JSON.parse(saved))
            } catch (e) {
                setEntries(DEFAULT_ENTRIES)
            }
        } else {
            setEntries(DEFAULT_ENTRIES)
        }
    }

    // Load Date
    const urlDate = searchParams.get("date")
    if (urlDate) setDate(urlDate)

    // Load Format
    const savedFormat = localStorage.getItem("clock_format")
    if (savedFormat === "24hr") setTimeFormat("24hr")

    // Scroll to current time approx (delayed to allow render)
    setTimeout(() => {
        const currentHour = new Date().getHours()
        scrollToHour(currentHour)
    }, 100)
  }, [])

  const scrollToHour = (hour: number) => {
      if (scrollRef.current) {
          const targetX = (hour * 60) - (scrollRef.current.clientWidth / 2) + 30
          scrollRef.current.scrollTo({ left: Math.max(0, targetX), behavior: "smooth" })
      }
  }

  // Sync State to URL & LocalStorage
  useEffect(() => {
    if (!initialized.current) return

    localStorage.setItem("clock_entries", JSON.stringify(entries))
    localStorage.setItem("clock_format", timeFormat)

    const params = new URLSearchParams()

    if (entries.length > 0) {
        const locString = entries.map(e => `${e.city}|${e.country}|${e.timezone}`).join(",")
        params.set("locations", locString)
    }

    params.set("date", date)

    router.replace(`?${params.toString()}`, { scroll: false })
  }, [entries, date, timeFormat, router])

  // Search Logic
  useEffect(() => {
      if (!searchQuery) {
          setSearchResults([])
          return
      }
      const delay = setTimeout(() => {
          const res = searchCities(searchQuery)
          setSearchResults(res)
      }, 300)
      return () => clearTimeout(delay)
  }, [searchQuery])

  const addEntry = (city: CityResult) => {
      setEntries([...entries, {
          id: crypto.randomUUID(),
          city: city.city,
          country: city.country,
          timezone: city.timezone
      }])
      setShowSearch(false)
      setSearchQuery("")
  }

  const removeEntry = (id: string) => {
      setEntries(entries.filter(e => e.id !== id))
  }

  const reorderEntries = (from: number, to: number) => {
    const updated = [...entries]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    setEntries(updated)
  }

  // Time Logic
  // We render 48 hours starting from 00:00 of the selected date IN THE HOME TIMEZONE (First entry)
  // If no entries, use Local Timezone.

  const homeTimezone = entries[0]?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone

  const startTimestamp = useMemo(() => {
      // Create a date object for the selected date at 00:00 in the home timezone
      // We can do this by creating a string and parsing it in that timezone,
      // but JS Date parsing is tricky.
      // Easiest way: Use Intl to find the offset?
      // Or just assume the grid starts at UTC 00:00 of that date, and we adjust display?
      // NO. WTB aligns the grid so the Home row starts at 00:00 (or current time).

      // Let's stick to: Grid starts at 00:00 Home Time.
      // So column 0 is 00:00 Home Time.
      // Column 0 for other rows is whatever time it is when Home is 00:00.

      // How to get the absolute timestamp of "2023-10-27 00:00:00" in "America/New_York"?
      // We can use a library, or a trick.
      // Trick:
      const d = new Date(date + "T00:00:00") // This is UTC or Local depending on browser parsing of ISO date only?
      // Actually "YYYY-MM-DD" is usually parsed as UTC. "YYYY-MM-DDTHH:mm:ss" is local.
      // Let's be explicit.

      // Actually, we want a timestamp T such that T in homeTimezone is 00:00.
      // We can iterate or estimate.
      // Simpler: Just render UTC columns, and offset the DISPLAY.
      // But we want the visual alignment to be clear.

      // Let's try to find the timestamp for Midnight Home Time.
      const midnight = new Date(date + "T00:00:00"); // Local
      // We want to force this 'midnight' to be treated as if it were in `homeTimezone`.
      // The `date` string is "YYYY-MM-DD".

      // Let's use `toLocaleString` to reverse engineer.
      // Actually, standard trick:
      const getZoneTime = (ts: number, tz: string) => new Date(new Date(ts).toLocaleString("en-US", { timeZone: tz }));

      // Just assume UTC for the base calculations to simplify "absolute time" grid,
      // but shift the starting point.

      // Let's just use a naive approach:
      // The grid represents absolute hours from X.
      // X = Midnight of the selected date in Home Timezone.

      // To get X:
      // 1. Take UTC midnight of date.
      // 2. Adjust by offset of Home Timezone.
      // It's hard to get exact offset without a library like date-fns-tz.

      // Fallback: Grid is UTC based 00:00 to 48:00.
      // Visuals shift? No.

      // Let's try:
      // Create a Date object from the input string (UTC midnight).
      // Then find the offset of that Zone at that time?

      // Let's just use the current browser's interpretation of "YYYY-MM-DD" which is usually UTC.
      const utcMidnight = new Date(date).getTime();
      return utcMidnight;
      // This means column 0 is UTC 00:00.
      // If Home is NYC (-4), Home row will show 20:00 (previous day).
      // User might prefer Home row to start at 00:00.

      // To shift grid to Home start:
      // Find offset of Home Zone relative to UTC.
      // Better: Just Render UTC, but allow the user to mentally map it?
      // NO, WTB UX is "Home is the reference".

      // Okay, let's try to get offset of Home Zone at UTC Midnight.
      const format = new Intl.DateTimeFormat("en-US", { timeZone: homeTimezone, hour: "numeric", hour12: false, timeZoneName: "short" });
      // This is getting complicated without a library.
      // Let's stick to UTC-based grid 0..48, but label the columns based on the timezone?
      // Yes, that's what we do.

      // But visually, we want the Home Row to start at 00:00?
      // If we want that, we just shift the `colIndex` we pass to `getColumnData`.
      // Let's Keep it simple: Grid starts at UTC 00:00 of the Date.
      // If that's confusing for NYC users, so be it for now.

      // WAIT! If I select a date, I expect to see that date.
      // If I am in NYC, and I pick Today, I want to see Today 00:00 - 23:00 NYC time.
      // So the Grid Start should be adjusted.

      return utcMidnight;
  }, [date, homeTimezone]) // Actually just date.


  // We will offset the grid generation for display purposes if we want Home to be 00..23
  // But calculating that offset is hard.
  // Let's just render 48h from UTC Midnight and let the chips fall.
  // Actually, let's render -24h to +48h relative to UTC Midnight?
  // Let's render 0..47 hours from UTC Midnight.

  // Revised Grid:
  // We want to cover the full "selected day" for the Home Zone.
  // If Home is UTC-10, its "day" starts at UTC 10:00.
  // If Home is UTC+10, its "day" starts at UTC -10:00.
  // So we should probably render a range around the target UTC date.
  // Let's render -12h to +36h relative to UTC Midnight. (48 columns)
  // This covers most zones.

  const startOffsetHours = -12;

  const getColumnData = (tz: string, colIndex: number) => {
      // colIndex 0 corresponds to startTimestamp + startOffsetHours
      const timestamp = startTimestamp + ((colIndex + startOffsetHours) * 3600 * 1000)
      const d = new Date(timestamp)

      const options: Intl.DateTimeFormatOptions = {
          timeZone: tz,
          hour: "numeric",
          minute: "2-digit",
          hour12: timeFormat === "ampm",
          weekday: "short",
          month: "short",
          day: "numeric"
      }

      // For coloring
      const h24 = parseInt(d.toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", hour12: false }))
      const isBusiness = h24 >= 9 && h24 < 17
      const isNight = h24 >= 22 || h24 < 7

      // Formatting
      const formatter = new Intl.DateTimeFormat("en-US", options)
      const parts = formatter.formatToParts(d)
      const find = (t: string) => parts.find(p => p.type === t)?.value || ""

      return {
          time: `${find("hour")}${find("minute") !== "00" ? ":" + find("minute") : ""} ${find("dayPeriod") || ""}`,
          h24,
          isBusiness,
          isNight,
          dateLabel: `${find("weekday")} ${find("day")}`,
          isMidnight: h24 === 0 || h24 === 24
      }
  }

  // Current Time Indicator Position
  // We need to find where "Now" falls in our grid.
  const now = new Date();
  const nowOffsetHours = (now.getTime() - startTimestamp) / (3600 * 1000) - startOffsetHours;
  // This is a float, e.g. 14.5 for 2:30 hours into the grid.

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <FloatingNav />

      <div className="max-w-[1400px] mx-auto pt-24 pb-20 px-4 md:px-8 space-y-6">

        {/* Header Control Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card p-4 rounded-xl border border-border/50 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Clock className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold leading-none">World Clock</h1>
                    <p className="text-xs text-muted-foreground mt-1">Plan meetings across timezones</p>
                </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
                {/* Date Picker */}
                <div className="flex items-center bg-muted rounded-lg p-1 border border-border">
                    <button
                        onClick={() => {
                            const d = new Date(date)
                            d.setDate(d.getDate() - 1)
                            setDate(d.toISOString().split('T')[0])
                        }}
                        className="p-1.5 hover:bg-background rounded-md transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="relative">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="bg-transparent border-none text-sm font-medium focus:ring-0 px-2 w-[130px]"
                        />
                    </div>
                    <button
                         onClick={() => {
                            const d = new Date(date)
                            d.setDate(d.getDate() + 1)
                            setDate(d.toISOString().split('T')[0])
                        }}
                        className="p-1.5 hover:bg-background rounded-md transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Format Toggle */}
                <div className="flex bg-muted rounded-lg p-1 border border-border">
                    {(["ampm", "24hr"] as TimeFormat[]).map(f => (
                        <button
                            key={f}
                            onClick={() => setTimeFormat(f)}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                                timeFormat === f ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {f === "ampm" ? "AM/PM" : "24H"}
                        </button>
                    ))}
                </div>

                {/* Share */}
                <button
                    onClick={() => {
                        const url = window.location.href
                        navigator.clipboard.writeText(url)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                    }}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all",
                        copied ? "bg-green-500/10 text-green-600" : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                >
                    <Link2 className="w-3.5 h-3.5" />
                    {copied ? "Link Copied" : "Share"}
                </button>
            </div>
        </div>

        {/* Search Bar */}
        <div className="relative z-50 max-w-lg">
             <div className="relative group">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Add city (e.g. London, Tokyo)..."
                    className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setShowSearch(true)
                    }}
                    onFocus={() => setShowSearch(true)}
                />
                {searchQuery && (
                    <button
                        onClick={() => { setSearchQuery(""); setShowSearch(false); }}
                        className="absolute right-3 top-2.5 text-xs text-muted-foreground hover:text-foreground"
                    >
                        Esc
                    </button>
                )}
             </div>

             {/* Dropdown */}
             {showSearch && searchResults.length > 0 && (
                 <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto">
                     {searchResults.map((city, i) => (
                         <button
                            key={i}
                            onClick={() => addEntry(city)}
                            className="w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0 flex justify-between items-center group"
                         >
                             <div>
                                 <div className="font-medium text-sm flex items-center gap-2">
                                     <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                                     {city.city}
                                     {city.province && <span className="text-muted-foreground font-normal">, {city.province}</span>}
                                 </div>
                                 <div className="text-xs text-muted-foreground ml-5.5">{city.country} • {city.timezone}</div>
                             </div>
                             <div className="text-xs font-mono text-muted-foreground/50 group-hover:text-primary transition-colors">
                                 +
                             </div>
                         </button>
                     ))}
                 </div>
             )}
        </div>

        {/* MAIN GRID UI */}
        <div className="bg-card rounded-xl border border-border/50 shadow-xl overflow-hidden flex flex-col md:flex-row relative">

            {/* Left Column: Locations */}
            <div className="w-full md:w-[260px] flex-shrink-0 bg-background/50 backdrop-blur z-20 border-r border-border flex flex-col">
                {/* Header for Left Col */}
                <div className="h-[50px] border-b border-border flex items-center px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Locations
                </div>

                {/* Rows */}
                <div className="flex-1">
                    {entries.map((entry, i) => {
                        // Current Time in this zone
                        const timeStr = new Date().toLocaleTimeString("en-US", { timeZone: entry.timezone, hour: "numeric", minute: "2-digit", hour12: timeFormat === "ampm" })
                        const dateStr = new Date().toLocaleDateString("en-US", { timeZone: entry.timezone, weekday: "short", day: "numeric" })

                        return (
                            <div
                                key={entry.id}
                                className={cn(
                                    "h-20 border-b border-border/50 px-4 py-2 flex items-center justify-between group relative hover:bg-muted/30 transition-colors",
                                    i === 0 && "bg-primary/5"
                                )}
                                draggable
                                onDragStart={() => (dragStart.current = i)}
                                onDragOver={(e) => {
                                    e.preventDefault()
                                    if (dragStart.current !== null && dragStart.current !== i) {
                                        reorderEntries(dragStart.current, i)
                                        dragStart.current = i
                                    }
                                }}
                            >
                                <div className="flex flex-col min-w-0 pr-2">
                                    <div className="flex items-center gap-2">
                                        {i === 0 && <Home className="w-3 h-3 text-primary fill-primary/20" />}
                                        <span className="font-bold text-sm truncate text-foreground" title={entry.city}>{entry.city}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground truncate" title={`${entry.country} • ${entry.timezone}`}>{entry.country}</span>
                                    <div className="mt-1 flex items-baseline gap-1.5">
                                        <span className="text-lg font-mono font-semibold text-primary leading-none">{timeStr}</span>
                                        <span className="text-[10px] text-muted-foreground">{dateStr}</span>
                                    </div>
                                </div>

                                <div className="absolute right-2 top-2 bottom-2 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => removeEntry(entry.id)} className="text-muted-foreground hover:text-destructive p-1">
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                    <div className="cursor-move text-muted-foreground p-1">
                                        <GripVertical className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {entries.length === 0 && (
                         <div className="p-8 text-center text-sm text-muted-foreground">
                             No locations added.<br/>Search above to start.
                         </div>
                    )}
                </div>
            </div>

            {/* Right Column: Scrollable Grid */}
            <div className="flex-1 overflow-hidden relative flex flex-col">

                {/* Scroll Wrapper */}
                <div
                    ref={scrollRef}
                    className="overflow-x-auto relative flex-1 pb-4 hide-scrollbar"
                    onMouseLeave={() => setHoveredColIndex(null)}
                >
                    {/* Header Row: Dates/Hours */}
                    <div className="h-[50px] border-b border-border flex min-w-max">
                         {Array.from({ length: 48 }).map((_, i) => {
                             // Use first zone for header labels? Or just labels?
                             // Typically WTB just shows hours 0-23 repeated or date changes.
                             // Let's use the Home Zone for the header labels.
                             const tz = entries[0]?.timezone || "UTC"
                             const { time, dateLabel, isMidnight } = getColumnData(tz, i)

                             return (
                                 <div
                                    key={i}
                                    className={cn(
                                        "w-[60px] flex flex-col items-center justify-center text-[10px] border-r border-border/30 flex-shrink-0 relative",
                                        isMidnight && "border-l-2 border-l-primary/50 bg-primary/5"
                                    )}
                                 >
                                     {isMidnight ? (
                                         <span className="font-bold text-primary">{dateLabel}</span>
                                     ) : (
                                         <span className="text-muted-foreground">{time}</span>
                                     )}
                                 </div>
                             )
                         })}
                    </div>

                    {/* Grid Rows */}
                    <div className="min-w-max relative">

                        {/* Current Time Vertical Line */}
                        {nowOffsetHours >= 0 && nowOffsetHours < 48 && (
                             <div
                                className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-30 pointer-events-none"
                                style={{ left: `${nowOffsetHours * 60}px` }}
                             >
                                 <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full" />
                             </div>
                        )}

                        {/* Hover Highlight Vertical Column */}
                        {hoveredColIndex !== null && (
                            <div
                                className="absolute top-0 bottom-0 w-[60px] bg-blue-500/10 border-x border-blue-500/20 z-10 pointer-events-none transition-transform duration-75"
                                style={{ transform: `translateX(${hoveredColIndex * 60}px)` }}
                            />
                        )}

                        {entries.map((entry) => (
                             <div key={entry.id} className="h-20 flex border-b border-border/50 relative">
                                 {/* Mobile City Indicator (Sticky Label) */}
                                 <div className="md:hidden sticky left-0 z-20 flex flex-col justify-center px-2 bg-background/95 backdrop-blur-sm border-r border-border shadow-[2px_0_5px_rgba(0,0,0,0.05)] w-[50px] flex-shrink-0">
                                     <span className="font-bold text-xs text-foreground truncate">{entry.city.substring(0, 3).toUpperCase()}</span>
                                     <span className="text-[9px] text-muted-foreground truncate opacity-70">{entry.timezone.split('/')[1]}</span>
                                 </div>

                                 {Array.from({ length: 48 }).map((_, i) => {
                                     const { time, isBusiness, isNight, isMidnight } = getColumnData(entry.timezone, i)

                                     return (
                                         <div
                                            key={i}
                                            onMouseEnter={() => setHoveredColIndex(i)}
                                            className={cn(
                                                "w-[60px] flex-shrink-0 border-r border-border/30 flex flex-col items-center justify-center cursor-pointer transition-colors relative",
                                                isBusiness ? "bg-emerald-500/5" :
                                                isNight ? "bg-slate-900/5 dark:bg-slate-100/5" :
                                                "bg-amber-500/5",

                                                isMidnight && "border-l-2 border-l-primary/20",

                                                // Hovering effects handled by parent overlay mostly, but we can add subtle cell effect
                                                hoveredColIndex === i && "bg-primary/5"
                                            )}
                                         >
                                             <span className={cn(
                                                 "text-xs font-medium",
                                                 isBusiness ? "text-emerald-700 dark:text-emerald-400" :
                                                 isNight ? "text-slate-500 dark:text-slate-400" :
                                                 "text-amber-700 dark:text-amber-400"
                                             )}>
                                                 {time.split(" ")[0]}
                                             </span>
                                             <span className="text-[9px] uppercase text-muted-foreground opacity-50">
                                                 {time.split(" ")[1]}
                                             </span>
                                         </div>
                                     )
                                 })}
                             </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 justify-center text-xs text-muted-foreground pt-4">
             <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-emerald-500/20 rounded-sm" />
                 <span>Business Hours (9am-5pm)</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-amber-500/20 rounded-sm" />
                 <span>Personal Time</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-slate-500/20 rounded-sm" />
                 <span>Night (10pm-7am)</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-red-500 rounded-full" />
                 <span>Current Time</span>
             </div>
        </div>

      </div>
    </div>
  )
}

const DEFAULT_ENTRIES: ClockEntry[] = [
    { id: "1", city: "New York", country: "United States", timezone: "America/New_York" },
    { id: "2", city: "London", country: "United Kingdom", timezone: "Europe/London" },
    { id: "3", city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" }
]

export default function ClockPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ClockPageContent />
        </Suspense>
    )
}
