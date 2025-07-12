import React from 'react';
import { GameState, Story } from '../types';
import '../styles/global.css';

interface GameInterfaceProps {
  gameState: GameState;
  currentStory: Story;
  output: string[];
  input: string;
  gameEnded: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCommand: (command: string) => void;
  onBackToStories: () => void;
}

export default function GameInterface({
  gameState,
  currentStory,
  output,
  input,
  gameEnded,
  onInputChange,
  onSubmit,
  onCommand,
  onBackToStories
}: GameInterfaceProps) {
  return (
    <div className="container">
      <div className="card" style={{ padding: '20px' }}>
        <div className="controls-header">
          <h1 className="game-title">🎮 {currentStory.name}</h1>
          <div className="nav-controls">
            <button onClick={onBackToStories} className="btn btn-secondary">
              ← Back
            </button>
          </div>
        </div>
        
        <div className="status-bar">
          <div className="health-bar">
            <span>❤️ Health:</span>
            <div className="health-progress">
              <div className="health-fill" style={{ width: `${gameState.health}%` }}></div>
            </div>
            <span>{gameState.health}/100</span>
          </div>
          {gameState.inCombat && (
            <div className="combat-indicator">
              ⚔️ COMBAT | Monster: {gameState.monsterHealth} HP
            </div>
          )}
        </div>
        
        <div className="game-output">
          {output.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        
        {!gameEnded && (
          <form onSubmit={onSubmit} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Enter command..."
              className="input-field"
            />
            <button type="submit" className="btn btn-primary">➤ Enter</button>
          </form>
        )}
        
        <div className="button-group">
          {!gameEnded && (
            <>
              <button onClick={() => onCommand("look")} className="btn btn-info">
                👁️ Look
              </button>
              <button onClick={() => onCommand("inventory")} className="btn btn-info">
                🎒 Inventory
              </button>
              <button onClick={() => onCommand("help")} className="btn btn-info">
                ❓ Help
              </button>
              {gameState.inCombat && (
                <>
                  <button onClick={() => onCommand("attack")} className="btn btn-danger">
                    ⚔️ Attack
                  </button>
                  <button onClick={() => onCommand("flee")} className="btn btn-warning">
                    🏃 Flee
                  </button>
                </>
              )}
            </>
          )}
          {gameEnded && (
            <>
              <button onClick={() => onCommand("restart")} className="btn btn-success">
                🔄 New Adventure
              </button>
              <button onClick={onBackToStories} className="btn btn-secondary">
                🏠 Main Menu
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}