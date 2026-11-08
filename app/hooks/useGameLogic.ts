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
  direction: Direction
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

const createInitialSnake = (gridSize: number): Position[] => {
  const y = Math.floor(gridSize / 2)
  const x = Math.max(3, y)
  return [
    { x, y },
    { x: x - 1, y },
    { x: x - 2, y },
    { x: x - 3, y },
  ]
}

export const useGameLogic = (): [GameLogicState, GameLogicActions] => {
  const initialSnake = createInitialSnake(GAME_CONFIGS.normal.gridSize)
  const [snake, setSnake] = useState<Position[]>(initialSnake)
  const [food, setFood] = useState<Position>({ x: 15, y: 10 })
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState<GameState>('ready')
  const [difficulty, setDifficultyState] = useState<Difficulty>('normal')
  const [bestScore, setBestScore] = useState(0)
  const [gameTime, setGameTime] = useState(0)
  const [direction, setDirection] = useState<Direction>('right')

  const directionRef = useRef<Direction>('right')
  const queueRef = useRef<Direction[]>([])
  const snakeRef = useRef(snake)
  const foodRef = useRef(food)
  const scoreRef = useRef(score)
  const bestRef = useRef(bestScore)
  const stateRef = useRef(gameState)
  const difficultyRef = useRef(difficulty)
  const lastUpdateRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const epochRef = useRef(0)

  useEffect(() => { snakeRef.current = snake }, [snake])
  useEffect(() => { foodRef.current = food }, [food])
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { bestRef.current = bestScore }, [bestScore])
  useEffect(() => { stateRef.current = gameState }, [gameState])
  useEffect(() => { difficultyRef.current = difficulty }, [difficulty])

  const loop = useCallback((timestamp: number) => {
    const epoch = epochRef.current
    if (stateRef.current !== 'playing' || epoch !== epochRef.current) return

    const config = GAME_CONFIGS[difficultyRef.current]
    const scoreNow = scoreRef.current
    const speedIncrease = Math.floor(scoreNow / config.speedInterval) * config.speedIncrement
    const speed = Math.max(config.initialSpeed - speedIncrease, 55)

    if (timestamp - lastUpdateRef.current >= speed) {
      lastUpdateRef.current = timestamp

      const queued = queueRef.current.shift()
      if (queued && !isOppositeDirection(directionRef.current, queued)) {
        directionRef.current = queued
        setDirection(queued)
      }

      const currentSnake = snakeRef.current
      const currentFood = foodRef.current
      const head = getNextPosition(currentSnake[0], directionRef.current, config.gridSize)
      const ate = checkFoodCollision([head], currentFood)
      const body = ate ? currentSnake : currentSnake.slice(0, -1)

      if (epochRef.current !== epoch) return

      if (checkSelfCollision(head, body)) {
        stateRef.current = 'gameOver'
        setGameState('gameOver')
        soundManager.playGameOver()
        return
      }

      let nextSnake = [head, ...currentSnake]
      if (ate) {
        const nextScore = scoreNow + 1
        scoreRef.current = nextScore
        setScore(nextScore)
        const nextFood = getRandomPosition(config.gridSize, nextSnake)
        foodRef.current = nextFood
        setFood(nextFood)
        soundManager.playEatFood()
        if (nextScore > bestRef.current) {
          bestRef.current = nextScore
          setBestScore(nextScore)
          if (typeof window !== 'undefined') {
            localStorage.setItem('snakeBestScore', nextScore.toString())
          }
        }
      } else {
        nextSnake = nextSnake.slice(0, -1)
      }

      if (epochRef.current !== epoch) return
      snakeRef.current = nextSnake
      setSnake(nextSnake)
    }

    rafRef.current = requestAnimationFrame(loop)
  }, [])

  useEffect(() => {
    if (gameState !== 'playing') return
    lastUpdateRef.current = performance.now()
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [gameState, loop])

  useEffect(() => {
    if (gameState !== 'playing') return
    const timer = setInterval(() => setGameTime((prev) => prev + 1), 1000)
    return () => clearInterval(timer)
  }, [gameState])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem('snakeBestScore')
    if (saved) setBestScore(parseInt(saved, 10) || 0)
  }, [])

  const initialize = useCallback((selectedDifficulty: Difficulty) => {
    epochRef.current += 1
    const config = GAME_CONFIGS[selectedDifficulty]
    const body = createInitialSnake(config.gridSize)
    const nextFood = getRandomPosition(config.gridSize, body)

    difficultyRef.current = selectedDifficulty
    snakeRef.current = body
    foodRef.current = nextFood
    scoreRef.current = 0
    stateRef.current = 'ready'
    directionRef.current = 'right'
    queueRef.current = []

    setDifficultyState(selectedDifficulty)
    setSnake(body)
    setFood(nextFood)
    setScore(0)
    setGameTime(0)
    setGameState('ready')
    setDirection('right')
  }, [])

  const startGame = useCallback(() => {
    stateRef.current = 'playing'
    setGameState('playing')
    lastUpdateRef.current = performance.now()
  }, [])

  const pauseGame = useCallback(() => {
    if (stateRef.current !== 'playing') return
    stateRef.current = 'paused'
    setGameState('paused')
  }, [])

  const resumeGame = useCallback(() => {
    if (stateRef.current !== 'paused') return
    stateRef.current = 'playing'
    setGameState('playing')
    lastUpdateRef.current = performance.now()
  }, [])

  const restartGame = useCallback(() => {
    initialize(difficultyRef.current)
  }, [initialize])

  const changeDirection = useCallback((next: Direction) => {
    const queue = queueRef.current
    const last = queue.length > 0 ? queue[queue.length - 1] : directionRef.current
    if (next === last || isOppositeDirection(last, next)) return
    if (queue.length >= 2) queue.shift()
    queue.push(next)
  }, [])

  const setDifficulty = useCallback((nextDifficulty: Difficulty) => {
    initialize(nextDifficulty)
  }, [initialize])

  return [
    { snake, food, score, gameState, difficulty, bestScore, gameTime, direction },
    { initialize, startGame, pauseGame, resumeGame, restartGame, changeDirection, setDifficulty },
  ]
}
