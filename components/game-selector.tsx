"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad2 } from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useMatrix } from "@/components/matrix-provider"
import { toast } from "sonner"

export function GameSelector() {
  const { triggerMatrixMode } = useMatrix()

  // Easter Egg State
  const tapCountRef = useRef(0)
  const lastTapRef = useRef(0)
  const hasWarnedRef = useRef(false)

  const handleSecretTap = (e: React.MouseEvent) => {
    const now = Date.now()
    // Reset if too slow
    if (now - lastTapRef.current > 500) {
      tapCountRef.current = 1
      hasWarnedRef.current = false
    } else {
      tapCountRef.current += 1

      const count = tapCountRef.current
      if (count === 7) {
        triggerMatrixMode()
        toast.success("Behold the Matrix - You’ve been living in a dream world. This isn't CSS. This is the truth.", { id: 'matrix-activated' })
        tapCountRef.current = 0
        hasWarnedRef.current = false
      }
    }
    lastTapRef.current = now
  }

  const games = [
    {
      id: "simon",
      title: "Simon Says",
      description: "Repeat the pattern! Classic color memory game with difficulty scaling.",
      color: "bg-blue-500 hover:bg-neutral-900",
      emoji: "🔵",
      href: "/resources/games/simon"
    },
    {
      id: "hanoi",
      title: "Tower of Hanoi",
      description: "Move all rings to the rightmost peg - larger rings cannot go on smaller ones",
      color: "bg-orange-500 hover:bg-orange-600",
      emoji: "🗼",
      href: "/resources/games/towers"
    },
    {
      id: "memory",
      title: "Memory Game",
      description: "Find matching pairs of fruit cards - flip cards to reveal fruits and match them",
      color: "bg-purple-500 hover:bg-purple-600",
      emoji: "🧠",
      href: "/resources/games/memory"
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center justify-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                    onClick={handleSecretTap}
                    className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-help active:scale-95 duration-75 select-none"
                >
                   <Gamepad2 className="w-6 h-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-950 text-green-400 font-mono border-slate-800 text-xs tracking-widest shadow-md">
                <p>↑ ↑ ↓ ↓ ← → ← → B A</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          Fun Zone
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          Take a break and play a game! Sometimes the best solutions (and secret codes) come when you step away from the problem.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link key={game.id} href={game.href} className="block h-full">
            <Card
              className="glass border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group hover:scale-[1.02] h-full flex flex-col text-center"
            >
              <CardHeader className="text-center flex-1 flex flex-col items-center">
                <div className="text-5xl mb-4 group-hover:scale-105 transition-transform duration-300">{game.emoji}</div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-50">{game.title}</CardTitle>
                <CardDescription className="text-slate-700 dark:text-slate-300">{game.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button
                  className={`w-full text-white font-semibold ${game.color}`}
                >
                  Play {game.title}
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
