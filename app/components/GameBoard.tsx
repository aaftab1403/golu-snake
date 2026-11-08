'use client'

import { Position, GAME_CONFIGS, Difficulty } from '@/app/types'
import { Snake } from './Snake'
import { Food } from './Food'

interface GameBoardProps {
  snake: Position[]
  food: Position
  difficulty: Difficulty
}

export const GameBoard: React.FC<GameBoardProps> = ({ snake, food, difficulty }) => {
  const config = GAME_CONFIGS[difficulty]
  const boardSize = config.gridSize * config.cellSize

  return (
    <div className="w-full flex justify-center mb-8">
      <div
        className="relative bg-slate-950 rounded-lg border-2 border-neon-green/50 shadow-2xl overflow-hidden"
        style={{
          width: boardSize,
          height: boardSize,
          boxShadow: '0 0 30px rgb(0 255 65 / 0.2), inset 0 0 30px rgb(0 255 65 / 0.05)',
        }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 255, 65, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.3) 1px, transparent 1px)`,
            backgroundSize: `${config.cellSize}px ${config.cellSize}px`,
          }}
        />

        {/* Game elements */}
        <div className="relative w-full h-full">
          <Snake snake={snake} cellSize={config.cellSize} />
          <Food food={food} cellSize={config.cellSize} />
        </div>
      </div>
    </div>
  )
}
