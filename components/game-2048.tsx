"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, Play } from "lucide-react"

const GRID_SIZE = 4

type Grid = number[][]

const initializeGrid = (): Grid => {
  const grid = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(0))
  addRandomTile(grid)
  addRandomTile(grid)
  return grid
}

const addRandomTile = (grid: Grid) => {
  const emptyCells: [number, number][] = []
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push([i, j])
      }
    }
  }
  if (emptyCells.length > 0) {
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    grid[row][col] = Math.random() < 0.9 ? 2 : 4
  }
}

const moveLeft = (grid: Grid): { newGrid: Grid; moved: boolean; score: number } => {
  const newGrid = grid.map((row) => [...row])
  let moved = false
  let score = 0

  for (let i = 0; i < GRID_SIZE; i++) {
    const row = newGrid[i].filter((val) => val !== 0)
    for (let j = 0; j < row.length - 1; j++) {
      if (row[j] === row[j + 1]) {
        row[j] *= 2
        score += row[j]
        row[j + 1] = 0
      }
    }
    const newRow = row.filter((val) => val !== 0)
    while (newRow.length < GRID_SIZE) {
      newRow.push(0)
    }

    for (let j = 0; j < GRID_SIZE; j++) {
      if (newGrid[i][j] !== newRow[j]) {
        moved = true
      }
      newGrid[i][j] = newRow[j]
    }
  }

  return { newGrid, moved, score }
}

const rotateGrid = (grid: Grid): Grid => {
  const newGrid = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(0))
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      newGrid[j][GRID_SIZE - 1 - i] = grid[i][j]
    }
  }
  return newGrid
}

export function Game2048() {
  const [grid, setGrid] = useState<Grid>(initializeGrid)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  const resetGame = () => {
    setGrid(initializeGrid())
    setScore(0)
    setGameOver(false)
    setWon(false)
  }

  const checkGameOver = useCallback((currentGrid: Grid) => {
    // Check for empty cells
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (currentGrid[i][j] === 0) return false
      }
    }

    // Check for possible moves
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const current = currentGrid[i][j]
        if (
          (i > 0 && currentGrid[i - 1][j] === current) ||
          (i < GRID_SIZE - 1 && currentGrid[i + 1][j] === current) ||
          (j > 0 && currentGrid[i][j - 1] === current) ||
          (j < GRID_SIZE - 1 && currentGrid[i][j + 1] === current)
        ) {
          return false
        }
      }
    }

    return true
  }, [])

  const checkWin = useCallback((currentGrid: Grid) => {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (currentGrid[i][j] === 2048) return true
      }
    }
    return false
  }, [])

  const move = useCallback(
    (direction: "left" | "right" | "up" | "down") => {
      if (gameOver || won) return

      let currentGrid = [...grid.map((row) => [...row])]
      let rotations = 0

      switch (direction) {
        case "right":
          rotations = 2
          break
        case "up":
          rotations = 3
          break
        case "down":
          rotations = 1
          break
      }

      for (let i = 0; i < rotations; i++) {
        currentGrid = rotateGrid(currentGrid)
      }

      const { newGrid, moved, score: moveScore } = moveLeft(currentGrid)

      for (let i = 0; i < (4 - rotations) % 4; i++) {
        currentGrid = rotateGrid(newGrid)
      }

      if (moved) {
        addRandomTile(currentGrid)
        setGrid(currentGrid)
        setScore((prev) => prev + moveScore)

        if (checkWin(currentGrid)) {
          setWon(true)
        } else if (checkGameOver(currentGrid)) {
          setGameOver(true)
        }
      }
    },
    [grid, gameOver, won, checkGameOver, checkWin],
  )

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case "ArrowLeft":
          move("left")
          break
        case "ArrowRight":
          move("right")
          break
        case "ArrowUp":
          move("up")
          break
        case "ArrowDown":
          move("down")
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [move])

  const getTileColor = (value: number) => {
    const colors: { [key: number]: string } = {
      0: "bg-slate-200 dark:bg-slate-700",
      2: "bg-slate-100 dark:bg-slate-600 text-slate-800 dark:text-slate-200",
      4: "bg-slate-200 dark:bg-slate-500 text-slate-800 dark:text-slate-100",
      8: "bg-orange-300 text-white",
      16: "bg-orange-400 text-white",
      32: "bg-orange-500 text-white",
      64: "bg-red-400 text-white",
      128: "bg-yellow-400 text-white",
      256: "bg-yellow-500 text-white",
      512: "bg-yellow-600 text-white",
      1024: "bg-green-500 text-white",
      2048: "bg-green-600 text-white",
    }
    return colors[value] || "bg-purple-600 text-white"
  }

  return (
    <Card className="glass border-0 shadow-sm max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">2048</CardTitle>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">Score: {score}</span>
          <Button size="sm" onClick={resetGame} className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="grid grid-cols-4 gap-2 p-4 bg-slate-300 dark:bg-slate-700 rounded-lg">
            {grid.flat().map((value, index) => (
              <div
                key={index}
                className={`
                  w-16 h-16 rounded flex items-center justify-center font-bold text-lg
                  ${getTileColor(value)}
                `}
              >
                {value !== 0 && value}
              </div>
            ))}
          </div>

          {(gameOver || won) && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
              <div className="text-center text-white">
                <h3 className="text-xl font-bold mb-2">{won ? "You Won!" : "Game Over!"}</h3>
                <p className="mb-4">Final Score: {score}</p>
                <Button onClick={resetGame} className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900">
                  <Play className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          Use arrow keys to move tiles. Combine tiles to reach 2048!
        </div>
      </CardContent>
    </Card>
  )
}
