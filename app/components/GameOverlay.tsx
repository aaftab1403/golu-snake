'use client'

import { GameState, Difficulty } from '@/app/types'

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

const cardStyle: React.CSSProperties = {
  textAlign: 'center',
}

const btnPrimary: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '12px 24px',
  background: 'linear-gradient(135deg, #00ff41, #00c853)',
  color: '#0a0a0a',
  fontWeight: 900,
  fontSize: '14px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  marginBottom: '12px',
  boxShadow: '0 0 20px rgba(0,255,65,0.5)',
}

const btnSecondary: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '12px 24px',
  background: 'rgba(255,255,255,0.07)',
  color: '#00d4ff',
  fontWeight: 700,
  fontSize: '14px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  border: '1px solid rgba(0,212,255,0.4)',
  borderRadius: '10px',
  cursor: 'pointer',
  marginBottom: '12px',
}

export const GameOverlay: React.FC<GameOverlayProps> = ({
  gameState, score, bestScore, difficulty,
  onPlayGame, onNewGame, onResume, onSelectDifficulty,
}) => {
  if (gameState === 'playing') return null

  if (gameState === 'paused') {
    return (
      <div className="overlay">
        <div className="overlay-card" style={{ ...cardStyle, border: '1px solid rgba(255,0,110,0.5)' }}>
          <p style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '4px', color: '#ff006e', marginBottom: '28px', textShadow: '0 0 20px rgba(255,0,110,0.6)' }}>
            PAUSED
          </p>
          <button style={btnPrimary} onClick={onResume}>▶ Resume Game</button>
          <button style={btnSecondary} onClick={onNewGame}>↺ New Game</button>
          <p style={{ color: '#475569', fontSize: '12px', marginTop: '8px' }}>Space or tap Resume</p>
        </div>
      </div>
    )
  }

  if (gameState === 'gameOver') {
    const isNew = score >= bestScore && score > 0
    return (
      <div className="overlay">
        <div className="overlay-card" style={{ ...cardStyle, border: '1px solid rgba(255,0,110,0.5)' }}>
          <p style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '4px', color: '#ff006e', marginBottom: '16px', textShadow: '0 0 20px rgba(255,0,110,0.6)' }}>
            GAME OVER
          </p>
          {isNew && (
            <div style={{ background: 'rgba(255,149,0,0.15)', border: '1px solid #ff9500', borderRadius: '8px', padding: '8px 16px', marginBottom: '16px' }}>
              <p style={{ color: '#ff9500', fontWeight: 700, fontSize: '13px', letterSpacing: '2px' }}>⭐ NEW HIGH SCORE! ⭐</p>
            </div>
          )}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ color: '#64748b', fontSize: '11px', letterSpacing: '3px', marginBottom: '4px' }}>FINAL SCORE</p>
            <p style={{ fontSize: '52px', fontWeight: 900, color: '#00ff41', textShadow: '0 0 20px rgba(0,255,65,0.7)', lineHeight: 1 }}>{score}</p>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ color: '#64748b', fontSize: '11px', letterSpacing: '3px', marginBottom: '4px' }}>BEST</p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: '#ff006e' }}>{bestScore}</p>
          </div>
          <button style={btnPrimary} onClick={onNewGame}>▶ Play Again</button>
        </div>
      </div>
    )
  }

  // Ready state
  return (
    <div className="overlay">
      <div className="overlay-card" style={{ ...cardStyle, border: '1px solid rgba(0,212,255,0.4)' }}>
        <p style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '4px', color: '#00d4ff', marginBottom: '6px', textShadow: '0 0 20px rgba(0,212,255,0.6)' }}>READY?</p>
        <p style={{ color: '#475569', fontSize: '12px', letterSpacing: '3px', marginBottom: '24px' }}>SELECT DIFFICULTY</p>

        {(['easy', 'normal', 'hard'] as Difficulty[]).map((level) => (
          <button
            key={level}
            onClick={() => { onSelectDifficulty(level); onPlayGame() }}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px 24px',
              background: difficulty === level
                ? 'linear-gradient(135deg, #00ff41, #00c853)'
                : 'rgba(255,255,255,0.07)',
              color: difficulty === level ? '#0a0a0a' : '#00d4ff',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              border: difficulty === level ? 'none' : '1px solid rgba(0,212,255,0.3)',
              borderRadius: '10px',
              cursor: 'pointer',
              marginBottom: '10px',
              boxShadow: difficulty === level ? '0 0 20px rgba(0,255,65,0.4)' : 'none',
            }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}

        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '14px', marginBottom: '20px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ color: '#00ff41', fontWeight: 700, fontSize: '12px', marginBottom: '6px' }}>CONTROLS</p>
          <p style={{ color: '#64748b', fontSize: '12px', lineHeight: '1.8' }}>
            Swipe the board, or tap the pad<br />
            Arrow keys or WASD also steer<br />
            Space pauses · Enter starts
          </p>
        </div>

        <button style={{ ...btnPrimary, fontSize: '16px', padding: '14px' }} onClick={() => { onSelectDifficulty(difficulty); onPlayGame() }}>
          ▶ Play Game
        </button>
      </div>
    </div>
  )
}
