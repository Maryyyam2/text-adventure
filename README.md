# Text Adventure Game

A web-based text adventure game built with React and TypeScript featuring multiple storylines, combat system, and interactive gameplay.

## Features

- **Multiple Stories**: Choose between "The Dark Dungeon" and "The Enchanted Forest"
- **Combat System**: Fight monsters with health tracking and tactical decisions
- **Inventory Management**: Collect and use items to progress
- **Branching Storylines**: Multiple endings based on player choices
- **Interactive UI**: Modern interface with retro terminal-style output
- **Responsive Design**: Clean, user-friendly interface with visual feedback

## Game Mechanics

### Commands
- `look` - Examine your surroundings
- `go [direction]` - Move in a direction (north, south, east, west)
- `take [item]` - Pick up items
- `use [item]` - Use items from inventory
- `inventory` - Check your items
- `health` - Check your health status
- `attack` - Attack monsters during combat
- `flee` - Escape from combat
- `help` - Show available commands

### Stories

**The Dark Dungeon**
- Escape from an ancient dungeon
- Find the key to unlock treasure
- Multiple endings: escape with treasure, escape empty-handed, or perish

**The Enchanted Forest**
- Navigate a magical forest to find the lost village
- Use potions to heal and survive encounters
- Become the village hero or get lost forever

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd text-adventure
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview
```

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features

## Project Structure

```
src/
├── components/          # React components
│   ├── GameInterface.tsx
│   └── StorySelector.tsx
├── data/               # Game data
│   └── stories.ts
├── hooks/              # Custom React hooks
│   └── useGameLogic.ts
├── styles/             # CSS styles
│   └── global.css
├── types.ts            # TypeScript interfaces
├── utils/              # Utility functions
│   └── commandProcessor.ts
└── App.tsx             # Main application
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Apache License - see LICENSE file for details