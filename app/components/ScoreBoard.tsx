'use client'

import { useEffect, useState } from 'react'

interface ScoreBoardProps {
  currentScore: number
  bestScore: number
  gameTime: number
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ currentScore, bestScore, gameTime }) => {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    if (displayScore < currentScore) {
      const timer = setTimeout(() => setDisplayScore((prev) => prev + 1), 40)
      return () => clearTimeout(timer)
    }
    if (displayScore > currentScore) setDisplayScore(0)
  }, [displayScore, currentScore])

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  return (
    <div className="scoreboard">
      <div className="score-card" style={{ border: '1px solid rgba(0,255,65,0.3)' }}>
        <p className="score-label">Current</p>
        <p className="score-value" style={{ color: '#00ff41', textShadow: '0 0 15px rgba(0,255,65,0.7)' }}>
          {String(displayScore).padStart(3, '0')}
        </p>
      </div>
      <div className="score-card" style={{ border: '1px solid rgba(0,212,255,0.3)' }}>
        <p className="score-label">Time</p>
        <p className="score-value" style={{ color: '#00d4ff', textShadow: '0 0 15px rgba(0,212,255,0.7)' }}>
          {formatTime(gameTime)}
        </p>
      </div>
      <div className="score-card" style={{ border: '1px solid rgba(255,0,110,0.3)' }}>
        <p className="score-label">Best</p>
        <p className="score-value" style={{ color: '#ff006e', textShadow: '0 0 15px rgba(255,0,110,0.7)' }}>
          {String(bestScore).padStart(3, '0')}
        </p>
      </div>
    </div>
  )
}
