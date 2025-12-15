"use client"
import { SimonGame } from "@/components/simon"
import { useGameHistory, GameScoreHistory } from "@/components/games/game-score-history"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SimonPage() {
  const { history, addScore } = useGameHistory("simon-leaderboard")

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
       {/* Header */}
       <div className="p-4 flex items-center gap-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <Link href="/resources">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2"/> Back to Arcade
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Simon Says</h1>
       </div>

       {/* Main Stage */}
       <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] py-8">
          <SimonGame onGameOver={addScore} />
       </div>

       {/* Footer */}
       <div className="p-4 pb-12 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <GameScoreHistory history={history} />
       </div>
    </div>
  )
}
