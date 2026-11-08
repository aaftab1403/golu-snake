import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SNAKE - Premium Arcade Game',
  description: 'Classic Arcade Reimagined. A premium Snake game with stunning visuals and smooth gameplay.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white overflow-hidden">
        {children}
      </body>
    </html>
  )
}
