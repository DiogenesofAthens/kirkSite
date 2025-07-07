"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

type Color = "red" | "green" | "blue" | "yellow"
const COLORS: Color[] = ["green", "red", "yellow", "blue"]

const COLOR_MAP: Record<Color, string> = {
  red: "bg-red-600",
  green: "bg-green-600",
  yellow: "bg-yellow-400",
  blue: "bg-blue-500",
}

const LIGHT_MAP: Record<Color, string> = {
  red: "bg-red-300",
  green: "bg-green-300",
  yellow: "bg-yellow-200",
  blue: "bg-blue-300",
}

export default function SimonSays() {
  const [sequence, setSequence] = useState<Color[]>([])
  const [playerIndex, setPlayerIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [highlight, setHighlight] = useState<Color | null>(null)
  const [strict, setStrict] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [level, setLevel] = useState(0)

  const startGame = () => {
    setSequence([])
    setPlayerIndex(0)
    setIsPlaying(true)
    setGameOver(false)
    setLevel(0)
    setTimeout(() => {
      addColorToSequence()
    }, 500)
  }

  const addColorToSequence = () => {
    const newColor = COLORS[Math.floor(Math.random() * COLORS.length)]
    setSequence((prev) => [...prev, newColor])
    setPlayerIndex(0)
    setLevel((prev) => prev + 1)
  }

  const playSequence = async () => {
    for (let i = 0; i < sequence.length; i++) {
      const color = sequence[i]
      setHighlight(color)
      await new Promise((res) => setTimeout(res, 500))
      setHighlight(null)
      await new Promise((res) => setTimeout(res, 200))
    }
  }

  const handlePlayerInput = (color: Color) => {
    if (gameOver || !isPlaying) return
    if (color === sequence[playerIndex]) {
      if (playerIndex + 1 === sequence.length) {
        setTimeout(() => {
          addColorToSequence()
        }, 1000)
      }
      setPlayerIndex((prev) => prev + 1)
    } else {
      setGameOver(true)
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    if (isPlaying && sequence.length > 0) {
      playSequence()
    }
  }, [sequence])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-black text-white">
      <h1 className="text-4xl font-extrabold mb-4 tracking-wide">Simon Says</h1>
      <p className="mb-2 text-lg italic">Repeat the sequence to level up</p>
      <p className="mb-6 text-md text-slate-400">Level: {level}</p>

      <div className="grid grid-cols-2 gap-4 w-[320px] h-[320px]">
        {COLORS.map((color) => (
          <div
            key={color}
            onClick={() => handlePlayerInput(color)}
            className={`rounded-full transition-all duration-200 cursor-pointer w-full h-full ${
              highlight === color ? LIGHT_MAP[color] : COLOR_MAP[color]
            }`}
          />
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <Button onClick={startGame} className="bg-blue-600 hover:bg-blue-700 text-white">
          {gameOver ? "Play Again" : sequence.length === 0 ? "Start Game" : "Restart"}
        </Button>
        <Button variant="outline" onClick={() => setStrict((s) => !s)}>
          Strict: {strict ? "On" : "Off"}
        </Button>
      </div>

      {gameOver && (
        <p className="text-red-400 mt-6 text-lg font-semibold">Game Over! Try again?</p>
      )}
    </div>
  )
}
