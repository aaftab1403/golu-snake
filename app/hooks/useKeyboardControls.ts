import { useEffect } from 'react'
import { Direction, GameState } from '@/app/types'

interface KeyboardControlsOptions {
  onDirectionChange: (direction: Direction) => void
  onPause: () => void
  onResume: () => void
  onStart: () => void
  onRestart: () => void
  gameState: GameState
}

const KEY_TO_DIRECTION: Record<string, Direction> = {
  arrowup: 'up',
  w: 'up',
  arrowdown: 'down',
  s: 'down',
  arrowleft: 'left',
  a: 'left',
  arrowright: 'right',
  d: 'right',
}

export const useKeyboardControls = ({
  onDirectionChange,
  onPause,
  onResume,
  onStart,
  onRestart,
  gameState,
}: KeyboardControlsOptions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) {
        event.preventDefault()
      }

      const direction = KEY_TO_DIRECTION[key]
      if (direction) onDirectionChange(direction)

      if (key === ' ') {
        if (gameState === 'playing') onPause()
        else if (gameState === 'paused') onResume()
      } else if (key === 'enter') {
        if (gameState === 'ready') onStart()
        else if (gameState === 'gameOver') onRestart()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onDirectionChange, onPause, onResume, onStart, onRestart, gameState])
}
