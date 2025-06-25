"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, Play } from "lucide-react"

const FRUITS = ["🍎", "🍌", "🍊", "🍇", "🍓", "🥝", "🍑", "🍍"]
const GRID_SIZE = 4

type CardType = {
  id: number
  fruit: string
  isFlipped: boolean
  isMatched: boolean
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const initializeCards = (): CardType[] => {
  const pairs = FRUITS.flatMap((fruit, index) => [
    { id: index * 2, fruit, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, fruit, isFlipped: false, isMatched: false },
  ])

  return shuffleArray(pairs)
}

export function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>(initializeCards)
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const resetGame = () => {
    setCards(initializeCards())
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

      const newFlippedCards = [...flippedCards, cardId]
      setFlippedCards(newFlippedCards)

      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)))

      if (newFlippedCards.length === 2) {
        setIsChecking(true)
        setMoves((prev) => prev + 1)

        const [firstId, secondId] = newFlippedCards
        const firstCard = cards.find((c) => c.id === firstId)
        const secondCard = cards.find((c) => c.id === secondId)

        setTimeout(() => {
          if (firstCard?.fruit === secondCard?.fruit) {
            // Match found
            setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c)))
          } else {
            // No match, flip back
            setCards((prev) =>
              prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c)),
            )
          }
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      }
    },
    [cards, flippedCards, isChecking],
  )

  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every((card) => card.isMatched)
    if (allMatched && !gameWon) {
      setGameWon(true)
    }
  }, [cards, gameWon])

  return (
    <Card className="glass border-0 shadow-xl max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">Memory Game</CardTitle>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">Moves: {moves}</span>
          <Button size="sm" onClick={resetGame} className="bg-blue-600 hover:bg-blue-700">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="grid grid-cols-4 gap-2 p-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isMatched || card.isFlipped || isChecking}
                className={`
                  w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl font-bold
                  transition-all duration-300 transform hover:scale-105
                  ${
                    card.isFlipped || card.isMatched
                      ? "bg-white dark:bg-slate-100 border-blue-300 dark:border-blue-400"
                      : "bg-blue-500 dark:bg-blue-600 border-blue-600 dark:border-blue-700 hover:bg-blue-400 dark:hover:bg-blue-500"
                  }
                  ${card.isMatched ? "opacity-75" : ""}
                  disabled:cursor-not-allowed
                `}
              >
                {card.isFlipped || card.isMatched ? card.fruit : "?"}
              </button>
            ))}
          </div>

          {gameWon && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
              <div className="text-center text-white">
                <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
                <p className="mb-4">You won in {moves} moves!</p>
                <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700">
                  <Play className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          Click cards to flip them and find matching pairs!
        </div>
      </CardContent>
    </Card>
  )
}
