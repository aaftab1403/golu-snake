// Simple sound effect generator using Web Audio API
class SoundManager {
  private audioContext: AudioContext | null = null
  private enabled: boolean = true

  constructor() {
    if (typeof window !== 'undefined') {
      this.enabled = localStorage.getItem('soundEnabled') !== 'false'
    }
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return null as unknown as AudioContext
      this.audioContext = new AudioCtx()
    }
    if (this.audioContext?.state === 'suspended') void this.audioContext.resume()
    return this.audioContext!
  }

  toggleSound(): boolean {
    this.enabled = !this.enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEnabled', this.enabled.toString())
    }
    return this.enabled
  }

  isEnabled(): boolean {
    return this.enabled
  }

  // Food eaten - ascending beep
  playEatFood() {
    if (!this.enabled) return
    try {
      const ctx = this.getAudioContext()
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.frequency.setValueAtTime(400, now)
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1)
      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1)

      osc.start(now)
      osc.stop(now + 0.1)
    } catch (e) {
      // Silently fail if audio context is not available
    }
  }

  // Game over - descending beep
  playGameOver() {
    if (!this.enabled) return
    try {
      const ctx = this.getAudioContext()
      const now = ctx.currentTime

      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.frequency.setValueAtTime(300 - i * 50, now + i * 0.15)
        osc.frequency.exponentialRampToValueAtTime(150, now + i * 0.15 + 0.15)
        gain.gain.setValueAtTime(0.3, now + i * 0.15)
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.15)

        osc.start(now + i * 0.15)
        osc.stop(now + i * 0.15 + 0.15)
      }
    } catch (e) {
      // Silently fail if audio context is not available
    }
  }

  // Button click - short beep
  playClick() {
    if (!this.enabled) return
    try {
      const ctx = this.getAudioContext()
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.frequency.setValueAtTime(600, now)
      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05)

      osc.start(now)
      osc.stop(now + 0.05)
    } catch (e) {
      // Silently fail if audio context is not available
    }
  }

  // Milestone reached - ascending chime
  playMilestone() {
    if (!this.enabled) return
    try {
      const ctx = this.getAudioContext()
      const now = ctx.currentTime

      const frequencies = [523, 659, 784] // C5, E5, G5

      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)

        const startTime = now + i * 0.08
        osc.frequency.setValueAtTime(freq, startTime)
        gain.gain.setValueAtTime(0.25, startTime)
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2)

        osc.start(startTime)
        osc.stop(startTime + 0.2)
      })
    } catch (e) {
      // Silently fail if audio context is not available
    }
  }
}

// Create singleton instance
export const soundManager = new SoundManager()
