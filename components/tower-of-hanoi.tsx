"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { RotateCcw, Play, Trophy } from "lucide-react"

type Ring = {
  id: number
  size: number
  color: string
}

type Peg = Ring[]

const RING_COLORS = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"]

const getMinMoves = (rings: number) => Math.pow(2, rings) - 1

export function TowerOfHanoi() {
  const [difficulty, setDifficulty] = useState(3)
  const [pegs, setPegs] = useState<[Peg, Peg, Peg]>([[], [], []])
  const [selectedPeg, setSelectedPeg] = useState<number | null>(null)
  const [moves, setMoves] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [bestScores, setBestScores] = useState<Record<number, number>>({})
  const [showConfetti, setShowConfetti] = useState(false)

  // Load best scores from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("hanoi-best-scores")
    if (saved) {
      setBestScores(JSON.parse(saved))
    }
  }, [])

  // Save best scores to localStorage
  const saveBestScore = useCallback(
    (difficulty: number, moves: number) => {
      const newBestScores = { ...bestScores }
      if (!newBestScores[difficulty] || moves < newBestScores[difficulty]) {
        newBestScores[difficulty] = moves
        setBestScores(newBestScores)
        localStorage.setItem("hanoi-best-scores", JSON.stringify(newBestScores))
      }
    },
    [bestScores],
  )

  // Initialize game
  const initializeGame = useCallback(() => {
    const rings: Ring[] = []
    for (let i = 0; i < difficulty; i++) {
      rings.push({
        id: i,
        size: difficulty - i,
        color: RING_COLORS[i % RING_COLORS.length],
      })
    }
    setPegs([rings, [], []])
    setSelectedPeg(null)
    setMoves(0)
    setIsWon(false)
    setShowConfetti(false)
  }, [difficulty])

  // Initialize game when difficulty changes
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  // Check win condition
  useEffect(() => {
    if (pegs[2].length === difficulty && pegs[2].every((ring, index) => ring.size === difficulty - index)) {
      setIsWon(true)
      setShowConfetti(true)
      saveBestScore(difficulty, moves)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [pegs, difficulty, moves, saveBestScore])

  // Handle peg click
  const handlePegClick = (pegIndex: number) => {
    if (isWon) return

    if (selectedPeg === null) {
      // Select a peg if it has rings
      if (pegs[pegIndex].length > 0) {
        setSelectedPeg(pegIndex)
      }
    } else {
      // Try to move ring to target peg
      if (selectedPeg === pegIndex) {
        // Deselect if clicking same peg
        setSelectedPeg(null)
      } else {
        // Check if move is valid
        const sourcePeg = pegs[selectedPeg]
        const targetPeg = pegs[pegIndex]
        const ringToMove = sourcePeg[sourcePeg.length - 1]

        if (targetPeg.length === 0 || ringToMove.size < targetPeg[targetPeg.length - 1].size) {
          // Valid move
          const newPegs: [Peg, Peg, Peg] = [[], [], []]
          pegs.forEach((peg, index) => {
            newPegs[index] = [...peg]
          })

          // Move ring
          const movedRing = newPegs[selectedPeg].pop()!
          newPegs[pegIndex].push(movedRing)

          setPegs(newPegs)
          setMoves(moves + 1)
        }
        setSelectedPeg(null)
      }
    }
  }

  // Handle keyboard navigation
  // useEffect(() => {
  //   const handleKeyPress = (e: KeyboardEvent) => {
  //     if (isWon) return

  //     if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key)) {
  //       e.preventDefault()
  //     }

  //     if (selectedPeg !== null) {
  //       switch (e.key) {
  //         case "ArrowLeft":
  //           if (selectedPeg > 0) handlePegClick(selectedPeg - 1)
  //           break
  //         case "ArrowRight":
  //           if (selectedPeg < 2) handlePegClick(selectedPeg + 1)
  //           break
  //         case " ":
  //           setSelectedPeg(null)
  //           break
  //       }
  //     } else {
  //       switch (e.key) {
  //         case "ArrowLeft":
  //           handlePegClick(0)
  //           break
  //         case "ArrowUp":
  //           handlePegClick(1)
  //           break
  //         case "ArrowRight":
  //           handlePegClick(2)
  //           break
  //       }
  //     }
  //   }

  //   window.addEventListener("keydown", handleKeyPress)
  //   return () => window.removeEventListener("keydown", handleKeyPress)
  // }, [selectedPeg, isWon, pegs, moves])

  const minMoves = getMinMoves(difficulty)
  const currentBest = bestScores[difficulty]

  return (
    <Card className="glass border-0 shadow-xl max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">Tower of Hanoi</CardTitle>

        {/* Difficulty Slider */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Difficulty: {difficulty} rings
          </label>
          <Slider
            value={[difficulty]}
            onValueChange={(value) => setDifficulty(value[0])}
            min={3}
            max={6}
            step={1}
            className="w-full"
          />
        </div>

        {/* Game Stats */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-700 dark:text-slate-300">
            Moves: <span className="font-bold">{moves}</span>
          </span>
          <span className="text-slate-700 dark:text-slate-300">
            Min: <span className="font-bold">{minMoves}</span>
          </span>
          <Button size="sm" onClick={initializeGame} className="bg-blue-600 hover:bg-blue-700">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {currentBest && (
          <div className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400">
            <Trophy className="w-4 h-4" />
            Best: {currentBest} moves ({difficulty} rings)
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="relative">
          {/* Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Game Board */}
          <div className="flex justify-center items-end gap-8 h-64 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {pegs.map((peg, pegIndex) => (
              <div
                key={pegIndex}
                className={`
                  relative flex flex-col-reverse items-center cursor-pointer transition-all duration-200
                  ${selectedPeg === pegIndex ? "bg-blue-200 dark:bg-blue-800" : "hover:bg-slate-200 dark:hover:bg-slate-700"}
                  rounded-lg p-2 min-h-full w-20
                `}
                onClick={() => handlePegClick(pegIndex)}
              >
                {/* Peg Base */}
                <div className="w-16 h-2 bg-slate-400 dark:bg-slate-600 rounded-full mb-1" />

                {/* Peg Rod */}
                <div className="w-1 bg-slate-400 dark:bg-slate-600 flex-1 rounded-full" />

                {/* Rings */}
                <div className="absolute bottom-3 flex flex-col-reverse items-center gap-0.5">
                  {peg.map((ring, ringIndex) => (
                    <div
                      key={ring.id}
                      className={`
                        ${ring.color} rounded-full transition-all duration-300 border-2 border-white dark:border-slate-900
                        ${selectedPeg === pegIndex && ringIndex === peg.length - 1 ? "animate-pulse scale-105" : ""}
                      `}
                      style={{
                        width: `${ring.size * 8 + 16}px`,
                        height: "12px",
                      }}
                    />
                  ))}
                </div>

                {/* Peg Label */}
                <div className="absolute bottom-0 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-1 rounded">
                  {String.fromCharCode(65 + pegIndex)}
                </div>
              </div>
            ))}
          </div>

          {/* Win Message */}
          {isWon && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <div className="text-center text-white bg-green-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">🎉 You Won! 🎉</h3>
                <p className="mb-2">Completed in {moves} moves!</p>
                {moves === minMoves && <p className="text-yellow-300 font-bold">Perfect Score! ⭐</p>}
                <Button onClick={initializeGame} className="mt-4 bg-white text-green-600 hover:bg-slate-100">
                  <Play className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400 space-y-1">
          <p>Click a peg to select, then click another to move the top ring</p>
          <p>Goal: Move all rings to peg C (largest to smallest)</p>
        </div>
      </CardContent>
    </Card>
  )
}
