'use client'

import { Position } from '@/app/types'

interface FoodProps {
  food: Position
  cellSize: number
}

export const Food: React.FC<FoodProps> = ({ food, cellSize }) => {
  const x = food.x * cellSize
  const y = food.y * cellSize
  const padding = 2
  const segmentSize = cellSize - padding * 2

  return (
    <div
      className="absolute"
      style={{
        left: x + padding,
        top: y + padding,
        width: segmentSize,
        height: segmentSize,
        transition: 'all 60ms linear',
      }}
    >
      {/* Food orb - Premium pulsing effect */}
      <div
        className="w-full h-full rounded-full relative"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #ffaa00, #ff6600, #ff3300)',
          boxShadow: `
            0 0 25px rgba(255, 165, 0, 1),
            0 0 45px rgba(255, 102, 0, 0.7),
            0 0 65px rgba(255, 51, 0, 0.4),
            inset -3px -3px 8px rgba(0, 0, 0, 0.5),
            inset 3px 3px 8px rgba(255, 255, 255, 0.3)
          `,
          animation: 'pulse-food 1.5s ease-in-out infinite',
        }}
      >
        {/* Shine highlight */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: '30%',
            height: '30%',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.6)',
          }}
        />

        {/* Particle rings */}
        <div
          style={{
            position: 'absolute',
            inset: '-10%',
            border: '2px solid rgba(255, 165, 0, 0.4)',
            borderRadius: '50%',
            animation: 'pulse-ring 2s ease-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '-20%',
            border: '1px solid rgba(255, 102, 0, 0.2)',
            borderRadius: '50%',
            animation: 'pulse-ring 2.5s ease-out infinite',
            animationDelay: '0.3s',
          }}
        />
      </div>

      {/* Add pulse animations via inline styles */}
      <style>{`
        @keyframes pulse-food {
          0%, 100% { transform: scale(1) }
          50% { transform: scale(1.08) }
        }
        @keyframes pulse-ring {
          0% { 
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
