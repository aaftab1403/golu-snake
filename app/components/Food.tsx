'use client'

import { Position } from '@/app/types'

interface FoodProps {
  food: Position
  cellSize: number
}

export const Food: React.FC<FoodProps> = ({ food, cellSize }) => {
  const pad = Math.max(2, cellSize * 0.16)
  const size = cellSize - pad * 2
  const x = food.x * cellSize + pad
  const y = food.y * cellSize + pad

  return (
    <>
      <style>{`
        @keyframes foodPulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @keyframes foodRing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
      <div className="food-layer" style={{ left: x, top: y, width: size, height: size }}>
        {/* outer ring */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid rgba(255,150,0,0.5)',
          animation: 'foodRing 1.6s ease-out infinite',
        }} />
        {/* orb */}
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 32%, #ffd54f, #ff6d00, #b71c1c)',
          boxShadow: '0 0 16px 5px rgba(255,140,0,0.9), 0 0 32px 8px rgba(255,80,0,0.5), inset 0 0 6px rgba(0,0,0,0.5)',
          position: 'relative',
          animation: 'foodPulse 1.5s ease-in-out infinite',
        }}>
          {/* shine */}
          <div style={{
            position: 'absolute', top: '14%', left: '20%',
            width: '28%', height: '28%', borderRadius: '50%',
            background: 'rgba(255,255,255,0.85)',
          }} />
        </div>
      </div>
    </>
  )
}
