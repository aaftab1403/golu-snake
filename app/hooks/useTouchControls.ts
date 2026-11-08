import { useEffect, useRef } from 'react'
import { Direction, GameState } from '@/app/types'

interface TouchControlsOptions {
  onDirectionChange: (direction: Direction) => void
  gameState: GameState
  enabled?: boolean
}

export const useTouchControls = ({
  onDirectionChange,
  gameState,
  enabled = true,
}: TouchControlsOptions) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const lastDirectionRef = useRef<Direction>('right')

  useEffect(() => {
    if (!enabled || gameState !== 'playing') return

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return

      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - touchStartRef.current.x
      const deltaY = touch.clientY - touchStartRef.current.y

      // Minimum swipe distance
      const minDistance = 30

      let newDirection: Direction | null = null

      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > minDistance && lastDirectionRef.current !== 'left') {
          newDirection = 'right'
        } else if (deltaX < -minDistance && lastDirectionRef.current !== 'right') {
          newDirection = 'left'
        }
      } else {
        // Vertical swipe
        if (deltaY > minDistance && lastDirectionRef.current !== 'up') {
          newDirection = 'down'
        } else if (deltaY < -minDistance && lastDirectionRef.current !== 'down') {
          newDirection = 'up'
        }
      }

      if (newDirection) {
        onDirectionChange(newDirection)
        lastDirectionRef.current = newDirection
      }

      touchStartRef.current = null
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onDirectionChange, gameState, enabled])
}
