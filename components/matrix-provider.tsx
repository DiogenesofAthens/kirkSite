"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { MatrixRain } from "@/components/matrix-rain"

interface MatrixContextType {
  isMatrixMode: boolean
  toggleMatrixMode: () => void
  triggerMatrixMode: () => void
}

const MatrixContext = React.createContext<MatrixContextType | undefined>(undefined)

export function MatrixProvider({ children }: { children: React.ReactNode }) {
  const [isMatrixMode, setIsMatrixMode] = React.useState(false)
  const [showOverlay, setShowOverlay] = React.useState(true)
  const [showRain, setShowRain] = React.useState(false)
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

  const triggerMatrixMode = React.useCallback(() => {
    setIsMatrixMode(true)
    setShowOverlay(true)
    setShowRain(true)
    setTheme("dark")
    toast.success("Behold the Matrix - You’ve been living in a dream world. This isn't CSS. This is the truth.", { id: 'matrix-activated' })

    // Rain effect duration (3 seconds)
    setTimeout(() => {
        setShowRain(false)
    }, 3000)
  }, [setTheme])

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
  }, [konamiIndex, konamiCode, triggerMatrixMode])

  const toggleMatrixMode = () => {
    setIsMatrixMode(!isMatrixMode)
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
      {showRain && <MatrixRain />}
      {children}
      {/* {isMatrixMode && showOverlay && (
        <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 border border-green-500 p-3 font-mono text-xs text-green-500 rounded shadow-[0_0_15px_#00ff00] min-w-[150px]">
            <div className="flex justify-between items-start mb-2 border-b border-green-500/30 pb-1">
                <span className="font-bold">DEBUG_MODE</span>
                <button
                  onClick={() => setShowOverlay(false)}
                  className="text-green-500 hover:text-white hover:bg-green-500/20 px-1 rounded"
                >
                  [x]
                </button>
            </div>
            <DebugStats />
        </div>
      )} */}
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
