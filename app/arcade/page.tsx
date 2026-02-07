"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { SnakeGame } from "@/components/snake-game"
import { Game2048 } from "@/components/game-2048"
import { SimonGame } from "@/components/simon"
import { MemoryGame } from "@/components/memory-game"
import { TowerOfHanoi } from "@/components/tower-of-hanoi"
import { ArcadeLeaderboard } from "@/components/arcade-leaderboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gamepad2, Grid3X3, Brain, Activity, Layers } from "lucide-react"

export default function ArcadePage() {
  const [activeGame, setActiveGame] = useState("snake")

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      </div>

      <FloatingNav />
      <TimezoneClock />

      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-2">
                <Gamepad2 className="w-10 h-10 text-primary" /> Arcade
            </h1>
            <p className="text-muted-foreground">Take a break. Challenge yourself. Top the leaderboard.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
            <div className="w-full">
                <Tabs defaultValue="snake" className="w-full" onValueChange={setActiveGame}>
                    <TabsList className="grid w-full grid-cols-5 mb-8">
                        <TabsTrigger value="snake"><Activity className="w-4 h-4 md:mr-2" /><span className="hidden md:inline">Snake</span></TabsTrigger>
                        <TabsTrigger value="2048"><Grid3X3 className="w-4 h-4 md:mr-2" /><span className="hidden md:inline">2048</span></TabsTrigger>
                        <TabsTrigger value="simon"><Brain className="w-4 h-4 md:mr-2" /><span className="hidden md:inline">Simon</span></TabsTrigger>
                        <TabsTrigger value="memory"><Brain className="w-4 h-4 md:mr-2" /><span className="hidden md:inline">Memory</span></TabsTrigger>
                        <TabsTrigger value="hanoi"><Layers className="w-4 h-4 md:mr-2" /><span className="hidden md:inline">Hanoi</span></TabsTrigger>
                    </TabsList>

                    <TabsContent value="snake" className="mt-0">
                        <SnakeGame />
                    </TabsContent>
                    <TabsContent value="2048" className="mt-0">
                        <Game2048 />
                    </TabsContent>
                    <TabsContent value="simon" className="mt-0">
                        <SimonGame />
                    </TabsContent>
                    <TabsContent value="memory" className="mt-0">
                        <MemoryGame />
                    </TabsContent>
                    <TabsContent value="hanoi" className="mt-0">
                        <TowerOfHanoi />
                    </TabsContent>
                </Tabs>
            </div>

            <div className="sticky top-24">
                <ArcadeLeaderboard game={activeGame as any} />
            </div>
        </div>
      </main>
    </div>
  )
}
