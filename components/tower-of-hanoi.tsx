"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { RotateCcw, Play, Trophy } from "lucide-react"
import { motion } from "framer-motion"

const RING_COLORS = [
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-300",
  "bg-lime-400",
  "bg-cyan-400",
  "bg-blue-600"
]

const getMinMoves = (rings: number) => Math.pow(2, rings) - 1

type Ring = {
  id: number
  size: number
  color: string
}

type Peg = Ring[]

export function TowerOfHanoi() {
  const [difficulty, setDifficulty] = useState(3)
  const [pegs, setPegs] = useState<[Peg, Peg, Peg]>([[], [], []])
  const [selectedPeg, setSelectedPeg] = useState<number | null>(null)
  const [moves, setMoves] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [bestScores, setBestScores] = useState<Record<number, number>>({})
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("hanoi-best-scores")
    if (saved) setBestScores(JSON.parse(saved))
  }, [])

  const saveBestScore = useCallback((difficulty: number, moves: number) => {
    const newBestScores = { ...bestScores }
    if (!newBestScores[difficulty] || moves < newBestScores[difficulty]) {
      newBestScores[difficulty] = moves
      setBestScores(newBestScores)
      localStorage.setItem("hanoi-best-scores", JSON.stringify(newBestScores))
    }
  }, [bestScores])

  const initializeGame = useCallback(() => {
    const rings: Ring[] = []
    for (let i = 0; i < difficulty; i++) {
      rings.push({
        id: i,
        size: difficulty - i,
        color: RING_COLORS[i % RING_COLORS.length]
      })
    }
    setPegs([rings, [], []])
    setSelectedPeg(null)
    setMoves(0)
    setIsWon(false)
    setShowConfetti(false)
  }, [difficulty])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  useEffect(() => {
    if (pegs[2].length === difficulty && pegs[2].every((r, i) => r.size === difficulty - i)) {
      setIsWon(true)
      setShowConfetti(true)
      saveBestScore(difficulty, moves)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [pegs, difficulty, moves, saveBestScore])

  const handlePegClick = (pegIndex: number) => {
    if (isWon) return

    if (selectedPeg === null && pegs[pegIndex].length > 0) {
      setSelectedPeg(pegIndex)
    } else if (selectedPeg !== null) {
      if (selectedPeg === pegIndex) {
        setSelectedPeg(null)
      } else {
        const from = pegs[selectedPeg]
        const to = pegs[pegIndex]
        const moving = from[from.length - 1]

        if (to.length === 0 || moving.size < to[to.length - 1].size) {
          const newPegs: [Peg, Peg, Peg] = pegs.map(p => [...p]) as [Peg, Peg, Peg]
          newPegs[pegIndex].push(newPegs[selectedPeg].pop()!)
          setPegs(newPegs)
          setMoves(m => m + 1)
        }
        setSelectedPeg(null)
      }
    }
  }

  const minMoves = getMinMoves(difficulty)
  const best = bestScores[difficulty]

  return (
    <Card className="bg-transparent shadow-none max-w-4xl mx-auto p-4">
      <CardHeader className="text-center space-y-3">
        <CardTitle className="text-4xl font-bold">Tower of Hanoi</CardTitle>
        <div className="text-sm">Difficulty: {difficulty} rings</div>
        <Slider
          value={[difficulty]}
          onValueChange={(v) => setDifficulty(v[0])}
          min={3}
          max={6}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between items-center text-sm px-4">
          <span>Moves: <strong>{moves}</strong></span>
          <span>Min: <strong>{minMoves}</strong></span>
          <Button size="icon" onClick={initializeGame} className="bg-blue-600 hover:bg-blue-700">
            <RotateCcw className="w-4 h-4 text-white" />
          </Button>
        </div>
        {best && (
          <div className="flex items-center justify-center gap-2 text-sm text-green-600">
            <Trophy className="w-4 h-4" /> Best: {best} moves
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="relative">
          {showConfetti && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                />
              ))}
            </div>
          )}

          <div className="flex justify-center items-end gap-6 h-[320px] sm:h-[380px]">
            {pegs.map((peg, index) => (
              <div
                key={index}
                onClick={() => handlePegClick(index)}
                className={`relative flex flex-col-reverse items-center w-24 sm:w-28 min-h-full cursor-pointer transition-all duration-300 ${selectedPeg === index ? "scale-105" : "hover:scale-105"}`}
              >
                <div className="w-20 h-2 bg-[burlywood] rounded-full shadow-inner" />
                <div className="w-1 flex-1 bg-[saddlebrown] rounded-full" />
                <div className="absolute bottom-2 flex flex-col-reverse items-center gap-1">
                  {peg.map((ring, idx) => (
                    <motion.div
                      key={ring.id}
                      className={`${ring.color} rounded-full shadow-md border border-white ${selectedPeg === index && idx === peg.length - 1 ? "scale-105 ring-2 ring-white" : ""}`}
                      style={{
                        width: `${ring.size * 14 + 24}px`,
                        height: "20px"
                      }}
                      animate={{ y: 0, opacity: 1 }}
                      initial={{ y: 10, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  ))}
                </div>
                <div className="absolute -bottom-5 text-xs font-semibold text-white bg-amber-700 px-2 py-0.5 rounded-full shadow">
                  {String.fromCharCode(65 + index)}
                </div>
              </div>
            ))}
          </div>

          {isWon && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-xl">
              <motion.div
                className="text-center text-white bg-gradient-to-br from-green-500 to-emerald-700 p-10 rounded-2xl shadow-2xl border border-white/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <h3 className="text-3xl font-bold mb-3">🎉 You Won!</h3>
                <p className="text-lg mb-2">You completed the puzzle in <strong>{moves}</strong> moves.</p>
                {moves === minMoves && <p className="text-yellow-300 font-bold">Perfect Score! ⭐</p>}
                <Button onClick={initializeGame} className="mt-4 bg-white text-green-700 hover:bg-green-100">
                  <Play className="w-4 h-4 mr-2" /> Play Again
                </Button>
              </motion.div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          <p>Click a peg to select, then another to move a ring</p>
          <p>Goal: Move all rings to peg C (largest to smallest)</p>
        </div>
      </CardContent>
    </Card>
  )
}
