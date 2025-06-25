"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function TimezoneClock() {
  const [time, setTime] = useState(new Date())
  const [timezone, setTimezone] = useState("America/Los_Angeles")

  const timezones = [
    { value: "America/Los_Angeles", label: "PT" },
    { value: "America/Denver", label: "MT" },
    { value: "America/Chicago", label: "CT" },
    { value: "America/New_York", label: "ET" },
    { value: "UTC", label: "UTC" },
    { value: "Europe/London", label: "GMT" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date, tz: string) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: tz,
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="fixed top-6 right-6 z-40 max-w-[180px]">
      <div className="glass-nav rounded-full px-4 py-2 shadow-lg shadow-black/5 dark:shadow-black/20 flex items-center gap-3">
        <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0" />
        <span className="text-sm font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
          {formatTime(time, timezone)}
        </span>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="text-xs bg-transparent border-none outline-none text-slate-600 dark:text-slate-400 cursor-pointer min-w-0"
        >
          {timezones.map((tz) => (
            <option key={tz.value} value={tz.value} className="bg-white dark:bg-slate-800">
              {tz.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
