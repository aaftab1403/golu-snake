'use client'

import { useEffect, useState } from 'react'

interface ScoreBoardProps {
  currentScore: number
  bestScore: number
  gameTime: number
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ currentScore, bestScore, gameTime }) => {
  const [displayScore, setDisplayScore] = useState(0)

  // Animate score counter
  useEffect(() => {
    if (displayScore < currentScore) {
      const timer = setTimeout(() => {
        setDisplayScore(displayScore + 1)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [displayScore, currentScore])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full flex justify-center mb-6">
      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        {/* Current Score */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-3 md:p-4 border border-neon-green/30 shadow-lg">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Current</p>
          <p className="text-2xl md:text-3xl font-black neon-glow">
            {displayScore.toString().padStart(3, '0')}
          </p>
        </div>

        {/* Game Time */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-3 md:p-4 border border-neon-cyan/30 shadow-lg">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Time</p>
          <p className="text-2xl md:text-3xl font-black neon-glow-cyan">
            {formatTime(gameTime)}
          </p>
        </div>

        {/* Best Score */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-3 md:p-4 border border-neon-pink/30 shadow-lg">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Best</p>
          <p className="text-2xl md:text-3xl font-black text-neon-pink">
            {bestScore.toString().padStart(3, '0')}
          </p>
        </div>
      </div>
    </div>
  )
}
