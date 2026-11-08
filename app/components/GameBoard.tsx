'use client'

import { useEffect, useRef, useState } from 'react'
import { Position, GAME_CONFIGS, Difficulty, Direction } from '@/app/types'
import { Snake } from './Snake'
import { Food } from './Food'

interface GameBoardProps {
  snake: Position[]
  food: Position
  difficulty: Difficulty
  direction: Direction
}

export const GameBoard: React.FC<GameBoardProps> = ({ snake, food, difficulty, direction }) => {
  const slotRef = useRef<HTMLDivElement>(null)
  const gridSize = GAME_CONFIGS[difficulty].gridSize
  const [side, setSide] = useState(0)

  useEffect(() => {
    const el = slotRef.current
    if (!el) return

    const measure = () => {
      const { width, height } = el.getBoundingClientRect()
      const cell = Math.floor(Math.min(width, height) / gridSize)
      if (cell < 4) return
      setSide(cell * gridSize)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [gridSize])

  const cellSize = side / gridSize

  return (
    <div ref={slotRef} className="board-slot">
      {side > 0 && (
        <div className="board" style={{ width: side, height: side }} aria-label="Game board">
          <div className="grid-overlay" style={{ backgroundSize: `${cellSize}px ${cellSize}px` }} />
          <Snake snake={snake} cellSize={cellSize} gridSize={gridSize} direction={direction} />
          <Food food={food} cellSize={cellSize} />
          <div className="board-ring" />
        </div>
      )}
    </div>
  )
}
