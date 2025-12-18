"use client"

import React, { useState, useEffect, useRef } from "react"

const colors = [
  { id: 0, label: "Green", base: "bg-green-600", glow: "shadow-green-400", position: "top-0 left-0 rounded-tl-full" },
  { id: 1, label: "Red", base: "bg-red-600", glow: "shadow-red-400", position: "top-0 right-0 rounded-tr-full" },
  { id: 2, label: "Yellow", base: "bg-yellow-400", glow: "shadow-yellow-300", position: "bottom-0 left-0 rounded-bl-full" },
  { id: 3, label: "Blue", base: "bg-blue-600", glow: "shadow-blue-400", position: "bottom-0 right-0 rounded-br-full" },
]

const frequencies = [329.63, 261.63, 220.00, 164.81]

interface SimonGameProps {
  onGameOver?: (score: number) => void
}

export function SimonGame({ onGameOver }: SimonGameProps) {
  const [sequence, setSequence] = useState<number[]>([])
  const [userInput, setUserInput] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [showIndex, setShowIndex] = useState(-1)
  const [level, setLevel] = useState(0)
  const [status, setStatus] = useState("Click Start to Begin")
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [activeButton, setActiveButton] = useState<number | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  const audioContextRef = useRef<AudioContext | null>(null)

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
      if (onGameOver) onGameOver(score)
      return
    }

    if (newInput.length === sequence.length) {
      const newScore = score + level * 10
      setScore(newScore)
      setStatus("Nice! Leveling up...")
      setTimeout(() => nextLevel(), 1000)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-8 text-black dark:text-white transition-colors duration-300 relative">
      <div className="mb-8 text-center">
        <p className="text-2xl font-bold mb-2">{status}</p>
        <p className="text-lg opacity-80">Score: {score}</p>
      </div>

      <div className="relative aspect-square w-full max-w-[300px] sm:max-w-[400px] mb-8">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => handleClick(color.id)}
            disabled={!isPlaying && !isGameOver && sequence.length === 0}
            className={`absolute w-1/2 h-1/2 ${color.position} 
              ${activeButton === color.id ? `${color.base} ${color.glow} scale-105 z-10 brightness-110` : color.base}
              border-4 border-slate-900/10 dark:border-slate-100/10 transition-all duration-150 ease-in-out transform focus:outline-none hover:brightness-110 active:scale-95`}
            aria-label={color.label}
          />
        ))}

        {/* Center Hub */}
        <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 -translate-x-1/2 -translate-y-1/2 bg-slate-100 dark:bg-slate-900 rounded-full border-8 border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-2xl z-20">
          <div className="text-center">
            <div className="text-xs uppercase font-bold tracking-widest text-slate-400">Simon</div>
            {isGameOver && <div className="text-red-500 font-bold text-sm">GAME OVER</div>}
          </div>
        </div>

        {/* Start Overlay */}
        {!isPlaying && !isGameOver && sequence.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/40 backdrop-blur-[2px] rounded-full">
                <button
                    onClick={startGame}
                    className="bg-white text-black px-8 py-4 rounded-full font-bold text-xl shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:scale-110 transition-transform animate-pulse"
                >
                    START GAME
                </button>
            </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isGameOver && (
          <button
            onClick={startGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition hover:scale-105 font-bold"
          >
            Try Again
          </button>
        )}

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 px-4 py-2 rounded-full shadow transition text-sm font-medium"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  )
}
