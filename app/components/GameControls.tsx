'use client'

import { GameState, Difficulty } from '@/app/types'
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react'

interface GameControlsProps {
  gameState: GameState
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onRestart: () => void
  onSoundToggle?: () => void
  soundEnabled?: boolean
  difficulty: Difficulty
  onDifficultyChange?: (difficulty: Difficulty) => void
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  onStart,
  onPause,
  onResume,
  onRestart,
  onSoundToggle,
  soundEnabled = true,
  difficulty,
  onDifficultyChange,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-8 max-w-2xl mx-auto">
      {/* Main Controls */}
      <div className="flex gap-3 flex-wrap justify-center">
        {gameState === 'ready' && (
          <button
            onClick={onStart}
            className="px-6 py-2 bg-gradient-to-r from-neon-green to-emerald-500 text-slate-950 font-bold rounded-lg hover:shadow-neon transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm flex items-center gap-2"
          >
            <Play size={18} />
            Play Game
          </button>
        )}

        {gameState === 'playing' && (
          <button
            onClick={onPause}
            className="px-6 py-2 bg-neon-pink text-slate-950 font-bold rounded-lg hover:shadow-neon-pink transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm flex items-center gap-2"
          >
            <Pause size={18} />
            Pause
          </button>
        )}

        {gameState === 'paused' && (
          <>
            <button
              onClick={onResume}
              className="px-6 py-2 bg-gradient-to-r from-neon-green to-emerald-500 text-slate-950 font-bold rounded-lg hover:shadow-neon transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm flex items-center gap-2"
            >
              <Play size={18} />
              Resume
            </button>
          </>
        )}

        {(gameState === 'paused' || gameState === 'gameOver') && (
          <button
            onClick={onRestart}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-neon-cyan font-bold rounded-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm flex items-center gap-2 border border-neon-cyan/30"
          >
            <RotateCcw size={18} />
            New Game
          </button>
        )}

        {/* Sound Toggle */}
        {onSoundToggle && (
          <button
            onClick={onSoundToggle}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-neon-purple font-bold rounded-lg transition-all active:scale-95 border border-neon-purple/30 flex items-center gap-2"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        )}
      </div>

      {/* Difficulty Display */}
      {gameState !== 'playing' && onDifficultyChange && (
        <div className="flex gap-2 justify-center flex-wrap">
          {(['easy', 'normal', 'hard'] as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => onDifficultyChange(level)}
              className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-xs transition-all active:scale-95 ${
                difficulty === level
                  ? 'bg-gradient-to-r from-neon-green to-emerald-500 text-slate-950 shadow-neon'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      )}

      {/* Keyboard Hints */}
      <div className="hidden md:flex gap-4 text-xs text-slate-500 text-center justify-center">
        <span>⬆️⬇️⬅️➡️ or WASD Move</span>
        <span>•</span>
        <span>SPACEBAR Pause</span>
        <span>•</span>
        <span>ENTER Start</span>
      </div>
    </div>
  )
}
