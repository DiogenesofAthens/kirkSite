"use client"

import * as React from "react"
import { useTheme } from "next-themes"

interface MatrixContextType {
  isMatrixMode: boolean
  toggleMatrixMode: () => void
  triggerMatrixMode: () => void
}

const MatrixContext = React.createContext<MatrixContextType | undefined>(undefined)

export function MatrixProvider({ children }: { children: React.ReactNode }) {
  const [isMatrixMode, setIsMatrixMode] = React.useState(false)
  const { setTheme } = useTheme()
  const [konamiIndex, setKonamiIndex] = React.useState(0)

  // Konami Code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
  const konamiCode = React.useMemo(() => [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ], [])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === konamiCode[konamiIndex]) {
        const nextIndex = konamiIndex + 1
        if (nextIndex === konamiCode.length) {
          triggerMatrixMode()
          setKonamiIndex(0)
        } else {
          setKonamiIndex(nextIndex)
        }
      } else {
        setKonamiIndex(0)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konamiIndex, konamiCode, setTheme]) // Removed triggerMatrixMode from deps to avoid cycle if it was used directly, but it's defined below.

  const toggleMatrixMode = () => {
    setIsMatrixMode(!isMatrixMode)
  }

  const triggerMatrixMode = () => {
    setIsMatrixMode(true)
    setTheme("dark")
  }

  React.useEffect(() => {
    if (isMatrixMode) {
      document.documentElement.classList.add('matrix-mode')
    } else {
      document.documentElement.classList.remove('matrix-mode')
    }
  }, [isMatrixMode])

  return (
    <MatrixContext.Provider value={{ isMatrixMode, toggleMatrixMode, triggerMatrixMode }}>
      {children}
      {isMatrixMode && (
        <div className="fixed top-4 right-16 z-50 bg-black/80 border border-green-500 p-2 font-mono text-xs text-green-500 rounded shadow-[0_0_10px_#00ff00]">
            <DebugStats />
        </div>
      )}
    </MatrixContext.Provider>
  )
}

function DebugStats() {
    const [fps, setFps] = React.useState(0)

    React.useEffect(() => {
        let lastTime = performance.now()
        let frames = 0
        let animationFrameId: number

        const loop = () => {
            const now = performance.now()
            frames++
            if (now - lastTime >= 1000) {
                setFps(frames)
                frames = 0
                lastTime = now
            }
            animationFrameId = requestAnimationFrame(loop)
        }

        loop()
        return () => cancelAnimationFrame(animationFrameId)
    }, [])

    return (
        <div className="space-y-1">
            <div>MODE: DEVELOPER</div>
            <div>FPS: {fps}</div>
            <div>RES: {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A'}</div>
        </div>
    )
}

export function useMatrix() {
  const context = React.useContext(MatrixContext)
  if (context === undefined) {
    throw new Error("useMatrix must be used within a MatrixProvider")
  }
  return context
}
