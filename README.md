# Gym Tracker - 5-Day Workout Split

A comprehensive gym routine tracking application built with Next.js, React, TypeScript, and Tailwind CSS. Track your complete 5-day workout split with interactive set logging, smart rest timers, and persistent local storage.

## Features

✅ **Complete 5-Day Split**
- Day 1: Upper Body (Chest, Back, Arms)
- Day 2: Lower Body & Forearms
- Day 3: Push & Abs
- Day 4: Pull & Forearms
- Day 5: Legs & Abs

✅ **Interactive Tracking**
- Check off completed sets with one click
- Visual feedback for completed exercises
- Exercise cards with images and detailed notes

✅ **Smart Rest Timer**
- Automatic rest periods based on exercise type
- Warm-up: 45 seconds
- Supersets: 60 seconds
- Main Lifts: 90 seconds
- Manual pause/resume controls

✅ **Persistent Storage**
- All workout data saved to browser LocalStorage
- Progress persists between sessions
- Clear session button to reset daily logs

✅ **Dark Mode UI**
- Professional dark theme optimized for gym use
- High contrast for easy visibility
- Responsive design for all devices

## Installation

```bash
# Clone the repository
git clone https://github.com/parjr01/gym-tracker.git
cd gym-tracker

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Select a workout day** using the navigation tabs at the top
2. **Review exercises** with target weights and rep ranges
3. **Check off sets** as you complete them - rest timer activates automatically
4. **Track progress** across all 5 days with persistent storage
5. **Clear session** when starting a new training cycle

## Technology Stack

- **Next.js 13** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **LocalStorage API** - Data persistence

## License

MIT License - feel free to use and modify