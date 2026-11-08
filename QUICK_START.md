# Quick Start Guide - Premium Snake Game

## 🚀 Get Playing in 30 Seconds

### Option 1: Run Locally (Recommended for Development)

```bash
# 1. Navigate to project directory
cd golu-snake

# 2. Install dependencies (first time only)
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Visit: http://localhost:3000
```

✅ Done! The game is running.

### Option 2: Production Build

```bash
# Build optimized production version
npm run build

# Start production server
npm run start

# Visit: http://localhost:3000
```

## 🎮 How to Play

### Starting a Game
1. Page loads with a blue overlay
2. Select your difficulty: **Easy**, **Normal**, or **Hard**
3. Click **"Play Game"** or press **ENTER**

### Moving the Snake
Choose your preferred control method:

- **Arrow Keys** ⬆️⬇️⬅️➡️
- **WASD Keys** (W=Up, A=Left, S=Down, D=Right)
- **Mobile/Tablet** - Tap the direction pad buttons
- **Mobile/Tablet** - Swipe on the game board

### Game Commands
- **Pause** - Press **SPACEBAR** or click "Pause"
- **Resume** - Press **SPACEBAR** or click "Resume"
- **New Game** - Press **ENTER** or click "New Game"

## 🎯 Objective

**Eat the orange/red food orb to grow longer and increase your score.**

- Each food eaten = +1 point
- Your best score is automatically saved
- Game gets harder as your score increases
- Try to beat your personal best!

## 🏆 Scoring

| Milestone | Reward |
|-----------|--------|
| Score 5 | 🎯 First milestone reached! |
| Score 10 | ⭐ Keep going! |
| Score 20 | 🔥 On fire! |
| Score 50 | 🚀 Incredible! |

Each milestone triggers a celebratory chime sound and notification.

## 🎚️ Difficulty Levels

### 🟢 Easy (Recommended for Beginners)
- Slow snake movement
- Gradual speed increase
- Perfect for learning

### 🟡 Normal (Recommended for Most Players)
- Medium speed
- Balanced challenge
- Good mix of fun and difficulty

### 🔴 Hard (For Experts)
- Fast snake movement
- Rapid speed increase
- Extreme challenge!

## ⚠️ Game Over Conditions

The game ends immediately when:
- ❌ Snake hits the **top, bottom, left, or right wall**
- ❌ Snake hits its **own body** (only possible if length ≥ 4)

## 🔊 Sound Controls

- **Enable/Disable** - Click the volume button
- **Preference Saved** - Your choice is remembered
- **Sounds Include**:
  - 🎵 Ascending beep when eating food
  - 🎵 Descending beep on game over
  - 🎵 Three-note chime on milestone
  - 🎵 Click sound on button press

## 📱 Mobile Tips

- **Swipe** on the game board to change direction
- **Minimum swipe distance** is 30 pixels
- **Direction pad** is always available as backup
- **Portrait and Landscape** modes both supported

## 💡 Pro Tips

### For High Scores
1. **Plan ahead** - Think about your next moves
2. **Use patterns** - Create snake patterns against walls
3. **Stay calm** - Game speeds up gradually, no need to panic
4. **Practice** - Your best score is saved, challenge yourself!

### Strategy Tips
- Use one wall as a "base" to create predictable patterns
- Avoid corners until you gain confidence
- On Easy mode, focus on learning snake control
- On Hard mode, speed and precision are key

## ❓ Frequently Asked Questions

### Q: How do I reset my best score?
**A:** Unfortunately, best score is saved to browser storage. To reset, clear your browser data for this site.

### Q: Can I play on my phone?
**A:** Yes! The game is fully responsive. Use the touch controls or swipe gestures.

### Q: Do I need to create an account?
**A:** No! Everything is local to your browser. No sign-up required.

### Q: Can I change difficulty mid-game?
**A:** Yes! Pause the game and select a new difficulty. Your score will reset.

### Q: What happens if I close the game?
**A:** Your best score is saved. Just come back and try to beat it!

### Q: Is there sound?
**A:** Yes! Sound effects for eating, game over, milestones, and button clicks. You can toggle sound on/off.

### Q: Can I play offline?
**A:** Not yet. The game requires a web server. For offline play, you can host it locally.

## 🖥️ System Requirements

- **Modern web browser** (Chrome, Safari, Firefox, Edge)
- **JavaScript enabled** (required)
- **Optional** - Web Audio API for sound effects

## 🐛 Troubleshooting

### Game not loading?
- Check your internet connection
- Refresh the page (Ctrl+R or Cmd+R)
- Clear browser cache
- Try a different browser

### Controls not working?
- Make sure you've clicked on the game area
- Try a different control method
- Refresh the page

### Sound not playing?
- Check if sound is enabled (click volume button)
- Check browser volume settings
- Try enabling/disabling sound toggle

### Low performance/lag?
- Close other browser tabs
- Check your internet connection
- Try reducing browser zoom level
- Restart browser

## 🎓 Learning Resources

### Understanding Snake Movement
The snake moves as a continuous queue:
1. New head appears in the direction you pressed
2. If food is eaten, no tail is removed (snake grows)
3. If food is not eaten, tail is removed (snake length stays same)

### Understanding Collision Detection
- **Wall collision**: Head position goes outside grid bounds
- **Self collision**: Head position matches any body segment
- **Both checked every game tick** for immediate response

### Understanding Score Progression
As score increases, game automatically speeds up:
- Normal: +0.75ms faster per food eaten (roughly)
- Minimum speed is capped at 20ms to prevent unplayable speeds

## 📞 Support

Having issues? Check `TEST_CHECKLIST.md` and `TEST_VERIFICATION.md` in the project root for detailed testing information.

---

### Ready to Play?

1. Run: `npm run dev`
2. Open: `http://localhost:3000`
3. Select difficulty
4. Click "Play Game"
5. Have fun! 🎮

**Best of luck beating your high score!** 🏆
