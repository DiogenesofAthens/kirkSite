Fix this

"use client"

import { useState, useEffect, useRef } from "react"
import { Clock, X, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Lottie from "lottie-react"
import { ContactModal } from "@/components/contact-modal"

const allTimezones = Intl.supportedValuesOf("timeZone")

export default function ClockPage() {
  const [time, setTime] = useState(new Date())
  const [zones, setZones] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("zones")
      return stored ? JSON.parse(stored) : [
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        "America/New_York",
        "Europe/London"
      ]
    }
    return ["America/Los_Angeles", "America/New_York", "Europe/London"]
  })
  const [inputZone, setInputZone] = useState("")
  const [use24Hour, setUse24Hour] = useState(false)
  const [selectedHour, setSelectedHour] = useState(new Date().getHours())
  const [hoveredHour, setHoveredHour] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem("zones", JSON.stringify(zones))
  }, [zones])

  const formatTime = (date: Date, tz: string, hourOverride?: number) => {
    const newDate = new Date(date)
    if (typeof hourOverride === "number") newDate.setHours(hourOverride, 0, 0, 0)
    return newDate.toLocaleTimeString(undefined, {
      timeZone: tz,
      hour12: !use24Hour,
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isNight = (tz: string) => {
    const localHour = new Date().toLocaleTimeString("en-US", {
      timeZone: tz,
      hour: "numeric",
      hour12: false
    })
    const h = parseInt(localHour)
    return h < 6 || h >= 20
  }

  const addZone = () => {
    const cleaned = inputZone.trim()
    if (cleaned && allTimezones.includes(cleaned) && !zones.includes(cleaned)) {
      setZones([...zones, cleaned])
      setInputZone("")
      inputRef.current?.blur()
    }
  }

  const removeZone = (tz: string) => setZones(zones.filter((z) => z !== tz))

  const filteredTimezones = allTimezones.filter((tz) =>
    tz.toLowerCase().includes(inputZone.trim().toLowerCase())
  )

  const currentHour = new Date().getHours()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Clock className="w-6 h-6" /> Timezone Converter
            </h1>
            <div className="flex items-center gap-4">
              <label className="text-sm flex items-center gap-2">
                <input type="checkbox" checked={use24Hour} onChange={() => setUse24Hour(!use24Hour)} />
                24-Hour
              </label>
              <ThemeToggle />
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg bg-muted/30 shadow-inner border border-border">
            <div className="grid grid-cols-[160px_repeat(24,56px)] min-w-[1500px] text-sm relative">
              {/* Current Time Indicator */}
              <div
                className="absolute top-0 left-[calc(160px+56px*var(--current-hour))] w-[56px] h-full pointer-events-none border-l-2 border-blue-500 z-10"
                style={{
                  left: `calc(160px + 56px * ${currentHour})`
                }}
              />
              {/* Hover Tracker */}
              {hoveredHour !== null && (
                <div
                  className="absolute top-0 left-[calc(160px+56px*var(--hover-hour))] w-[56px] h-full pointer-events-none bg-blue-500/10 z-0"
                  style={{
                    left: `calc(160px + 56px * ${hoveredHour})`
                  }}
                />
              )}
              <div className="contents">
                <div className="px-4 py-2 font-semibold bg-primary text-primary-foreground border-r border-b">Timezone</div>
                {Array.from({ length: 24 }).map((_, hour) => (
                  <div
                    key={hour}
                    className={cn(
                      "border-r border-b text-center px-1 py-2 font-semibold cursor-pointer relative",
                      selectedHour === hour ? "bg-blue-600 text-white" : "hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => setSelectedHour(hour)}
                    onMouseEnter={() => setHoveredHour(hour)}
                    onMouseLeave={() => setHoveredHour(null)}
                  >
                    {use24Hour ? `${hour.toString().padStart(2, '0')}:00` : new Date(0, 0, 0, hour).toLocaleTimeString([], { hour: 'numeric', hour12: true })}
                  </div>
                ))}
              </div>
              {zones.map((tz) => (
                <div key={tz} className="contents">
                  <div className="flex items-center justify-between px-4 py-2 font-medium bg-muted text-muted-foreground border-r border-b">
                    <span className="flex items-center gap-1">
                      {tz.split("/").pop()?.replace("_", " ")}
                      {isNight(tz) ? <Moon className="w-4 h-4 text-yellow-300" /> : <Sun className="w-4 h-4 text-yellow-400" />}
                    </span>
                    <button onClick={() => removeZone(tz)} className="text-muted-foreground hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {Array.from({ length: 24 }).map((_, hour) => (
                    <div
                      key={hour}
                      onClick={() => setSelectedHour(hour)}
                      onMouseEnter={() => setHoveredHour(hour)}
                      onMouseLeave={() => setHoveredHour(null)}
                      className={cn(
                        "border-r border-b text-center px-1 py-2 cursor-pointer",
                        selectedHour === hour ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {formatTime(time, tz, hour)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or enter a timezone (e.g. Asia/Tokyo)"
              value={inputZone}
              onChange={(e) => setInputZone(e.target.value)}
              className="w-full px-3 py-2 rounded text-sm bg-background border border-input"
              list="tz-options"
            />
            <datalist id="tz-options">
              {filteredTimezones.map((tz) => (
                <option key={tz} value={tz} />
              ))}
            </datalist>
            <button
              onClick={addZone}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 w-full sm:w-auto"
            >
              Add Timezone
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

Failed to compile.
./app/clock/page.tsx
Module parse failed: Identifier 'Clock' has already been declared (5:9)
File was processed with these loaders:
 * ./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-module-loader.js
 * ./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-swc-loader.js
You may need an additional loader to handle the result of these loaders.
| import { Clock, X, Sun, Moon } from "__barrel_optimize__?names=Clock,Moon,Sun,X!=!lucide-react";
| import { cn } from "@/lib/utils";
> import { Clock } from "__barrel_optimize__?names=Clock!=!lucide-react";
| import { useState } from "react";
| const allTimezones = Intl.supportedValuesOf("timeZone");
Import trace for requested module:
./app/clock/page.tsx
