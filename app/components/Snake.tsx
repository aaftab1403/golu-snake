'use client'

import { Position } from '@/app/types'

interface SnakeProps {
  snake: Position[]
  cellSize: number
}

export const Snake: React.FC<SnakeProps> = ({ snake, cellSize }) => {
  return (
    <>
      {snake.map((segment, index) => {
        const isHead = index === 0
        const x = segment.x * cellSize
        const y = segment.y * cellSize
        const padding = 3
        const size = cellSize - padding * 2

        return (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            className="absolute transition-all"
            style={{
              left: `${x + padding}px`,
              top: `${y + padding}px`,
              width: `${size}px`,
              height: `${size}px`,
            }}
          >
            {isHead ? (
              // Perfect circular head
              <div className="w-full h-full rounded-full relative" style={{
                background: 'radial-gradient(circle at 35% 35%, #00ff41 0%, #00d4ff 100%)',
                boxShadow: '0 0 15px rgba(0,255,65,0.9), 0 0 30px rgba(0,212,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.5), inset 2px 2px 4px rgba(255,255,255,0.2)',
              }}>
                {/* Shine */}
                <div style={{
                  position: 'absolute',
                  top: '12%',
                  left: '18%',
                  width: '28%',
                  height: '28%',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.7)',
                  boxShadow: '0 0 8px rgba(255,255,255,0.4)',
                }} />
                
                {/* Left eye */}
                <div style={{
                  position: 'absolute',
                  top: '35%',
                  left: '25%',
                  width: '12%',
                  height: '12%',
                  borderRadius: '50%',
                  background: '#000',
                }} >
                  <div style={{
                    position: 'absolute',
                    top: '25%',
                    left: '25%',
                    width: '50%',
                    height: '50%',
                    background: '#fff',
                    borderRadius: '50%',
                  }} />
                </div>

                {/* Right eye */}
                <div style={{
                  position: 'absolute',
                  top: '35%',
                  right: '25%',
                  width: '12%',
                  height: '12%',
                  borderRadius: '50%',
                  background: '#000',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '25%',
                    left: '25%',
                    width: '50%',
                    height: '50%',
                    background: '#fff',
                    borderRadius: '50%',
                  }} />
                </div>
              </div>
            ) : (
              // Body segment
              <div className="w-full h-full rounded-md" style={{
                background: `linear-gradient(135deg, rgba(0,255,65,${1-index*0.025}), rgba(0,212,255,${0.7-index*0.02}))`,
                boxShadow: `0 0 ${12-index*0.3}px rgba(0,255,65,${0.6-index*0.04}), 0 0 ${8-index*0.2}px rgba(0,212,255,${0.3-index*0.02}), inset -1px -1px 3px rgba(0,0,0,0.3)`,
              }} />
            )}
          </div>
        )
      })}
    </>
  )
}
