"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SimonSays from "@/components/simon"
import { TowerOfHanoi } from "@/components/tower-of-hanoi"
import { MemoryGame } from "@/components/memory-game"
import { ArrowLeft, Gamepad2 } from "lucide-react"

type GameType = "simon" | "hanoi" | "memory" | null

export function GameSelector() {
  const [selectedGame, setSelectedGame] = useState<GameType>(null)

  const games = [
    {
      id: "simon" as const,
      title: "Simon Says",
      description: "Repeat the pattern! Classic color memory game with difficulty scaling.",
      color: "bg-blue-500 hover:bg-blue-600",
      emoji: "🔵",
    },
    {
      id: "hanoi" as const,
      title: "Tower of Hanoi",
      description: "Move all rings to the rightmost peg - larger rings cannot go on smaller ones",
      color: "bg-orange-500 hover:bg-orange-600",
      emoji: "🗼",
    },
    {
      id: "memory" as const,
      title: "Memory Game",
      description: "Find matching pairs of fruit cards - flip cards to reveal fruits and match them",
      color: "bg-purple-500 hover:bg-purple-600",
      emoji: "🧠",
    },
  ]

  const renderGame = () => {
    switch (selectedGame) {
      case "simon":
        return <SimonSays />
      case "hanoi":
        return <TowerOfHanoi />
      case "memory":
        return <MemoryGame />
      default:
        return null
    }
  }

  if (selectedGame) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => setSelectedGame(null)} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Button>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {games.find((g) => g.id === selectedGame)?.title}
          </h3>
        </div>
        <div className="flex justify-center">{renderGame()}</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center justify-center gap-2">
          <Gamepad2 className="w-6 h-6" />
          Fun Zone
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          Take a break and play a game! Sometimes the best solutions come when you step away from the problem.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedGame(game.id)}
          >
            <CardHeader className="text-center">
              <div className="text-4xl mb-4">{game.emoji}</div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-50">{game.title}</CardTitle>
              <CardDescription className="text-slate-700 dark:text-slate-300">{game.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className={`w-full text-white font-semibold ${game.color}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedGame(game.id)
                }}
              >
                Play {game.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
