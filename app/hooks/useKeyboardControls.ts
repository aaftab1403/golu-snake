import { useEffect, useRef } from 'react'
import { Direction, GameState } from '@/app/types'

interface KeyboardControlsOptions {
  onDirectionChange: (direction: Direction) => void
  onPause: () => void
  onResume: () => void
  onStart: () => void
  gameState: GameState
}

export const useKeyboardControls = ({
  onDirectionChange,
  onPause,
  onResume,
  onStart,
  gameState,
}: KeyboardControlsOptions) => {
  const keysRef = useRef<Set<string>>(new Set())
  const lastDirectionRef = useRef<Direction>('right')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      keysRef.current.add(key)

      // Prevent default browser behavior for game keys
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) {
        e.preventDefault()
      }

      // Direction changes
      if (key === 'arrowup' || key === 'w') {
        if (lastDirectionRef.current !== 'down') {
          onDirectionChange('up')
          lastDirectionRef.current = 'up'
        }
      } else if (key === 'arrowdown' || key === 's') {
        if (lastDirectionRef.current !== 'up') {
          onDirectionChange('down')
          lastDirectionRef.current = 'down'
        }
      } else if (key === 'arrowleft' || key === 'a') {
        if (lastDirectionRef.current !== 'right') {
          onDirectionChange('left')
          lastDirectionRef.current = 'left'
        }
      } else if (key === 'arrowright' || key === 'd') {
        if (lastDirectionRef.current !== 'left') {
          onDirectionChange('right')
          lastDirectionRef.current = 'right'
        }
      }

      // Game state changes
      if (key === ' ') {
        // Spacebar for pause/resume
        if (gameState === 'playing') {
          onPause()
        } else if (gameState === 'paused') {
          onResume()
        }
      } else if (key === 'enter') {
        // Enter to start
        if (gameState === 'ready') {
          onStart()
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      keysRef.current.delete(key)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [onDirectionChange, onPause, onResume, onStart, gameState])
}
