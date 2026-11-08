'use client'

import { GameState, Difficulty } from '@/app/types'

interface GameControlsProps {
  gameState: GameState
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onRestart: () => void
  onSoundToggle?: () => void
  soundEnabled?: boolean
  difficulty: Difficulty
  onDifficultyChange?: (d: Difficulty) => void
}

const btn = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 16px',
  fontWeight: 700,
  fontSize: '13px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  ...extra,
})

export const GameControls: React.FC<GameControlsProps> = ({
  gameState, onStart, onPause, onResume, onRestart, onSoundToggle, soundEnabled = true, difficulty, onDifficultyChange,
}) => {
  return (
    <div className="controls" data-control>
      <div className="control-row">
        {gameState === 'ready' && (
          <button type="button" className="ctrl-btn" onClick={onStart} style={btn({ background: 'linear-gradient(135deg,#00ff41,#00c853)', color: '#050505', boxShadow: '0 0 20px rgba(0,255,65,0.5)' })}>
            Play
          </button>
        )}
        {gameState === 'playing' && (
          <button type="button" className="ctrl-btn" onClick={onPause} style={btn({ background: 'linear-gradient(135deg,#ff006e,#c2185b)', color: '#fff', boxShadow: '0 0 20px rgba(255,0,110,0.5)' })}>
            Pause
          </button>
        )}
        {gameState === 'paused' && (
          <button type="button" className="ctrl-btn" onClick={onResume} style={btn({ background: 'linear-gradient(135deg,#00ff41,#00c853)', color: '#050505', boxShadow: '0 0 20px rgba(0,255,65,0.5)' })}>
            Resume
          </button>
        )}
        {(gameState === 'paused' || gameState === 'gameOver') && (
          <button type="button" className="ctrl-btn" onClick={onRestart} style={btn({ background: 'rgba(255,255,255,0.07)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.4)' })}>
            New Game
          </button>
        )}
        {onSoundToggle && (
          <button type="button" className="ctrl-btn" onClick={onSoundToggle} style={btn({ background: 'rgba(255,255,255,0.07)', color: '#b500ff', border: '1px solid rgba(181,0,255,0.4)', padding: '10px 14px' })} title={soundEnabled ? 'Mute' : 'Unmute'}>
            {soundEnabled ? 'Sound on' : 'Sound off'}
          </button>
        )}
      </div>

      {gameState !== 'playing' && onDifficultyChange && (
        <div className="diff-row">
          {(['easy', 'normal', 'hard'] as Difficulty[]).map((level) => (
            <button
              key={level}
              type="button"
              className="ctrl-btn"
              onClick={() => onDifficultyChange(level)}
              style={btn(
                difficulty === level
                  ? { background: 'linear-gradient(135deg,#00ff41,#00c853)', color: '#050505', boxShadow: '0 0 14px rgba(0,255,65,0.4)', fontSize: '12px', padding: '8px 16px' }
                  : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', padding: '8px 16px' }
              )}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      )}

      <p className="key-hints">Swipe or use the pad. Arrows or WASD also steer. Space pauses.</p>
    </div>
  )
}
