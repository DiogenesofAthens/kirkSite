"use client"

import { useState, useEffect, useRef } from "react"
import { Clock, X, Sun, Moon } from "lucide-react"

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
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 60000)
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

  useEffect(() => {
    const container = scrollRef.current
    if (container) {
      const cellWidth = 56
      const centerOffset = (selectedHour + 0.5) * cellWidth - container.offsetWidth / 2
      container.scrollTo({ left: centerOffset, behavior: "smooth" })
    }
  }, [selectedHour])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6" /> Timezone Converter
          </h1>
          <label className="text-sm flex items-center gap-2">
            <input type="checkbox" checked={use24Hour} onChange={() => setUse24Hour(!use24Hour)} />
            24-Hour
          </label>
        </div>

        <div className="overflow-x-auto border rounded-lg bg-white dark:bg-slate-800" ref={scrollRef}>
          <div className="min-w-[56rem] grid grid-cols-[200px_repeat(24,56px)] border-b sticky top-0 z-10 bg-white dark:bg-slate-800">
            <div className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-300 border-r">Timezone</div>
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={`text-center px-2 py-1 border-r cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 ${selectedHour === i ? "bg-blue-500 text-white dark:bg-blue-700" : "text-slate-700 dark:text-slate-200"}`}
                onClick={() => setSelectedHour(i)}
              >
                {use24Hour ? `${i.toString().padStart(2, "0")}:00` : `${((i % 12) || 12)} ${i < 12 ? "AM" : "PM"}`}
              </div>
            ))}
          </div>

          {zones.map((tz) => {
            const isDark = isNight(tz)
            return (
              <div
                key={tz}
                className={`grid grid-cols-[200px_repeat(24,56px)] border-b text-sm ${isDark ? "bg-slate-900/60 text-white" : "bg-slate-100 dark:bg-slate-700"}`}
              >
                <div className="flex justify-between items-center px-4 py-2 font-semibold border-r">
                  <div className="flex items-center gap-2">
                    {tz.split("/").pop()?.replace("_", " ")}
                    {isDark ? <Moon className="w-4 h-4 text-yellow-300" /> : <Sun className="w-4 h-4 text-yellow-400" />}
                  </div>
                  <button onClick={() => removeZone(tz)} className="text-slate-400 hover:text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className={`text-center px-2 py-2 border-r ${selectedHour === i ? "bg-blue-200 dark:bg-blue-700/50 font-bold" : ""}`}
                  >
                    {formatTime(time, tz, i)}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 mt-6">
          <input
            ref={inputRef}
            type="text"
            placeholder="e.g. Asia/Tokyo"
            value={inputZone}
            onChange={(e) => setInputZone(e.target.value)}
            list="tz-options"
            className="w-full px-3 py-2 rounded text-sm text-slate-800 dark:text-white bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
          />
          <datalist id="tz-options">
            {allTimezones.map((tz) => (
              <option key={tz} value={tz} />
            ))}
          </datalist>
          <button
            onClick={addZone}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto"
          >
            Add Timezone
          </button>
        </div>
      </div>
    </main>
  )
}
