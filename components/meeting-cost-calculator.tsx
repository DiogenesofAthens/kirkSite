"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, Play, Pause, RefreshCw } from "lucide-react"

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

  return (
    <Card className="w-full max-w-md mx-auto glass shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" /> Meeting Cost Calculator
        </CardTitle>
        <CardDescription>See how much that meeting is actually costing your company.</CardDescription>
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

        <div className="text-center space-y-2 py-6 bg-muted/30 rounded-lg border">
          <div className="text-sm text-muted-foreground uppercase tracking-wide">Total Cost</div>
          <div className="text-5xl font-mono font-bold text-green-600 dark:text-green-400">
            ${cost.toFixed(2)}
          </div>
          <div className="text-xl font-mono text-muted-foreground mt-2">
            {formatTime(duration)}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            className={`flex-1 ${isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
            onClick={toggleTimer}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" /> Start Meeting
              </>
            )}
          </Button>
          <Button variant="outline" onClick={resetTimer}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
