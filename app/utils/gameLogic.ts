import { Position, Direction } from '@/app/types'

export const getNextPosition = (
  current: Position,
  direction: Direction,
  gridSize: number
): Position => {
  const next = { ...current }

  switch (direction) {
    case 'up':
      next.y = (current.y - 1 + gridSize) % gridSize
      break
    case 'down':
      next.y = (current.y + 1) % gridSize
      break
    case 'left':
      next.x = (current.x - 1 + gridSize) % gridSize
      break
    case 'right':
      next.x = (current.x + 1) % gridSize
      break
  }

  return next
}

export const isOppositeDirection = (
  current: Direction,
  next: Direction
): boolean => {
  const opposites: Record<Direction, Direction> = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left',
  }
  return opposites[current] === next
}

export const getRandomPosition = (
  gridSize: number,
  snake: Position[]
): Position => {
  let position: Position
  let valid = false

  while (!valid) {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    }

    valid = !snake.some(
      (segment) => segment.x === position.x && segment.y === position.y
    )
  }

  return position!
}

export const checkSelfCollision = (snake: Position[]): boolean => {
  if (snake.length < 4) return false

  const head = snake[0]
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true
    }
  }

  return false
}

export const checkFoodCollision = (snake: Position[], food: Position): boolean => {
  return snake[0].x === food.x && snake[0].y === food.y
}

export const positionsEqual = (a: Position, b: Position): boolean => {
  return a.x === b.x && a.y === b.y
}
