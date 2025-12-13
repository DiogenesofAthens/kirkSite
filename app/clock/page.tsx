"use client"

import { useState, useEffect, useRef, useMemo, Suspense } from "react"
import { Clock, X, GripVertical, Link2, MapPin, Search } from "lucide-react"
import { FloatingNav } from "@/components/floating-nav"
import { cn } from "@/lib/utils"
import { useSearchParams, useRouter } from "next/navigation"
import { CITIES, COUNTRY_TIMEZONES } from "@/lib/city-data"

type TimeFormat = "ampm" | "24hr"

function ClockPageContent() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<number | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialized = useRef(false)

  const [zones, setZones] = useState<string[]>([])
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("ampm")
  const [copied, setCopied] = useState(false)
  const [selectedColIndex, setSelectedColIndex] = useState<number | null>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [now, setNow] = useState<Date | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  // Initialize
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
      else setZones(["America/New_York", "Europe/London", "Asia/Kolkata"])
    }

    if (urlHour) {
      setSelectedColIndex(parseInt(urlHour))
    } else {
       // Default to roughly current time column (approximate)
       const currentHour = new Date().getHours()
       setSelectedColIndex(currentHour)
    }

    const savedFormat = localStorage.getItem("format")
    if (savedFormat === "24hr") setTimeFormat("24hr")
  }, [])

  // Sync state
  useEffect(() => {
    if (!initialized.current) return

    if (zones.length > 0) {
      localStorage.setItem("zones", JSON.stringify(zones))

      const params = new URLSearchParams()
      params.set("zones", zones.join(","))
      if (selectedColIndex !== null) params.set("hour", selectedColIndex.toString())

      router.replace(`?${params.toString()}`, { scroll: false })
    }
  }, [zones, selectedColIndex, router])

  useEffect(() => {
    localStorage.setItem("format", timeFormat)
  }, [timeFormat])

  // Scroll logic
  useEffect(() => {
    if (selectedColIndex !== null && scrollRef.current) {
        const targetX = (selectedColIndex * 56) - (scrollRef.current.clientWidth / 2) + 180 + 28
        scrollRef.current.scrollTo({ left: targetX, behavior: "smooth" })
    }
  }, [selectedColIndex])


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

  // Anchor: Today 00:00 UTC.
  // Columns 0..47 represent +0h, +1h... +47h from that anchor.
  const startTimestamp = useMemo(() => {
      const utcDateStr = new Date().toISOString().split('T')[0]
      return new Date(`${utcDateStr}T00:00:00Z`).getTime()
  }, [])

  const getColumnData = (tz: string, colIndex: number) => {
      const timestamp = startTimestamp + (colIndex * 3600 * 1000)
      const date = new Date(timestamp)

      const options: Intl.DateTimeFormatOptions = {
          timeZone: tz,
          hour: "numeric",
          minute: "2-digit",
          hour12: timeFormat === "ampm",
          weekday: "short",
          month: "short",
          day: "numeric"
      }

      // Check 24h hour for business logic
      const h24Str = date.toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", hour12: false })
      const h24 = parseInt(h24Str)

      const isBusiness = h24 >= 9 && h24 < 17
      const isNight = h24 >= 22 || h24 < 7

      const formatter = new Intl.DateTimeFormat("en-US", options)
      const parts = formatter.formatToParts(date)
      const find = (t: string) => parts.find(p => p.type === t)?.value || ""

      const hour = find("hour")
      const minute = find("minute")
      const dayPeriod = find("dayPeriod") // AM/PM
      const weekday = find("weekday")
      const day = find("day")

      const showMinute = minute !== "00"

      return {
          displayHour: hour,
          displayMinute: showMinute ? minute : "",
          ampm: dayPeriod,
          isBusiness,
          isNight,
          dateLabel: `${weekday} ${day}`
      }
  }

  const handleMouseDown = (index: number) => {
      setIsMouseDown(true)
      setSelectedColIndex(index)
  }
  const handleMouseEnter = (index: number) => {
      if (isMouseDown) setSelectedColIndex(index)
  }
  const handleMouseUp = () => setIsMouseDown(false)

  useEffect(() => {
      window.addEventListener("mouseup", handleMouseUp)
      return () => window.removeEventListener("mouseup", handleMouseUp)
  }, [])

  const filteredZones = useMemo(() => {
    if (!searchQuery) return []

    const query = searchQuery.toLowerCase()

    // 1. Matches in CITIES array
    const cityMatches = CITIES.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.country.toLowerCase().includes(query) ||
        c.keywords?.some(k => k.toLowerCase().includes(query))
    ).map(c => ({
        label: `${c.name}, ${c.country}`,
        zone: c.tz,
        type: "City"
    }))

    // 2. Matches in COUNTRY_TIMEZONES
    const countryMatches = Object.entries(COUNTRY_TIMEZONES)
        .filter(([country]) => country.toLowerCase().includes(query))
        .map(([country, zone]) => ({
            label: country,
            zone,
            type: "Country"
        }))

    // Combine and deduplicate
    const combined = [...cityMatches, ...countryMatches]

    // Unique by zone is tricky because "San Francisco" and "Los Angeles" are same zone but different cities.
    // User wants to search for specific city. So we show duplicates if they are different cities.
    // But deduplicate exact label+zone combo.
    const unique = combined.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t.label === item.label && t.zone === item.zone
        ))
    )

    return unique.slice(0, 50)
  }, [searchQuery])


  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav />
      <main className="px-4 pt-24 pb-12 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Clock className="w-8 h-8 text-primary" /> World Clock App
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

        {/* Search */}
        <div className="max-w-md relative z-50">
            {!showSearch ? (
                <button
                    onClick={() => setShowSearch(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                >
                    <Search className="w-4 h-4" /> Add City or Country
                </button>
            ) : (
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search New York, London, India, etc..."
                        className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <div className="absolute top-full mt-1 w-full bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {filteredZones.map((item, i) => (
                                <button
                                    key={`${item.zone}-${i}`}
                                    onClick={() => addZone(item.zone)}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors border-b border-border/50 last:border-0 flex justify-between group"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium">{item.label}</span>
                                        <span className="text-[10px] text-muted-foreground">{item.zone}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground opacity-50 group-hover:opacity-100 self-center capitalize">{item.type}</span>
                                </button>
                            ))}
                            {filteredZones.length === 0 && (
                                <div className="px-4 py-2 text-sm text-muted-foreground">No matches found</div>
                            )}
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

        {/* Calendar / Grid */}
        <div className="relative rounded-xl border border-border/50 bg-card shadow-xl overflow-hidden select-none">
            {/* Scrubber Line */}
            {selectedColIndex !== null && (
                 <div
                    className="absolute top-0 bottom-0 w-[54px] border-2 border-yellow-500/50 bg-yellow-500/10 z-20 pointer-events-none rounded transition-all duration-100"
                    style={{
                        left: 180 + (selectedColIndex * 56),
                    }}
                >
                </div>
            )}

          <div
            ref={scrollRef}
            className="grid grid-cols-[180px_repeat(48,56px)] overflow-x-auto relative pb-4"
          >
            {/* Header Row: Date Labels */}
            <div className="sticky left-0 z-30 bg-muted/80 backdrop-blur border-r border-b p-3 font-semibold text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Locations
            </div>
            {Array.from({ length: 48 }).map((_, i) => {
                const firstZone = zones[0] || "UTC"
                const { dateLabel } = getColumnData(firstZone, i)
                const prev = i > 0 ? getColumnData(firstZone, i-1).dateLabel : ""
                const showDate = i === 0 || dateLabel !== prev

                return (
                    <div
                      key={`header-${i}`}
                      className={cn(
                        "border-r border-b text-center py-2 text-[10px] font-semibold bg-muted/50 text-muted-foreground flex flex-col justify-end",
                        showDate && "border-l-2 border-l-primary/20"
                      )}
                    >
                      {showDate && <span className="mb-1 text-primary font-bold">{dateLabel}</span>}
                    </div>
                )
            })}

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
                      {/* Try to find a nice label from CITIES if possible */}
                      <span className="font-bold text-sm truncate">
                          {CITIES.find(c => c.tz === tz)?.name || tz.split("/").pop()?.replaceAll("_", " ")}
                      </span>
                      <span className="text-[10px] text-muted-foreground truncate">{tz}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                      <button onClick={() => removeZone(tz)} className="hover:text-destructive"><X className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Hours Grid */}
                {Array.from({ length: 48 }).map((_, colIndex) => {
                    const { displayHour, displayMinute, ampm, isBusiness, isNight } = getColumnData(tz, colIndex)

                    return (
                      <div
                        key={`${tz}-${colIndex}`}
                        onMouseDown={() => handleMouseDown(colIndex)}
                        onMouseEnter={() => handleMouseEnter(colIndex)}
                        className={cn(
                          "border-r border-b text-center relative h-14 flex flex-col items-center justify-center cursor-pointer transition-colors select-none",
                          // Colors
                          isBusiness ? "bg-emerald-500/10 hover:bg-emerald-500/20" :
                          isNight ? "bg-slate-900/10 dark:bg-slate-100/5 hover:bg-slate-900/20" :
                          "bg-amber-500/5 hover:bg-amber-500/15",

                          selectedColIndex === colIndex && "bg-primary/5"
                        )}
                      >
                        <span className={cn(
                            "text-sm font-medium leading-none",
                            isBusiness ? "text-emerald-700 dark:text-emerald-400" :
                            isNight ? "text-slate-500 dark:text-slate-400" :
                            "text-amber-700 dark:text-amber-400"
                        )}>
                            {displayHour}
                            {displayMinute && <span className="text-[10px] align-top">:{displayMinute}</span>}
                        </span>
                        {timeFormat === "ampm" && (
                            <span className="text-[9px] uppercase text-muted-foreground leading-none mt-0.5">{ampm}</span>
                        )}
                      </div>
                    )
                  })
                }
              </>
            ))}
          </div>
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
