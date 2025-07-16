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

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem("zones", JSON.stringify(zones))
  }, [zones])

  const formatTime = (date: Date, tz: string) => {
    return date.toLocaleTimeString(undefined, {
      timeZone: tz,
      hour12: !use24Hour,
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isNight = (tz: string) => {
    const hour = new Date().toLocaleTimeString("en-US", {
      timeZone: tz,
      hour: "numeric",
      hour12: false
    })
    const h = parseInt(hour)
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6" /> Timezone Converter
          </h1>
          <label className="text-sm flex items-center gap-2">
            <input type="checkbox" checked={use24Hour} onChange={() => setUse24Hour(!use24Hour)} />
            24-Hour
          </label>
        </div>

        <div className="space-y-4">
          {zones.map((tz) => (
            <div key={tz} className={`flex justify-between items-center px-4 py-3 rounded-lg border ${isNight(tz) ? "bg-slate-900/60 border-slate-700" : "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"}`}>
              <div className="flex flex-col">
                <div className="font-semibold text-lg flex items-center gap-2">
                  {tz.split("/").pop()?.replace("_", " ")}
                  {isNight(tz) ? <Moon className="w-4 h-4 text-yellow-300" /> : <Sun className="w-4 h-4 text-yellow-400" />}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-300">{formatTime(time, tz)}</div>
              </div>
              <button onClick={() => removeZone(tz)} className="text-slate-400 hover:text-red-500">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row items-center gap-2">
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
      </div>
    </main>
  )
}
