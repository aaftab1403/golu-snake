'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

interface NotificationProps {
  message: string
  score: number
  visible: boolean
}

export const Notification: React.FC<NotificationProps> = ({ message, score, visible }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(visible)
    if (visible) {
      const timer = setTimeout(() => {
        setShow(false)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!show) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 animate-slideDown">
      <div className="bg-gradient-to-r from-neon-orange to-neon-pink rounded-lg px-6 py-3 shadow-xl border border-neon-orange/50 flex items-center gap-3">
        <Star size={20} className="text-neon-orange animate-bounce" />
        <div>
          <p className="font-bold text-white uppercase tracking-widest text-sm">{message}</p>
          <p className="text-xs text-orange-100">Score: {score}</p>
        </div>
      </div>
    </div>
  )
}
