export type GameState = 'ready' | 'playing' | 'paused' | 'gameOver'
export type Difficulty = 'easy' | 'normal' | 'hard'
export type Direction = 'up' | 'down' | 'left' | 'right'

export interface Position {
  x: number
  y: number
}

export interface GameConfig {
  gridSize: number
  cellSize: number
  initialSpeed: number
  speedIncrement: number
  speedInterval: number
}

export const GAME_CONFIGS: Record<Difficulty, GameConfig> = {
  easy: {
    gridSize: 20,
    cellSize: 30,
    initialSpeed: 100,
    speedIncrement: 2,
    speedInterval: 50,
  },
  normal: {
    gridSize: 20,
    cellSize: 30,
    initialSpeed: 80,
    speedIncrement: 3,
    speedInterval: 40,
  },
  hard: {
    gridSize: 20,
    cellSize: 30,
    initialSpeed: 60,
    speedIncrement: 4,
    speedInterval: 30,
  },
}
