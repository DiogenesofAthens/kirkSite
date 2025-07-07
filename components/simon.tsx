"use client"

import React, { useState, useEffect } from "react"

const colors = [
  { id: 0, label: "Green", base: "bg-green-600", glow: "shadow-green-400", position: "top-0 left-0 rounded-tl-full" },
  { id: 1, label: "Red", base: "bg-red-600", glow: "shadow-red-400", position: "top-0 right-0 rounded-tr-full" },
  { id: 2, label: "Yellow", base: "bg-yellow-400", glow: "shadow-yellow-300", position: "bottom-0 left-0 rounded-bl-full" },
  { id: 3, label: "Blue", base: "bg-blue-600", glow: "shadow-blue-400", position: "bottom-0 right-0 rounded-br-full" },
]

const getNextColor = () => Math.floor(Math.random() * 4)

export default function SimonSays() {
  const [sequence, setSequence] = useState<number[]>([])
  const [userInput, setUserInput] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [showIndex, setShowIndex] = useState(-1)
  const [level, setLevel] = useState(0)
  const [status, setStatus] = useState("Click Start to Begin")
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [activeButton, setActiveButton] = useState<number | null>(null)
  const [leaderboard, setLeaderboard] = useState<number[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("simon-leaderboard")
    if (stored) {
      setLeaderboard(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    if (isPlaying && showIndex < sequence.length && showIndex !== -1) {
      const timeout = setTimeout(() => {
        const current = sequence[showIndex]
        vibrate()
        setActiveButton(current)
        setTimeout(() => setActiveButton(null), 400)
        setShowIndex(showIndex + 1)
      }, 600)
      return () => clearTimeout(timeout)
    } else if (isPlaying && showIndex !== -1) {
      setTimeout(() => {
        setShowIndex(-1)
      }, 600)
    }
  }, [showIndex, isPlaying])

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(100)
  }

  const startGame = () => {
    const first = getNextColor()
    setSequence([first])
    setUserInput([])
    setLevel(1)
    setScore(0)
    setShowIndex(0)
    setIsPlaying(true)
    setIsGameOver(false)
    setStatus("Level 1")
  }

  const nextLevel = () => {
    const next = getNextColor()
    setSequence((prev) => [...prev, next])
    setUserInput([])
    setLevel((prev) => prev + 1)
    setShowIndex(0)
    setStatus(`Level ${level + 1}`)
  }

  const updateLeaderboard = (finalScore: number) => {
    const updated = [...leaderboard, finalScore]
      .sort((a, b) => b - a)
      .slice(0, 5)
    setLeaderboard(updated)
    localStorage.setItem("simon-leaderboard", JSON.stringify(updated))
  }

  const handleClick = (index: number) => {
    if (!isPlaying || showIndex !== -1) return
    vibrate()
    setActiveButton(index)
    setTimeout(() => setActiveButton(null), 150)

    const newInput = [...userInput, index]
    setUserInput(newInput)

    if (sequence[newInput.length - 1] !== index) {
      setStatus("Wrong! Game Over.")
      setIsGameOver(true)
      setIsPlaying(false)
      updateLeaderboard(score)
      return
    }

    if (newInput.length === sequence.length) {
      const newScore = score + level * 10
      setScore(newScore)
      setStatus("Nice! Leveling up...")
      setTimeout(() => nextLevel(), 1000)
    }
  }

  const resetGame = () => {
    setSequence([])
    setUserInput([])
    setIsPlaying(false)
    setShowIndex(-1)
    setLevel(0)
    setScore(0)
    setStatus("Click Start to Begin")
    setIsGameOver(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h1 className="text-5xl font-extrabold mb-2 drop-shadow-lg">Simon Says</h1>
      <p className="italic text-lg mb-2">Repeat the sequence to level up</p>
      <p className="text-sm mb-6">{status} | Score: {score}</p>

      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mb-8">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => handleClick(color.id)}
            className={`absolute w-1/2 h-1/2 ${color.position} 
              ${activeButton === color.id ? `${color.base} ${color.glow} scale-110 shadow-2xl` : color.base}
              border-4 border-black transition-all duration-200 ease-in-out transform focus:outline-none`}
            aria-label={color.label}
          />
        ))}

        <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-white/10 text-white rounded-full border-4 border-white flex items-center justify-center text-center font-bold backdrop-blur-lg shadow-xl">
          {isGameOver ? "Game Over" : `Lvl ${level}`}
        </div>
      </div>

      {!isGameOver ? (
        <button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-md transition hover:scale-105"
        >
          {sequence.length ? "Restart" : "Start"}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl">Final Score: {score}</p>
          <button
            onClick={resetGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition hover:scale-105"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Leaderboard */}
      <div className="mt-10 w-full max-w-xs text-center">
        <h2 className="text-lg font-semibold mb-2 underline">🏆 Leaderboard</h2>
        <ul className="space-y-1">
          {leaderboard.length > 0 ? (
            leaderboard.map((s, idx) => (
              <li key={idx} className="bg-white/10 rounded px-3 py-1 shadow text-sm">
                #{idx + 1} — {s} pts
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-sm">No scores yet</li>
          )}
        </ul>
      </div>
    </div>
  )
}
