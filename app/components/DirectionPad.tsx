'use client'

import { Direction } from '@/app/types'

interface DirectionPadProps {
  onDirectionChange: (direction: Direction) => void
  hidden?: boolean
}

const ARROWS: { dir: Direction; label: string; column: number; row: number }[] = [
  { dir: 'up', label: 'Up', column: 2, row: 1 },
  { dir: 'left', label: 'Left', column: 1, row: 2 },
  { dir: 'right', label: 'Right', column: 3, row: 2 },
  { dir: 'down', label: 'Down', column: 2, row: 3 },
]

export const DirectionPad: React.FC<DirectionPadProps> = ({ onDirectionChange, hidden = false }) => {
  if (hidden) return null

  return (
    <div className="dpad" data-control>
      {ARROWS.map(({ dir, label, column, row }) => (
        <button
          key={dir}
          type="button"
          aria-label={label}
          style={{ gridColumn: column, gridRow: row }}
          onPointerDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onDirectionChange(dir)
          }}
        >
          {dir === 'up' ? '↑' : dir === 'down' ? '↓' : dir === 'left' ? '←' : '→'}
        </button>
      ))}
      <div className="dpad-dot" style={{ gridColumn: 2, gridRow: 2 }} />
    </div>
  )
}
