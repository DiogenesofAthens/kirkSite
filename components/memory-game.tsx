"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export function MemoryGame() {
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
    }
  }, [cards, gameWon, moves, highScore])

  return (
    <Card className="border-0 shadow-xl w-full max-w-md mx-auto">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-bold text-slate-900 dark:text-white">
          Memory Game
        </CardTitle>
        <div className="text-sm text-muted-foreground">Theme: {themeName}</div>
        <div className="flex flex-wrap justify-between items-center px-2 gap-2">
          <span className="text-base font-semibold text-slate-700 dark:text-slate-300">
            Moves: {moves}
          </span>
          {highScore !== null && (
            <span className="text-sm text-green-600 dark:text-green-400">
              Best: {highScore} moves
            </span>
          )}
          <Button
            size="sm"
            onClick={() => resetGame()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
        {gameWon && (
          <div className="text-sm pt-2">
            <label htmlFor="grid">Grid Size: </label>
            <select
              id="grid"
              value={gridSize}
              onChange={(e) => resetGame(Number(e.target.value))}
              className="ml-2 p-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option value={4}>4x4</option>
              <option value={6}>6x6</option>
            </select>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="relative">
          <div
            className={clsx(
              "grid gap-2 p-4 justify-center",
              `grid-cols-${gridSize}`
            )}
          >
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isMatched || card.isFlipped || isChecking}
                className={clsx(
                  "relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 flex items-center justify-center text-2xl font-bold",
                  "transition-transform duration-300 ease-in-out",
                  "transform hover:scale-105",
                  card.isFlipped || card.isMatched
                    ? "bg-white dark:bg-slate-100 border-blue-300 dark:border-blue-400"
                    : "bg-blue-500 dark:bg-blue-600 border-blue-600 dark:border-blue-700 hover:bg-blue-400 dark:hover:bg-blue-500",
                  card.isMatched && "opacity-75",
                  "disabled:cursor-not-allowed"
                )}
              >
                <span className="transition-opacity duration-300">
                  {card.isFlipped || card.isMatched ? card.icon : "?"}
                </span>
              </button>
            ))}
          </div>

          {gameWon && (
            <div className="absolute inset-0 bg-black/50 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center rounded">
              <div className="text-center text-white dark:text-white space-y-2 p-6 bg-black/70 dark:bg-slate-900/80 rounded-xl shadow-xl">
                <h3 className="text-xl font-bold">🎉 Congratulations!</h3>
                <p className="text-sm">You won in {moves} moves!</p>
                <Button
                  onClick={() => resetGame()}
                  className="bg-blue-600 hover:bg-blue-700 text-white mt-2"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Click cards to flip them and find matching pairs!
        </p>
        <div className="text-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMuted((prev) => !prev)}
          >
            {isMuted ? "Unmute" : "Mute"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
