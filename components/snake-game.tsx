"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, Play, Pause } from "lucide-react"
import { saveScore } from "./arcade-leaderboard"

const GRID_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION = { x: 0, y: -1 }

export function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState(INITIAL_FOOD)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [gameRunning, setGameRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
    return newFood
  }, [])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(INITIAL_DIRECTION)
    setGameRunning(false)
    setScore(0)
    setGameOver(false)
  }

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      head.x += direction.x
      head.y += direction.y

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true)
        setGameRunning(false)
        saveScore("snake", score)
        return currentSnake
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setGameRunning(false)
        saveScore("snake", score)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10)
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameRunning, gameOver, generateFood])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning) return

      // Prevent default behavior for arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case "ArrowUp":
          if (direction.y !== 1) setDirection({ x: 0, y: -1 })
          break
        case "ArrowDown":
          if (direction.y !== -1) setDirection({ x: 0, y: 1 })
          break
        case "ArrowLeft":
          if (direction.x !== 1) setDirection({ x: -1, y: 0 })
          break
        case "ArrowRight":
          if (direction.x !== -1) setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [direction, gameRunning])

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150)
    return () => clearInterval(gameInterval)
  }, [moveSnake])

  const toggleGame = () => {
    if (gameOver) {
      resetGame()
    } else {
      setGameRunning(!gameRunning)
    }
  }

  return (
    <Card className="glass border-0 shadow-xl max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">Snake Game</CardTitle>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">Score: {score}</span>
          <div className="flex gap-2">
            <Button size="sm" onClick={toggleGame} className="bg-blue-600 hover:bg-blue-700">
              {gameOver ? (
                <RotateCcw className="w-4 h-4" />
              ) : gameRunning ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button size="sm" variant="outline" onClick={resetGame}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div
            className="grid gap-0 border-2 border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 mx-auto"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              width: "300px",
              height: "300px",
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE
              const y = Math.floor(index / GRID_SIZE)
              const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
              const isFood = food.x === x && food.y === y
              const isHead = snake[0]?.x === x && snake[0]?.y === y

              return (
                <div
                  key={index}
                  className={`
                    ${isSnake ? (isHead ? "bg-green-600" : "bg-green-400") : ""}
                    ${isFood ? "bg-red-500 rounded-full" : ""}
                    ${!isSnake && !isFood ? "bg-slate-50 dark:bg-slate-900" : ""}
                  `}
                  style={{ width: "15px", height: "15px" }}
                />
              )
            })}
          </div>
          {gameOver && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
              <div className="text-center text-white">
                <h3 className="text-xl font-bold mb-2">Game Over!</h3>
                <p className="mb-4">Final Score: {score}</p>
                <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700">
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          Use arrow keys to control the snake
        </div>
      </CardContent>
    </Card>
  )
}
