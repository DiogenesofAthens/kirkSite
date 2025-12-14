"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw, Play, Star, Trophy } from "lucide-react"
import { motion, AnimatePresence, PanInfo, useAnimation } from "framer-motion"
import confetti from "canvas-confetti"
import { cn } from "@/lib/utils"

const RING_COLORS = [
  "bg-red-500 shadow-[0_4px_0_#991b1b]",
  "bg-amber-400 shadow-[0_4px_0_#b45309]",
  "bg-orange-500 shadow-[0_4px_0_#9a3412]",
  "bg-lime-500 shadow-[0_4px_0_#3f6212]",
  "bg-cyan-400 shadow-[0_4px_0_#0e7490]",
  "bg-indigo-600 shadow-[0_4px_0_#3730a3]"
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

  // Audio hooks
  const playPop = () => { /* Placeholder for sound */ }
  const playSlide = () => { /* Placeholder for sound */ }
  const playWin = () => { /* Placeholder for sound */ }

  const pegRefs = useRef<(HTMLDivElement | null)[]>([])

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
    playPop()
  }, [difficulty])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  useEffect(() => {
    if (pegs[2].length === difficulty && pegs[2].every((r, i) => r.size === difficulty - i)) {
      if (!isWon) {
        setIsWon(true)
        saveBestScore(difficulty, moves)
        playWin()
        triggerConfetti()
      }
    }
  }, [pegs, difficulty, moves, saveBestScore, isWon])

  const triggerConfetti = () => {
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ef4444', '#f59e0b', '#3b82f6']
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ef4444', '#f59e0b', '#3b82f6']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }

  const attemptMove = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return

    const fromPeg = pegs[fromIndex]
    const toPeg = pegs[toIndex]

    if (fromPeg.length === 0) return

    const movingRing = fromPeg[fromPeg.length - 1]
    const targetTopRing = toPeg[toPeg.length - 1]

    if (toPeg.length === 0 || movingRing.size < targetTopRing.size) {
      const newPegs: [Peg, Peg, Peg] = pegs.map(p => [...p]) as [Peg, Peg, Peg]
      newPegs[toIndex].push(newPegs[fromIndex].pop()!)
      setPegs(newPegs)
      setMoves(m => m + 1)
      playSlide()
    } else {
      // Invalid move shake or feedback?
    }
  }

  const handlePegClick = (pegIndex: number) => {
    if (isWon) return

    if (selectedPeg === null) {
      if (pegs[pegIndex].length > 0) {
        setSelectedPeg(pegIndex)
        playPop()
      }
    } else {
      attemptMove(selectedPeg, pegIndex)
      setSelectedPeg(null)
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, fromIndex: number) => {
    const dropPoint = { x: info.point.x, y: info.point.y }

    // Find nearest peg
    let nearestIndex = -1
    let minDistance = Infinity

    pegRefs.current.forEach((ref, idx) => {
      if (ref) {
        const rect = ref.getBoundingClientRect()
        const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        const dist = Math.abs(dropPoint.x - center.x) // Mainly care about X axis for columns

        // Check if within reasonable range (e.g., width of the column)
        if (dist < rect.width && dist < minDistance) {
            minDistance = dist
            nearestIndex = idx
        }
      }
    })

    if (nearestIndex !== -1 && nearestIndex !== fromIndex) {
      attemptMove(fromIndex, nearestIndex)
    }

    setSelectedPeg(null)
  }

  const minMoves = getMinMoves(difficulty)

  // Star Calculation
  const getStars = () => {
    if (moves === 0) return 3
    if (moves <= minMoves) return 3
    if (moves <= minMoves * 1.5) return 2
    return 1
  }
  const stars = getStars()

  return (
    <div className={cn("w-full max-w-5xl mx-auto p-4 md:p-8 perspective-1000", isWon ? "bg-black/80 transition-colors duration-1000" : "")}>

      {/* HUD */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 mb-12"
      >
        <div className="mx-auto max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl flex items-center justify-between text-white">
          <div className="flex flex-col">
            <span className="text-xs text-white/60 font-semibold tracking-wider uppercase">Difficulty</span>
            <div className="flex items-center gap-2 mt-1">
               <div className="flex gap-1">
                 {[3, 4, 5, 6].map(level => (
                   <button
                     key={level}
                     onClick={() => !isWon && setDifficulty(level)}
                     disabled={isWon || moves > 0}
                     className={cn(
                       "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all",
                       difficulty === level
                        ? "bg-white text-black shadow-[0_2px_0_rgba(0,0,0,0.2)] translate-y-0"
                        : "bg-white/10 text-white hover:bg-white/20"
                     )}
                   >
                     {level}
                   </button>
                 ))}
               </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
             <div className="flex gap-1 mb-1">
               {[1, 2, 3].map(s => (
                 <Star
                    key={s}
                    className={cn(
                        "w-6 h-6 transition-all duration-500",
                        s <= stars ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" : "text-white/20"
                    )}
                 />
               ))}
             </div>
             <div className="text-xs font-mono text-white/80">
                MOVES: <span className={cn("font-bold text-lg", moves > minMoves ? "text-red-400" : "text-white")}>{moves}</span> / {minMoves}
             </div>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={initializeGame} className="text-white hover:bg-white/10 hover:text-white">
                <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Game Board */}
      <div className="relative h-[400px] md:h-[500px] flex items-end justify-center perspective-origin-bottom">

          {/* Spotlight Effect when Won */}
          {isWon && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[800px] bg-gradient-to-b from-yellow-100/20 via-yellow-100/5 to-transparent blur-3xl pointer-events-none z-0"
              />
          )}

          {/* Base Platform */}
          <div className="absolute bottom-0 w-[90%] md:w-[80%] h-12 bg-neutral-800 rounded-lg shadow-2xl transform-style-3d rotate-x-12 origin-bottom overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
             <div className="absolute top-0 w-full h-[2px] bg-white/10" />
          </div>

          {/* Pegs Container */}
          <div className="relative z-10 flex justify-between w-[80%] md:w-[60%] mb-4">
              {pegs.map((peg, pegIndex) => (
                  <div
                    key={pegIndex}
                    ref={el => { pegRefs.current[pegIndex] = el }}
                    className="relative flex flex-col justify-end items-center w-32 group"
                    onClick={() => handlePegClick(pegIndex)}
                  >
                      {/* Peg Cylinder */}
                      <div className="absolute bottom-0 w-4 md:w-6 h-64 md:h-80 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-t-full shadow-[inset_0_-10px_20px_rgba(0,0,0,0.2)]">
                          <div className="absolute top-0 left-0 right-0 h-4 bg-white/40 rounded-full blur-[1px]" />
                      </div>

                      {/* Rings */}
                      <div className="relative z-20 flex flex-col-reverse items-center mb-1 w-full h-full justify-end">
                        <AnimatePresence>
                          {peg.map((ring, ringIndex) => {
                              const isTop = ringIndex === peg.length - 1
                              const isDraggable = isTop && !isWon
                              const isSelected = selectedPeg === pegIndex && isTop

                              return (
                                <motion.div
                                  layoutId={`ring-${ring.id}`}
                                  key={ring.id}
                                  drag={isDraggable}
                                  dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                  dragElastic={0.2}
                                  dragMomentum={false}
                                  onDragEnd={(e, info) => handleDragEnd(e, info, pegIndex)}
                                  whileHover={isDraggable ? { y: -10, scale: 1.05 } : {}}
                                  whileDrag={{ scale: 1.1, zIndex: 100, cursor: "grabbing" }}
                                  initial={false}
                                  animate={{
                                    y: isSelected ? -20 : 0,
                                    scale: isSelected ? 1.05 : 1,
                                    zIndex: isSelected ? 50 : 0
                                  }}
                                  transition={{
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 30,
                                      mass: 1
                                  }}
                                  className={cn(
                                      "relative rounded-xl cursor-pointer transition-colors",
                                      ring.color,
                                      isDraggable ? "cursor-grab" : "cursor-default",
                                      isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-black/50" : ""
                                  )}
                                  style={{
                                      width: `${40 + (ring.size * 20)}px`,
                                      height: "36px",
                                      marginBottom: "2px"
                                  }}
                                >
                                    {/* Specular Highlight */}
                                    <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/30 to-transparent rounded-t-xl" />
                                    {/* Inner Texture/Hole hint */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 md:w-6 h-full bg-black/10 blur-[1px]" />
                                </motion.div>
                              )
                          })}
                        </AnimatePresence>
                      </div>

                      {/* Hover Target Area */}
                      <div className="absolute inset-0 z-0 bg-transparent" />

                      {/* Peg Label */}
                      <div className="absolute -bottom-10 font-bold text-neutral-400 font-mono text-xl">
                          {String.fromCharCode(65 + pegIndex)}
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* Victory Overlay */}
      <AnimatePresence>
        {isWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
              <div className="bg-black/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl text-center pointer-events-auto">
                  <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4 drop-shadow-sm">
                      VICTORY!
                  </h2>
                  <div className="flex justify-center gap-2 mb-6">
                      {[1, 2, 3].map(s => (
                          <motion.div
                             key={s}
                             initial={{ scale: 0, rotate: -180 }}
                             animate={{ scale: 1, rotate: 0 }}
                             transition={{ delay: s * 0.2, type: "spring" }}
                          >
                            <Star className={cn("w-12 h-12 fill-yellow-400 text-yellow-500", s > stars && "fill-gray-600 text-gray-700")} />
                          </motion.div>
                      ))}
                  </div>
                  <p className="text-white/80 mb-6 text-lg">
                      Completed in <strong className="text-white">{moves}</strong> moves <br/>
                      <span className="text-sm opacity-60">(Minimum: {minMoves})</span>
                  </p>

                  <Button onClick={initializeGame} size="lg" className="bg-white text-black hover:bg-neutral-200 font-bold rounded-full px-8">
                      Play Again
                  </Button>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
