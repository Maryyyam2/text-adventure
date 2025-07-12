import { useState } from 'react';
import { GameState, Story } from '../types';

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>({
    currentRoom: "",
    inventory: [],
    chestUnlocked: false,
    health: 100,
    inCombat: false,
    monsterHealth: 0,
    story: "",
    questComplete: false
  });
  const [output, setOutput] = useState<string[]>([]);
  const [gameEnded, setGameEnded] = useState(false);

  const addOutput = (text: string) => {
    setOutput(prev => [...prev, text]);
  };

  const startStory = (storyKey: string, story: Story) => {
    setGameState({
      currentRoom: story.startRoom,
      inventory: [],
      chestUnlocked: false,
      health: 100,
      inCombat: false,
      monsterHealth: 0,
      story: storyKey,
      questComplete: false
    });
    const startRoom = story.rooms[story.startRoom];
    const exits = Object.keys(startRoom.exits);
    const initialOutput = [startRoom.description];
    if (exits.length > 0) {
      initialOutput.push(`Available directions: ${exits.join(", ")}`);
    }
    setOutput(initialOutput);
    setGameEnded(false);
  };

  const checkEnding = (storyKey: string, story: Story) => {
    if (gameState.health <= 0) {
      addOutput(story.endings.death);
      setGameEnded(true);
    } else if (storyKey === "dungeon" && gameState.currentRoom === "exit") {
      const ending = gameState.inventory.includes("gold") ? "treasure" : "empty";
      addOutput(story.endings[ending]);
      setGameEnded(true);
    } else if (storyKey === "forest" && gameState.currentRoom === "village") {
      addOutput(story.endings.village);
      setGameEnded(true);
    }
  };

  const isEndingRoom = (storyKey: string, roomKey: string) => {
    return (storyKey === "dungeon" && roomKey === "exit") || 
           (storyKey === "forest" && roomKey === "village");
  };

  return {
    gameState,
    setGameState,
    output,
    gameEnded,
    addOutput,
    startStory,
    checkEnding,
    isEndingRoom
  };
}