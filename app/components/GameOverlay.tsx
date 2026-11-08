'use client'

import { GameState, Difficulty } from '@/app/types'
import { ChevronRight } from 'lucide-react'

interface GameOverlayProps {
  gameState: GameState
  score: number
  bestScore: number
  difficulty: Difficulty
  onPlayGame: () => void
  onNewGame: () => void
  onResume: () => void
  onSelectDifficulty: (difficulty: Difficulty) => void
}

export const GameOverlay: React.FC<GameOverlayProps> = ({
  gameState,
  score,
  bestScore,
  difficulty,
  onPlayGame,
  onNewGame,
  onResume,
  onSelectDifficulty,
}) => {
  if (gameState === 'playing' || gameState === 'paused') {
    // Paused overlay
    if (gameState === 'paused') {
      return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg border border-neon-pink/50 p-8 text-center max-w-sm shadow-2xl animate-scaleIn">
            <p className="text-neon-pink text-5xl font-black mb-6 uppercase tracking-widest">
              Paused
            </p>
            <div className="space-y-4">
              <button
                onClick={onResume}
                className="w-full px-6 py-3 bg-gradient-to-r from-neon-green to-emerald-500 text-slate-950 font-bold rounded-lg hover:shadow-neon transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm"
              >
                Resume Game
              </button>
              <button
                onClick={onNewGame}
                className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-neon-cyan font-bold rounded-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm border border-neon-cyan/30"
              >
                New Game
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-6">Press SPACEBAR to resume or ENTER to start a new game</p>
          </div>
        </div>
      )
    }
    return null
  }

  if (gameState === 'gameOver') {
    const isNewHighScore = score > bestScore && score > 0

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg border border-neon-pink/50 p-8 text-center max-w-sm shadow-2xl animate-scaleIn">
          <p className="text-neon-pink text-5xl font-black mb-4 uppercase tracking-widest">
            Game Over
          </p>

          {isNewHighScore && (
            <div className="mb-6 p-3 bg-gradient-to-r from-neon-orange/20 to-neon-pink/20 rounded-lg border border-neon-orange animate-pulse">
              <p className="text-neon-orange text-sm font-bold uppercase tracking-widest">
                ⭐ NEW HIGH SCORE! ⭐
              </p>
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div className="text-center">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Final Score</p>
              <p className="text-4xl font-black neon-glow">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Best Score</p>
              <p className="text-2xl font-black text-neon-pink">{bestScore}</p>
            </div>
          </div>

          <button
            onClick={onNewGame}
            className="w-full px-6 py-3 bg-gradient-to-r from-neon-green to-emerald-500 text-slate-950 font-bold rounded-lg hover:shadow-neon transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            Play Again
            <ChevronRight size={18} />
          </button>

          <p className="text-xs text-slate-500 mt-4">Press ENTER to play again</p>
        </div>
      </div>
    )
  }

  // Ready state - difficulty selection
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg border border-neon-cyan/50 p-8 text-center max-w-md shadow-2xl animate-scaleIn">
        <p className="text-neon-cyan text-4xl font-black mb-2 uppercase tracking-widest">
          Ready?
        </p>
        <p className="text-slate-400 text-sm mb-8 uppercase tracking-wide">
          Select Your Difficulty
        </p>

        <div className="space-y-3 mb-6">
          {(['easy', 'normal', 'hard'] as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => {
                onSelectDifficulty(level)
                onPlayGame()
              }}
              className={`w-full px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-all hover:scale-105 active:scale-95 ${
                difficulty === level
                  ? 'bg-gradient-to-r from-neon-cyan to-blue-500 text-slate-950 shadow-neon-cyan'
                  : 'bg-slate-800 hover:bg-slate-700 text-neon-cyan border border-neon-cyan/30'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-slate-950 rounded-lg p-4 mb-6 text-left text-xs text-slate-400 space-y-2 border border-slate-800">
          <p className="text-neon-green font-semibold">Controls:</p>
          <p>⬆️⬇️⬅️➡️ or WASD - Move</p>
          <p>SPACEBAR - Pause/Resume</p>
          <p>ENTER - Start Game</p>
        </div>

        <button
          onClick={() => {
            onSelectDifficulty(difficulty)
            onPlayGame()
          }}
          className="w-full px-6 py-4 bg-gradient-to-r from-neon-green to-emerald-500 text-slate-950 font-black rounded-lg hover:shadow-neon transition-all hover:scale-105 active:scale-95 uppercase tracking-wider flex items-center justify-center gap-2 text-lg"
        >
          Play Game
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
