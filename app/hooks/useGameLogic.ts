import { useState, useRef, useEffect, useCallback } from 'react'
import { Position, Direction, GameState, Difficulty, GAME_CONFIGS } from '@/app/types'
import {
  getNextPosition,
  isOppositeDirection,
  getRandomPosition,
  checkSelfCollision,
  checkFoodCollision,
} from '@/app/utils/gameLogic'
import { soundManager } from '@/app/utils/sounds'

interface GameLogicState {
  snake: Position[]
  food: Position
  score: number
  gameState: GameState
  difficulty: Difficulty
  bestScore: number
  gameTime: number
}

interface GameLogicActions {
  initialize: (difficulty: Difficulty) => void
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  restartGame: () => void
  changeDirection: (direction: Direction) => void
  setDifficulty: (difficulty: Difficulty) => void
}

export const useGameLogic = (): [GameLogicState, GameLogicActions] => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState<GameState>('ready')
  const [difficulty, setDifficultyState] = useState<Difficulty>('normal')
  const [bestScore, setBestScore] = useState(0)
  const [gameTime, setGameTime] = useState(0)

  const directionRef = useRef<Direction>('right')
  const nextDirectionRef = useRef<Direction>('right')
  const lastUpdateRef = useRef(0)
  const gameLoopRef = useRef<number | null>(null)
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null)

  const config = GAME_CONFIGS[difficulty]

  // Calculate current speed based on score
  const getCurrentSpeed = useCallback(() => {
    const speedIncrease = Math.floor(score / config.speedInterval) * config.speedIncrement
    return Math.max(config.initialSpeed - speedIncrease, 20)
  }, [score, config])

  // Initialize best score from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('snakeBestScore')
      if (saved) {
        setBestScore(parseInt(saved, 10))
      }
    }
  }, [])

  // Game loop
  const gameLoop = useCallback((timestamp: number) => {
    if (gameState !== 'playing') {
      gameLoopRef.current = null
      return
    }

    const speed = getCurrentSpeed()
    const timeSinceLastUpdate = timestamp - lastUpdateRef.current

    if (timeSinceLastUpdate >= speed) {
      lastUpdateRef.current = timestamp

      // Update direction
      if (!isOppositeDirection(directionRef.current, nextDirectionRef.current)) {
        directionRef.current = nextDirectionRef.current
      }

      // Calculate next position
      const newHead = getNextPosition(snake[0], directionRef.current, config.gridSize)

      // Check self collision
      if (checkSelfCollision([newHead, ...snake])) {
        setGameState('gameOver')
        soundManager.playGameOver()
        gameLoopRef.current = null
        return
      }

      // Check food collision
      let newSnake = [newHead, ...snake]
      let newFood = food
      let newScore = score

      if (checkFoodCollision([newHead], food)) {
        newScore = score + 1
        setScore(newScore)
        newFood = getRandomPosition(config.gridSize, newSnake)
        setFood(newFood)
        soundManager.playEatFood()

        // Check if new high score
        if (newScore > bestScore) {
          setBestScore(newScore)
          if (typeof window !== 'undefined') {
            localStorage.setItem('snakeBestScore', newScore.toString())
          }
        }
      } else {
        newSnake = newSnake.slice(0, -1)
      }

      setSnake(newSnake)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)
  }, [gameState, snake, food, score, config, bestScore, getCurrentSpeed])

  // Start game loop
  useEffect(() => {
    if (gameState === 'playing') {
      lastUpdateRef.current = performance.now()
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }
  }, [gameState, gameLoop])

  // Game timer
  useEffect(() => {
    if (gameState === 'playing') {
      gameTimerRef.current = setInterval(() => {
        setGameTime((prev) => prev + 1)
      }, 1000)
    } else {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current)
        gameTimerRef.current = null
      }
    }

    return () => {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current)
      }
    }
  }, [gameState])

  const initialize = useCallback((selectedDifficulty: Difficulty) => {
    setDifficultyState(selectedDifficulty)
    setSnake([{ x: 10, y: 10 }])
    setFood(getRandomPosition(GAME_CONFIGS[selectedDifficulty].gridSize, [{ x: 10, y: 10 }]))
    setScore(0)
    setGameTime(0)
    setGameState('ready')
    directionRef.current = 'right'
    nextDirectionRef.current = 'right'
  }, [])

  const startGame = useCallback(() => {
    setGameState('playing')
    lastUpdateRef.current = performance.now()
  }, [])

  const pauseGame = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused')
    }
  }, [gameState])

  const resumeGame = useCallback(() => {
    if (gameState === 'paused') {
      setGameState('playing')
      lastUpdateRef.current = performance.now()
    }
  }, [gameState])

  const restartGame = useCallback(() => {
    initialize(difficulty)
  }, [difficulty, initialize])

  const changeDirection = useCallback((direction: Direction) => {
    nextDirectionRef.current = direction
  }, [])

  const setDifficulty = useCallback((newDifficulty: Difficulty) => {
    initialize(newDifficulty)
  }, [initialize])

  return [
    {
      snake,
      food,
      score,
      gameState,
      difficulty,
      bestScore,
      gameTime,
    },
    {
      initialize,
      startGame,
      pauseGame,
      resumeGame,
      restartGame,
      changeDirection,
      setDifficulty,
    },
  ]
}
