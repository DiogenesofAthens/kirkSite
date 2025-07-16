"use client"

import { useState, useEffect } from "react"
import { Clock, X, Sun, Moon } from "lucide-react"

const allTimezones = Intl.supportedValuesOf("timeZone")

export function TimezoneClock() {
  const [time, setTime] = useState(new Date())
  const [zones, setZones] = useState([
    "America/Los_Angeles",
    "America/New_York",
    "Europe/London"
  ])
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputZone, setInputZone] = useState("")
  const [use24Hour, setUse24Hour] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

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

  const toggleExpanded = () => setIsExpanded(!isExpanded)
  const addZone = () => {
    if (inputZone && allTimezones.includes(inputZone) && !zones.includes(inputZone)) {
      setZones([...zones, inputZone])
      setInputZone("")
    }
  }
  const removeZone = (tz: string) => setZones(zones.filter((z) => z !== tz))

  return (
    <div className="fixed top-6 right-6 z-50 md:right-6 sm:right-4 sm:left-4 sm:w-[calc(100%-2rem)]">
      <div
        className="glass-nav rounded-full px-4 py-2 shadow-lg shadow-black/5 dark:shadow-black/20 flex items-center gap-3 cursor-pointer"
        onClick={toggleExpanded}
      >
        <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0" />
        <span className="text-sm font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
          {formatTime(time, zones[0])}
        </span>
        <span className="text-xs text-slate-600 dark:text-slate-400">{zones[0].split("/").pop()}</span>
      </div>

      {isExpanded && (
        <div className="mt-4 p-4 w-[340px] max-w-full sm:w-full max-h-[80vh] overflow-y-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-xl space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Timezone Converter</h3>
            <button onClick={toggleExpanded} className="text-slate-500 hover:text-red-500">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <input type="checkbox" checked={use24Hour} onChange={() => setUse24Hour(!use24Hour)} />
              24-Hour Time
            </label>
          </div>

          {zones.map((tz) => (
            <div key={tz} className={`flex justify-between items-center text-sm px-3 py-2 rounded-md ${isNight(tz) ? "bg-slate-100 dark:bg-slate-700" : "bg-yellow-50 dark:bg-yellow-900/20"}`}>
              <div className="flex flex-col">
                <div className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  {tz.split("/").pop()}
                  {isNight(tz) ? <Moon className="w-4 h-4 text-slate-500" /> : <Sun className="w-4 h-4 text-yellow-500" />}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{formatTime(time, tz)}</div>
              </div>
              <button onClick={() => removeZone(tz)} className="text-slate-400 hover:text-red-500">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. Asia/Tokyo"
              value={inputZone}
              onChange={(e) => setInputZone(e.target.value)}
              className="w-full px-2 py-1 rounded text-sm text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
            />
            <button
              onClick={addZone}
              className="px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
