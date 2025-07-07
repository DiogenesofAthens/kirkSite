"use client"

import React, { useState, useEffect, useRef } from "react"

const colors = [
  { id: 0, label: "Green", base: "bg-green-600", glow: "shadow-green-400", position: "top-0 left-0 rounded-tl-full" },
  { id: 1, label: "Red", base: "bg-red-600", glow: "shadow-red-400", position: "top-0 right-0 rounded-tr-full" },
  { id: 2, label: "Yellow", base: "bg-yellow-400", glow: "shadow-yellow-300", position: "bottom-0 left-0 rounded-bl-full" },
  { id: 3, label: "Blue", base: "bg-blue-600", glow: "shadow-blue-400", position: "bottom-0 right-0 rounded-br-full" },
]

const frequencies = [329.63, 261.63, 220.00, 164.81] // Classic Simon tones

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
  const [scoreHistory, setScoreHistory] = useState<{ score: number; date: string }[]>([])
  const [isMuted, setIsMuted] = useState(false)

  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("simon-leaderboard")
    if (stored) {
      setScoreHistory(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    if (isPlaying && showIndex < sequence.length && showIndex !== -1) {
      const timeout = setTimeout(() => {
        const current = sequence[showIndex]
        vibrate()
        if (!isMuted) playTone(current)
        setActiveButton(current)
        setTimeout(() => setActiveButton(null), 400)
        setShowIndex(showIndex + 1)
      }, 600)
      return () => clearTimeout(timeout)
    } else if (isPlaying && showIndex !== -1) {
      setTimeout(() => setShowIndex(-1), 600)
    }
  }, [showIndex, isPlaying])

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(100)
  }

  const getNextColor = () => Math.floor(Math.random() * 4)

  const playTone = (index: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const context = audioContextRef.current
    const osc = context.createOscillator()
    const gain = context.createGain()

    osc.frequency.value = frequencies[index]
    osc.type = "sine"

    gain.gain.setValueAtTime(0.2, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.4)

    osc.connect(gain)
    gain.connect(context.destination)

    osc.start()
    osc.stop(context.currentTime + 0.4)
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

  const updateScoreHistory = (finalScore: number) => {
    const newEntry = { score: finalScore, date: new Date().toLocaleDateString() }
    const updated = [...scoreHistory, newEntry].slice(-5)
    setScoreHistory(updated)
    localStorage.setItem("simon-leaderboard", JSON.stringify(updated))
  }

  const handleClick = (index: number) => {
    if (!isPlaying || showIndex !== -1) return

    vibrate()
    if (!isMuted) playTone(index)
    setActiveButton(index)
    setTimeout(() => setActiveButton(null), 150)

    const newInput = [...userInput, index]
    setUserInput(newInput)

    if (sequence[newInput.length - 1] !== index) {
      setStatus("Wrong! Game Over.")
      setIsGameOver(true)
      setIsPlaying(false)
      updateScoreHistory(score)
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
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-10 w-full">
        <h1 className="text-3xl font-bold text-white mb-2">Simon Says</h1>
        <p className="text-slate-300 mb-6 italic">Repeat the sequence to level up</p>

        <div className="relative aspect-square w-full max-w-[20rem] sm:max-w-sm mb-8">
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
          <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-white/10 text-white dark:text-white rounded-full border-4 border-white flex items-center justify-center text-center font-bold backdrop-blur-lg shadow-xl">
            {isGameOver ? "Game Over" : `Lvl ${level}`}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          {!isGameOver ? (
            <button
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-md transition hover:scale-105"
            >
              {sequence.length ? "Restart" : "Start"}
            </button>
          ) : (
            <button
              onClick={resetGame}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition hover:scale-105"
            >
              Play Again
            </button>
          )}

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full shadow transition"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>

        <p className="text-white text-lg mb-4">{status} | Score: {score}</p>

        <div className="w-full max-w-md text-center mt-6">
          <h2 className="text-pink-400 font-semibold underline mb-2">🧠 Your Past Attempts</h2>
          <ul className="text-slate-200 space-y-1">
            {scoreHistory.length > 0 ? (
              scoreHistory.map((entry, idx) => (
                <li key={idx} className="bg-white/10 rounded px-3 py-1 shadow text-sm flex justify-between">
                  <span>{entry.date}</span>
                  <span className="font-semibold">{entry.score} pts</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400 text-sm">No attempts yet</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
