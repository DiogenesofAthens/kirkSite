"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

type GameType = "snake" | "2048" | "simon" | "memory" | "tower-of-hanoi"

interface LeaderboardEntry {
  game: GameType
  score: number
  date: string
}

export function ArcadeLeaderboard({ game }: { game?: GameType }) {
  const [scores, setScores] = useState<LeaderboardEntry[]>([])

  const loadScores = () => {
    const saved = localStorage.getItem("arcade-scores")
    if (saved) {
      let parsed: LeaderboardEntry[] = JSON.parse(saved)
      if (game) {
        parsed = parsed.filter(s => s.game === game)
      }
      // Sort by score desc, take top 10
      parsed.sort((a, b) => b.score - a.score)
      setScores(parsed.slice(0, 10))
    }
  }

  useEffect(() => {
    loadScores()
    // Listen for storage events in case scores update in another tab or component
    window.addEventListener("storage", loadScores)
    return () => window.removeEventListener("storage", loadScores)
  }, [game])

  // Custom event listener for local score updates
  useEffect(() => {
      const handleScoreUpdate = () => loadScores()
      window.addEventListener("arcade-score-update", handleScoreUpdate)
      return () => window.removeEventListener("arcade-score-update", handleScoreUpdate)
  }, [game])

  if (scores.length === 0) {
      return (
        <Card className="glass border-0 shadow-lg h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Trophy className="w-5 h-5 text-yellow-500" /> Leaderboard
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-sm text-center">No high scores yet. Play a game to set one!</p>
            </CardContent>
        </Card>
      )
  }

  return (
    <Card className="glass border-0 shadow-lg h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="w-5 h-5 text-yellow-500" /> {game ? "High Scores" : "Global Leaderboard"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {scores.map((entry, i) => (
          <div key={i} className="flex items-center justify-between text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0">
            <div className="flex items-center gap-3">
              <span className={`
                font-bold w-6 text-center
                ${i === 0 ? "text-yellow-500 text-lg" :
                  i === 1 ? "text-slate-400 text-base" :
                  i === 2 ? "text-amber-700 text-base" : "text-muted-foreground"}
              `}>
                #{i + 1}
              </span>
              <div>
                  {!game && <span className="block text-xs font-semibold uppercase opacity-70">{entry.game}</span>}
                  <span className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</span>
              </div>
            </div>
            <span className="font-mono font-bold">{entry.score}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function saveScore(game: GameType, score: number) {
    if (typeof window === "undefined") return

    const saved = localStorage.getItem("arcade-scores")
    const scores: LeaderboardEntry[] = saved ? JSON.parse(saved) : []

    // Add new score
    scores.push({
        game,
        score,
        date: new Date().toISOString()
    })

    // Keep top 50 per game to prevent bloat
    const cleaned = scores
        .sort((a, b) => b.score - a.score)
        .slice(0, 200) // global limit

    localStorage.setItem("arcade-scores", JSON.stringify(cleaned))

    // Dispatch event to notify components
    window.dispatchEvent(new Event("arcade-score-update"))
}
