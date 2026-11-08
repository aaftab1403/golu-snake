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
  if (snake.length >= gridSize * gridSize) return { x: 0, y: 0 }

  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`))
  let position: Position = { x: 0, y: 0 }
  let guard = 0

  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    }
    guard += 1
  } while (occupied.has(`${position.x},${position.y}`) && guard < gridSize * gridSize * 2)

  return position
}

export const checkSelfCollision = (head: Position, body: Position[]): boolean => {
  return body.some((segment) => segment.x === head.x && segment.y === head.y)
}

export const checkFoodCollision = (snake: Position[], food: Position): boolean => {
  return snake[0].x === food.x && snake[0].y === food.y
}

export const positionsEqual = (a: Position, b: Position): boolean => {
  return a.x === b.x && a.y === b.y
}
