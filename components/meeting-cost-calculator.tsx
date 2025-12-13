"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, Play, Pause, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function MeetingCostCalculator() {
  const [attendees, setAttendees] = useState<number>(5)
  const [avgSalary, setAvgSalary] = useState<number>(100000)
  const [duration, setDuration] = useState<number>(0)
  const [isRunning, setIsRunning] = useState(false)
  const [cost, setCost] = useState(0)

  // Calculate cost per second
  // Assuming 2080 working hours per year (52 weeks * 40 hours)
  const costPerSecond = (attendees * avgSalary) / 2080 / 3600

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    setCost(duration * costPerSecond)
  }, [duration, costPerSecond])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => setIsRunning(!isRunning)
  const resetTimer = () => {
    setIsRunning(false)
    setDuration(0)
    setCost(0)
  }

  // Visual Alarm Color Logic
  const getCostColor = (c: number) => {
    if (c > 500) return "text-red-500"
    if (c > 100) return "text-orange-500"
    return "text-green-500"
  }

  return (
    <Card className="w-full max-w-md mx-auto glass shadow-xl border-t-4 border-t-transparent bg-gradient-to-r from-blue-500/10 to-purple-500/10"
          style={{ borderImage: "linear-gradient(to right, #3b82f6, #a855f7) 1" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-primary" /> Business Impact Calculator
        </CardTitle>
        <CardDescription>Visualize the real cost of this meeting.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Attendees</label>
            <div className="relative">
              <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                min="1"
                value={attendees}
                onChange={(e) => setAttendees(Number(e.target.value))}
                className="pl-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Avg Salary ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                min="0"
                step="1000"
                value={avgSalary}
                onChange={(e) => setAvgSalary(Number(e.target.value))}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 py-8 bg-muted/30 rounded-xl border border-border/50">
          <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Total Cost</div>

          <div className={`text-6xl font-mono font-bold tracking-tight transition-colors duration-500 ${getCostColor(cost)}`}>
             {/* Number Ticker using Framer Motion key keyframes roughly simulated via text update or we can try animate.
                 For simplicity and robustness in React, we render the number directly but the color shifts.
                 To do a real rolling odometer requires a complex component setup (splitting digits).
                 Given constraint "You can use a library or a Framer Motion keyframe animation",
                 let's use a simple spring animation for the value if we want smoothness,
                 or just the text update with color transition as implemented.

                 Let's try a NumberFlow-like effect by just animating the container or scale slightly on update?
             */}
             <motion.span
                key={Math.floor(cost)} // Animate on integer change
                initial={{ opacity: 0.8, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
             >
                ${cost.toFixed(2)}
             </motion.span>
          </div>

          <div className="text-xl font-mono text-muted-foreground">
            {formatTime(duration)}
          </div>

          {cost > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 pt-2"
              >
                  <p className="text-sm text-muted-foreground">
                      At this rate, this meeting costs your company <span className="font-bold text-foreground">${(cost * 52).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span> per year.
                  </p>
              </motion.div>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            className={`flex-1 text-lg h-12 transition-all ${isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
            onClick={toggleTimer}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 mr-2" /> Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" /> Start Meeting
              </>
            )}
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12" onClick={resetTimer}>
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
