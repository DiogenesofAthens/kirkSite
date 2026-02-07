"use client"

import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy, Calendar } from "lucide-react"

export interface ScoreEntry {
  score: number
  date: string
}

export function useGameHistory(gameKey: string) {
  const [history, setHistory] = useState<ScoreEntry[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(gameKey)
      if (stored) {
        try {
          setHistory(JSON.parse(stored))
        } catch (e) {
          console.error("Failed to parse game history", e)
        }
      }
    }
  }, [gameKey])

  const addScore = (score: number) => {
    const newEntry = { score, date: new Date().toLocaleDateString() }
    const updated = [newEntry, ...history].slice(0, 10) // Keep last 10
    setHistory(updated)
    localStorage.setItem(gameKey, JSON.stringify(updated))
  }

  return { history, addScore }
}

interface GameScoreHistoryProps {
  history: ScoreEntry[]
}

export function GameScoreHistory({ history }: GameScoreHistoryProps) {
  return (
    <div className="w-full max-w-md mx-auto mt-8 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h3 className="font-bold text-lg">Recent Attempts</h3>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400 italic">
          No games played yet. Give it a shot!
        </div>
      ) : (
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {history.map((entry, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 rounded-lg bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Calendar className="w-3 h-3 opacity-50" />
                  <span>{entry.date}</span>
                </div>
                <div className="font-mono font-bold text-slate-900 dark:text-amber-400">
                  {entry.score} pts
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
