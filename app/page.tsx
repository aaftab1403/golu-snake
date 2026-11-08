'use client'

import { useEffect, useState, useRef } from 'react'
import { useGameLogic } from '@/app/hooks/useGameLogic'
import { useKeyboardControls } from '@/app/hooks/useKeyboardControls'
import { useTouchControls } from '@/app/hooks/useTouchControls'
import { GameHeader } from '@/app/components/GameHeader'
import { ScoreBoard } from '@/app/components/ScoreBoard'
import { GameBoard } from '@/app/components/GameBoard'
import { GameOverlay } from '@/app/components/GameOverlay'
import { GameControls } from '@/app/components/GameControls'
import { DirectionPad } from '@/app/components/DirectionPad'
import { Notification } from '@/app/components/Notification'
import { soundManager } from '@/app/utils/sounds'

export default function Home() {
  const [gameState, gameActions] = useGameLogic()
  const {
    snake,
    food,
    score,
    gameState: state,
    difficulty,
    bestScore,
    gameTime,
  } = gameState
  const {
    initialize,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
    changeDirection,
    setDifficulty,
  } = gameActions

  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const lastMilestoneRef = useRef(0)

  // Initialize game on mount
  useEffect(() => {
    initialize(difficulty)
    setSoundEnabled(soundManager.isEnabled())
  }, [])

  // Check for milestones
  useEffect(() => {
    const milestones = [5, 10, 15, 20, 25, 30, 40, 50]
    const currentMilestone = milestones.find((m) => score >= m && score < m + 1)

    if (currentMilestone && currentMilestone !== lastMilestoneRef.current) {
      lastMilestoneRef.current = currentMilestone
      setNotificationMessage(`🎯 Milestone: ${currentMilestone} Points!`)
      setShowNotification(true)
      soundManager.playMilestone()
    }
  }, [score])

  // Keyboard controls
  useKeyboardControls({
    onDirectionChange: changeDirection,
    onPause: pauseGame,
    onResume: resumeGame,
    onStart: startGame,
    gameState: state,
  })

  // Touch controls
  useTouchControls({
    onDirectionChange: changeDirection,
    gameState: state,
    enabled: state === 'playing',
  })

  const handlePlayGame = () => {
    soundManager.playClick()
    startGame()
  }

  const handleNewGame = () => {
    soundManager.playClick()
    restartGame()
  }

  const handleSelectDifficulty = (newDifficulty: typeof difficulty) => {
    soundManager.playClick()
    setDifficulty(newDifficulty)
  }

  const handleSoundToggle = () => {
    const enabled = soundManager.toggleSound()
    setSoundEnabled(enabled)
  }

  return (
    <main className="w-screen h-screen bg-slate-950 text-white overflow-hidden select-none flex flex-col">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/2 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-1/2 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-4 py-8 gap-4">
        <GameHeader gameState={state} />

        <ScoreBoard currentScore={score} bestScore={bestScore} gameTime={gameTime} />

        <GameBoard snake={snake} food={food} difficulty={difficulty} />

        <DirectionPad onDirectionChange={changeDirection} hidden={state === 'gameOver'} />

        <GameControls
          gameState={state}
          onStart={handlePlayGame}
          onPause={pauseGame}
          onResume={resumeGame}
          onRestart={handleNewGame}
          onSoundToggle={handleSoundToggle}
          soundEnabled={soundEnabled}
          difficulty={difficulty}
          onDifficultyChange={handleSelectDifficulty}
        />
      </div>

      {/* Overlay */}
      <GameOverlay
        gameState={state}
        score={score}
        bestScore={bestScore}
        difficulty={difficulty}
        onPlayGame={handlePlayGame}
        onNewGame={handleNewGame}
        onResume={resumeGame}
        onSelectDifficulty={handleSelectDifficulty}
      />

      {/* Notification */}
      <Notification message={notificationMessage} score={score} visible={showNotification} />
    </main>
  )
}
