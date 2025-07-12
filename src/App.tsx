import React, { useState } from 'react';
import StorySelector from './components/StorySelector';
import GameInterface from './components/GameInterface';
import { useGameLogic } from './hooks/useGameLogic';
import { processCommand } from './utils/commandProcessor';
import { stories } from './data/stories';

export default function App() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const { gameState, setGameState, output, gameEnded, addOutput, startStory, checkEnding, isEndingRoom } = useGameLogic();

  const handleSelectStory = (storyKey: string) => {
    setSelectedStory(storyKey);
    startStory(storyKey, stories[storyKey]);
  };

  const handleCommand = (command: string) => {
    if (!selectedStory) return;
    
    addOutput(`> ${command}`);
    processCommand(
      command,
      gameState,
      stories[selectedStory].rooms,
      setGameState,
      addOutput,
      () => checkEnding(selectedStory, stories[selectedStory]),
      gameEnded,
      () => setSelectedStory(null)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  if (!selectedStory) {
    return <StorySelector stories={stories} onSelectStory={handleSelectStory} />;
  }

  return (
    <GameInterface
      gameState={gameState}
      currentStory={stories[selectedStory]}
      output={output}
      input={input}
      gameEnded={gameEnded}
      onInputChange={setInput}
      onSubmit={handleSubmit}
      onCommand={handleCommand}
      onBackToStories={() => setSelectedStory(null)}
    />
  );
}