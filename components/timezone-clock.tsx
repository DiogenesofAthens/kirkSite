"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export function TimezoneClock() {
  const [time, setTime] = useState(new Date())
  const [timezone, setTimezone] = useState("America/Los_Angeles")
  const [clicks, setClicks] = useState(0)
  const router = useRouter()

  const timezones = [
    { value: "America/Los_Angeles", label: "PT" },
    { value: "America/Denver", label: "MT" },
    { value: "America/Chicago", label: "CT" },
    { value: "America/New_York", label: "ET" },
    { value: "UTC", label: "UTC" },
    { value: "Europe/London", label: "GMT" },
  ]

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Reset click count if no further click after 2s
  useEffect(() => {
    if (clicks === 0) return
    const timeout = setTimeout(() => setClicks(0), 2000)
    return () => clearTimeout(timeout)
  }, [clicks])

  const handleClockClick = () => {
    const newClicks = clicks + 1
    setClicks(newClicks)
    if (newClicks >= 5) {
      // Optional: Add a fun local animation trigger here
      router.push("/clock")
    }
  }

  const formatTime = (date: Date, tz: string) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: tz,
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="fixed top-6 right-6 z-40 max-w-[180px] hidden md:block">
      <div
        className="glass-nav rounded-full px-4 py-2 shadow-lg shadow-black/5 dark:shadow-black/20 flex items-center gap-3 cursor-pointer"
        onClick={handleClockClick}
      >
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
