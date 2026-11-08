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
  const startRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!enabled || gameState !== 'playing') return

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return
      const target = event.target as Element | null
      if (target?.closest('[data-control]')) return
      startRef.current = { x: event.clientX, y: event.clientY }
    }

    const onPointerUp = (event: PointerEvent) => {
      const start = startRef.current
      startRef.current = null
      if (!start || event.pointerType === 'mouse') return

      const dx = event.clientX - start.x
      const dy = event.clientY - start.y
      if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return

      if (Math.abs(dx) > Math.abs(dy)) onDirectionChange(dx > 0 ? 'right' : 'left')
      else onDirectionChange(dy > 0 ? 'down' : 'up')
    }

    const onPointerCancel = () => {
      startRef.current = null
    }

    const onTouchMove = (event: TouchEvent) => {
      if (startRef.current) event.preventDefault()
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerCancel)
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerCancel)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [onDirectionChange, gameState, enabled])
}
