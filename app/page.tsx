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
  const { snake, food, score, gameState: state, difficulty, bestScore, gameTime, direction } = gameState
  const { initialize, startGame, pauseGame, resumeGame, restartGame, changeDirection, setDifficulty } = gameActions

  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const lastMilestoneRef = useRef(0)

  useEffect(() => {
    initialize(difficulty)
    setSoundEnabled(soundManager.isEnabled())
  }, [initialize])

  useEffect(() => {
    const milestones = [5, 10, 15, 20, 25, 30, 40, 50]
    const hit = milestones.find((milestone) => score >= milestone && score < milestone + 1)
    if (hit && hit !== lastMilestoneRef.current) {
      lastMilestoneRef.current = hit
      setNotificationMessage(`Milestone: ${hit} points`)
      setShowNotification(true)
      soundManager.playMilestone()
    }
  }, [score])

  const handlePlayGame = () => { soundManager.playClick(); startGame() }
  const handleNewGame = () => { soundManager.playClick(); restartGame() }
  const handleSelectDifficulty = (next: typeof difficulty) => { soundManager.playClick(); setDifficulty(next) }
  const handleSoundToggle = () => { setSoundEnabled(soundManager.toggleSound()) }

  useKeyboardControls({
    onDirectionChange: changeDirection,
    onPause: pauseGame,
    onResume: resumeGame,
    onStart: handlePlayGame,
    onRestart: handleNewGame,
    gameState: state,
  })
  useTouchControls({ onDirectionChange: changeDirection, gameState: state, enabled: state === 'playing' })

  return (
    <>
      <div className="ambient" aria-hidden>
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>

      <div className="game-shell" onContextMenu={(event) => event.preventDefault()}>
        <GameHeader gameState={state} />
        <ScoreBoard currentScore={score} bestScore={bestScore} gameTime={gameTime} />
        <div className="play-row">
          <GameBoard snake={snake} food={food} difficulty={difficulty} direction={direction} />
          <DirectionPad onDirectionChange={changeDirection} hidden={state === 'gameOver'} />
        </div>
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

      <Notification message={notificationMessage} score={score} visible={showNotification} />
    </>
  )
}
