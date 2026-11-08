'use client'

import { useEffect, useState } from 'react'

interface NotificationProps {
  message: string
  score: number
  visible: boolean
}

export const Notification: React.FC<NotificationProps> = ({ message, score, visible }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      setShow(true)
      const t = setTimeout(() => setShow(false), 2500)
      return () => clearTimeout(t)
    }
  }, [visible, message])

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      top: 'max(12px, env(safe-area-inset-top))',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: 'linear-gradient(135deg, rgba(255,149,0,0.9), rgba(255,0,110,0.9))',
      borderRadius: 12,
      padding: '10px 24px',
      boxShadow: '0 0 30px rgba(255,149,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      animation: 'slideDown 0.3s ease-out',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ fontSize: 18 }}>⭐</span>
      <div>
        <p style={{ color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: '2px', margin: 0 }}>{message}</p>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: 0 }}>Score: {score}</p>
      </div>
    </div>
  )
}
