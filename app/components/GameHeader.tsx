'use client'

import { GameState } from '@/app/types'

interface GameHeaderProps {
  gameState: GameState
}

const statusColors: Record<GameState, string> = {
  ready: '#00d4ff',
  playing: '#00ff41',
  paused: '#ff006e',
  gameOver: '#ff9500',
}

const labels: Record<GameState, string> = {
  ready: 'READY',
  playing: 'PLAYING',
  paused: 'PAUSED',
  gameOver: 'GAME OVER',
}

export const GameHeader: React.FC<GameHeaderProps> = ({ gameState }) => {
  const color = statusColors[gameState]

  return (
    <div className="game-header">
      <div className="game-title-row">
        <h1 className="game-title">SNAKE</h1>
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '2px',
          color,
          border: `1px solid ${color}`,
          borderRadius: '999px',
          padding: '3px 10px',
          textShadow: `0 0 10px ${color}`,
          whiteSpace: 'nowrap',
        }}>
          {labels[gameState]}
        </span>
      </div>
      <p className="subtitle">Classic Arcade Reimagined</p>
    </div>
  )
}
