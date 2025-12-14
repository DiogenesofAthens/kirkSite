"use client"

import { FloatingNav } from "@/components/floating-nav"
import { MeetingCostCalculator } from "@/components/meeting-cost-calculator"
import { TimezoneClock } from "@/components/timezone-clock"

export default function MeetingCostPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingNav />
      <TimezoneClock />

      <main className="px-4 pt-32 pb-12 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl w-full text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Meeting Cost Calculator</h1>
          <p className="text-muted-foreground">
            Time is money. Visualize exactly how much money with this live meeting ticker.
          </p>
        </div>
        <MeetingCostCalculator />
      </main>
    </div>
  )
}
