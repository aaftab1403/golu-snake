'use client'

import { GameState } from '@/app/types'

interface GameHeaderProps {
  gameState: GameState
}

export const GameHeader: React.FC<GameHeaderProps> = ({ gameState }) => {
  const getStatusColor = () => {
    switch (gameState) {
      case 'ready':
        return 'text-neon-cyan'
      case 'playing':
        return 'text-neon-green animate-pulse'
      case 'paused':
        return 'text-neon-pink'
      case 'gameOver':
        return 'text-neon-orange'
      default:
        return 'text-neon-green'
    }
  }

  const getStatusLabel = () => {
    switch (gameState) {
      case 'ready':
        return 'READY'
      case 'playing':
        return 'PLAYING'
      case 'paused':
        return 'PAUSED'
      case 'gameOver':
        return 'GAME OVER'
      default:
        return 'READY'
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-widest neon-glow whitespace-nowrap">
          SNAKE
        </h1>
        <div
          className={`text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full border ${getStatusColor()} border-current whitespace-nowrap`}
          style={{
            borderWidth: '1px',
          }}
        >
          {getStatusLabel()}
        </div>
      </div>
      <p className="text-xs md:text-sm text-slate-400 tracking-wide uppercase">
        Classic Arcade Reimagined
      </p>
    </div>
  )
}
