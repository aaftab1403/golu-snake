'use client'

import { Direction, Position } from '@/app/types'

interface SnakeProps {
  snake: Position[]
  cellSize: number
  gridSize: number
  direction: Direction
}

const FACING: Record<Direction, number> = {
  right: 0,
  down: 90,
  left: 180,
  up: -90,
}

function adjacent(a: Position, b: Position) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1
}

function chainsOf(snake: Position[]): Position[][] {
  const chains: Position[][] = [[snake[0]]]
  for (let i = 1; i < snake.length; i++) {
    if (adjacent(snake[i - 1], snake[i])) chains[chains.length - 1].push(snake[i])
    else chains.push([snake[i]])
  }
  return chains
}

function center(p: Position, cell: number) {
  return { x: (p.x + 0.5) * cell, y: (p.y + 0.5) * cell }
}

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return ''
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`
  }
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) / 2
    const midY = (points[i].y + points[i + 1].y) / 2
    d += ` Q ${points[i].x} ${points[i].y} ${midX} ${midY}`
  }
  const last = points[points.length - 1]
  d += ` L ${last.x} ${last.y}`
  return d
}

export const Snake: React.FC<SnakeProps> = ({ snake, cellSize, gridSize, direction }) => {
  if (snake.length === 0 || cellSize <= 0) return null

  const size = cellSize * gridSize
  const body = cellSize * 0.74
  const headR = cellSize * 0.48
  const outline = Math.max(1.5, cellSize * 0.07)
  const chains = chainsOf(snake)
  const head = center(snake[0], cellSize)

  return (
    <svg className="snake-layer" viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" aria-hidden>
      <defs>
        <radialGradient id="snakeHeadFill" cx="62%" cy="42%" r="75%">
          <stop offset="0%" stopColor="#f3fff7" />
          <stop offset="38%" stopColor="#4dff8f" />
          <stop offset="100%" stopColor="#05924c" />
        </radialGradient>
      </defs>

      {chains.map((chain, index) => {
        const points = chain.map((part) => center(part, cellSize))
        if (points.length < 2) {
          if (index === 0) return null
          return (
            <circle
              key={index}
              cx={points[0].x}
              cy={points[0].y}
              r={body / 2}
              fill="#14c85c"
              stroke="#042818"
              strokeWidth={outline}
            />
          )
        }

        const d = smoothPath(points)
        return (
          <g key={index}>
            <path d={d} fill="none" stroke="#042818" strokeWidth={body + outline * 2} strokeLinecap="round" strokeLinejoin="round" />
            <path d={d} fill="none" stroke="#12d864" strokeWidth={body} strokeLinecap="round" strokeLinejoin="round" />
            <path d={d} fill="none" stroke="rgba(232, 255, 240, 0.72)" strokeWidth={body * 0.28} strokeLinecap="round" strokeLinejoin="round" />
            <path
              d={d}
              fill="none"
              stroke="rgba(3, 70, 36, 0.45)"
              strokeWidth={body * 0.14}
              strokeLinecap="round"
              strokeDasharray={`${cellSize * 0.16} ${cellSize * 0.5}`}
            />
          </g>
        )
      })}

      <g transform={`translate(${head.x} ${head.y}) rotate(${FACING[direction]})`}>
        <ellipse
          cx={headR * 0.1}
          cy="0"
          rx={headR * 1.12}
          ry={headR * 0.9}
          fill="url(#snakeHeadFill)"
          stroke="#042818"
          strokeWidth={outline}
        />
        <ellipse cx={headR * 0.58} cy={-headR * 0.34} rx={headR * 0.28} ry={headR * 0.32} fill="#07140c" />
        <ellipse cx={headR * 0.58} cy={headR * 0.34} rx={headR * 0.28} ry={headR * 0.32} fill="#07140c" />
        <circle cx={headR * 0.7} cy={-headR * 0.36} r={headR * 0.11} fill="#fff" />
        <circle cx={headR * 0.7} cy={headR * 0.32} r={headR * 0.11} fill="#fff" />
        <path
          className="snake-tongue"
          d={`M ${headR} 0 L ${headR * 1.42} 0 M ${headR * 1.22} 0 L ${headR * 1.62} ${-headR * 0.26} M ${headR * 1.22} 0 L ${headR * 1.62} ${headR * 0.26}`}
          fill="none"
          stroke="#ff3b6a"
          strokeWidth={Math.max(1.4, headR * 0.13)}
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
