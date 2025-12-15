"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Play } from "lucide-react"
import clsx from "clsx"

const THEMES: Record<string, string[]> = {
  Fruits: ["🍎", "🍌", "🍊", "🍇", "🍓", "🥝", "🍑", "🍍"],
  Animals: ["🐶", "🐱", "🦊", "🐻", "🐼", "🐸", "🐵", "🐰"],
  Faces: ["😀", "😅", "😍", "🤓", "😎", "🥶", "🥳", "😡"],
  Shapes: ["🔵", "🟠", "🟢", "🟣", "🟡", "🟥", "⬛", "⬜"],
}

const getRandomTheme = () => {
  const keys = Object.keys(THEMES)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return { name: randomKey, icons: THEMES[randomKey] }
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const initializeCards = (icons: string[], size: number) => {
  const selected = icons.slice(0, (size * size) / 2)
  const pairs = selected.flatMap((icon, index) => [
    { id: index * 2, icon, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, icon, isFlipped: false, isMatched: false },
  ])
  return shuffleArray(pairs)
}

interface MemoryGameProps {
  onGameWin?: (moves: number) => void
}

export function MemoryGame({ onGameWin }: MemoryGameProps) {
  const [{ name: themeName, icons: themeIcons }, setTheme] = useState(getRandomTheme)
  const [gridSize, setGridSize] = useState(4)
  const [cards, setCards] = useState(() => initializeCards(themeIcons, 4))
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [highScore, setHighScore] = useState<number | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("memory-highscore")
    if (stored) setHighScore(Number(stored))
  }, [])

  const playFlipSound = () => {
    if (isMuted) return
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    const context = audioContextRef.current
    const osc = context.createOscillator()
    const gain = context.createGain()
    osc.frequency.value = 300 + Math.random() * 200
    osc.type = "square"
    gain.gain.setValueAtTime(0.1, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.2)
    osc.connect(gain)
    gain.connect(context.destination)
    osc.start()
    osc.stop(context.currentTime + 0.2)
  }

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(50)
  }

  const resetGame = (newSize = gridSize) => {
    const newTheme = getRandomTheme()
    setTheme(newTheme)
    setCards(initializeCards(newTheme.icons, newSize))
    setGridSize(newSize)
    setFlippedCards([])
    setMoves(0)
    setGameWon(false)
    setIsChecking(false)
  }

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (isChecking || flippedCards.length >= 2) return
      const card = cards.find((c) => c.id === cardId)
      if (!card || card.isFlipped || card.isMatched) return

      const newFlipped = [...flippedCards, cardId]
      setFlippedCards(newFlipped)
      playFlipSound()
      vibrate()

      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)))

      if (newFlipped.length === 2) {
        setIsChecking(true)
        setMoves((prev) => prev + 1)

        const [firstId, secondId] = newFlipped
        const firstCard = cards.find((c) => c.id === firstId)
        const secondCard = cards.find((c) => c.id === secondId)

        setTimeout(() => {
          if (firstCard?.icon === secondCard?.icon) {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
              )
            )
          } else {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
              )
            )
          }
          setFlippedCards([])
          setIsChecking(false)
        }, 800)
      }
    },
    [cards, flippedCards, isChecking, isMuted]
  )

  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every((card) => card.isMatched)
    if (allMatched && !gameWon) {
      setGameWon(true)
      if (!highScore || moves < highScore) {
        setHighScore(moves)
        localStorage.setItem("memory-highscore", moves.toString())
      }
      if (onGameWin) onGameWin(moves)
    }
  }, [cards, gameWon, moves, highScore, onGameWin])

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl">
      <div className="text-center space-y-4 mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Memory Game
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-4 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
           <div className="text-sm px-3 py-1 bg-white dark:bg-slate-700 rounded shadow-sm">
             Theme: <strong>{themeName}</strong>
           </div>
           <div className="text-sm px-3 py-1 bg-white dark:bg-slate-700 rounded shadow-sm">
             Moves: <strong>{moves}</strong>
           </div>
           {highScore !== null && (
             <div className="text-sm px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded shadow-sm">
               Best: <strong>{highScore}</strong>
             </div>
           )}
           <Button
             size="sm"
             onClick={() => resetGame()}
             className="bg-blue-600 hover:bg-blue-700 text-white ml-2"
           >
             <RotateCcw className="w-4 h-4 mr-2" /> Reset
           </Button>
        </div>

        {gameWon && (
          <div className="flex justify-center items-center gap-2 animate-in fade-in slide-in-from-top-4">
            <label htmlFor="grid" className="text-sm font-medium">Grid Size: </label>
            <select
              id="grid"
              value={gridSize}
              onChange={(e) => resetGame(Number(e.target.value))}
              className="p-1 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            >
              <option value={4}>4x4 (Easy)</option>
              <option value={6}>6x6 (Hard)</option>
            </select>
          </div>
        )}
      </div>

      <div className="relative flex justify-center">
          <div
            className="grid gap-3"
            style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                maxWidth: gridSize === 6 ? '600px' : '400px',
                width: '100%'
            }}
          >
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isMatched || card.isFlipped || isChecking}
                className={clsx(
                  "aspect-square relative rounded-xl border-2 flex items-center justify-center text-3xl sm:text-4xl shadow-md",
                  "transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95",
                  card.isFlipped || card.isMatched
                    ? "bg-white dark:bg-slate-800 border-blue-400 dark:border-blue-500 rotate-y-180"
                    : "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 border-blue-600 dark:border-blue-700",
                  card.isMatched && "opacity-50 grayscale-[0.5]",
                  "disabled:cursor-default"
                )}
              >
                <span className={clsx(
                    "transition-opacity duration-300 select-none",
                    card.isFlipped || card.isMatched ? "opacity-100" : "opacity-0"
                )}>
                  {card.icon}
                </span>
                {!(card.isFlipped || card.isMatched) && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xl font-bold">
                        ?
                    </div>
                )}
              </button>
            ))}
          </div>

          {gameWon && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="text-center text-white p-8 bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl pointer-events-auto border border-white/10 animate-in zoom-in-50 duration-300">
                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">🎉 Victory!</h3>
                <p className="text-lg mb-6">You won in <strong className="text-white">{moves}</strong> moves!</p>
                <Button
                  onClick={() => resetGame()}
                  size="lg"
                  className="bg-white text-black hover:bg-neutral-200 font-bold rounded-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
            </div>
          )}
      </div>

      <div className="text-center mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted((prev) => !prev)}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            {isMuted ? "Unmute Sound" : "Mute Sound"}
          </Button>
      </div>
    </div>
  )
}
