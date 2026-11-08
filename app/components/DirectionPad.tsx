'use client'

import { Direction } from '@/app/types'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface DirectionPadProps {
  onDirectionChange: (direction: Direction) => void
  hidden?: boolean
}

export const DirectionPad: React.FC<DirectionPadProps> = ({ onDirectionChange, hidden = false }) => {
  if (hidden) return null

  const handleTouchStart = (direction: Direction, e: React.TouchEvent) => {
    e.preventDefault()
    onDirectionChange(direction)
  }

  return (
    <div className="flex md:hidden justify-center mt-6">
      <div className="grid grid-cols-3 gap-2 w-32 h-32 bg-slate-900/50 rounded-2xl p-3 border border-neon-green/30">
        {/* Up */}
        <div className="col-start-2 flex justify-center items-start">
          <button
            onTouchStart={(e) => handleTouchStart('up', e)}
            onClick={() => onDirectionChange('up')}
            className="p-3 bg-slate-800 hover:bg-neon-green/20 text-neon-green rounded-lg transition-all active:scale-90"
            aria-label="Up"
          >
            <ChevronUp size={24} />
          </button>
        </div>

        {/* Left */}
        <div className="col-start-1 row-start-2 flex justify-start items-center">
          <button
            onTouchStart={(e) => handleTouchStart('left', e)}
            onClick={() => onDirectionChange('left')}
            className="p-3 bg-slate-800 hover:bg-neon-green/20 text-neon-green rounded-lg transition-all active:scale-90"
            aria-label="Left"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Center - Down */}
        <div className="col-start-2 row-start-2 flex justify-center items-center">
          <button
            onTouchStart={(e) => handleTouchStart('down', e)}
            onClick={() => onDirectionChange('down')}
            className="p-3 bg-slate-800 hover:bg-neon-green/20 text-neon-green rounded-lg transition-all active:scale-90"
            aria-label="Down"
          >
            <ChevronDown size={24} />
          </button>
        </div>

        {/* Right */}
        <div className="col-start-3 row-start-2 flex justify-end items-center">
          <button
            onTouchStart={(e) => handleTouchStart('right', e)}
            onClick={() => onDirectionChange('right')}
            className="p-3 bg-slate-800 hover:bg-neon-green/20 text-neon-green rounded-lg transition-all active:scale-90"
            aria-label="Right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Down - bottom center */}
        <div className="col-start-2 row-start-3 flex justify-center items-end">
          <div className="text-slate-600 text-xs text-center">TOUCH</div>
        </div>
      </div>
    </div>
  )
}
