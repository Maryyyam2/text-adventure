import { GameState, Room } from '../types';

export function processCommand(
  command: string,
  gameState: GameState,
  rooms: { [key: string]: Room },
  setGameState: (updater: (prev: GameState) => GameState) => void,
  addOutput: (text: string) => void,
  checkEnding: () => void,
  gameEnded: boolean,
  onRestart: () => void
) {
  if (gameEnded) {
    if (command.toLowerCase().trim() === "restart") {
      onRestart();
    }
    return;
  }

  const cmd = command.toLowerCase().trim();
  const room = rooms[gameState.currentRoom];

  switch (true) {
    case cmd === "look":
      addOutput(room.description);
      if (room.items.length > 0) {
        addOutput(`You see: ${room.items.join(", ")}`);
      }
      const exits = Object.keys(room.exits);
      const isEnding = (gameState.story === "dungeon" && gameState.currentRoom === "exit") || 
                      (gameState.story === "forest" && gameState.currentRoom === "village");
      if (exits.length > 0 && !isEnding) {
        addOutput(`Available directions: ${exits.join(", ")}`);
      }
      break;

    case cmd === "inventory":
      addOutput(gameState.inventory.length > 0 ? `Inventory: ${gameState.inventory.join(", ")}` : "Your inventory is empty.");
      break;

    case cmd === "help":
      addOutput("Commands: look, go [direction], take [item], use [item], inventory, health, attack, flee, help");
      break;

    case cmd === "health":
      addOutput(`Health: ${gameState.health}/100`);
      break;

    case cmd === "attack":
      handleAttack(gameState, setGameState, addOutput, checkEnding);
      break;

    case cmd === "flee":
      handleFlee(gameState, setGameState, addOutput);
      break;

    case cmd.startsWith("go "):
      handleMovement(cmd, gameState, rooms, setGameState, addOutput, checkEnding);
      break;

    case cmd.startsWith("take "):
      handleTakeItem(cmd, room, gameState, setGameState, addOutput);
      break;

    case cmd.startsWith("use "):
      handleUseItem(cmd, room, gameState, setGameState, addOutput);
      break;

    default:
      addOutput("Unknown command. Type 'help' for available commands.");
  }
}

function handleAttack(
  gameState: GameState,
  setGameState: (updater: (prev: GameState) => GameState) => void,
  addOutput: (text: string) => void,
  checkEnding: () => void
) {
  if (gameState.inCombat) {
    const damage = Math.floor(Math.random() * 20) + 10;
    const newMonsterHealth = Math.max(0, gameState.monsterHealth - damage);
    addOutput(`You attack for ${damage} damage!`);
    
    if (newMonsterHealth === 0) {
      addOutput("You defeated the monster!");

      setGameState(prev => ({ ...prev, inCombat: false, monsterHealth: 0 }));
    } else {
      const monsterDamage = Math.floor(Math.random() * 15) + 5;
      const newHealth = Math.max(0, gameState.health - monsterDamage);
      addOutput(`Monster attacks for ${monsterDamage} damage!`);

      setGameState(prev => ({ ...prev, health: newHealth, monsterHealth: newMonsterHealth }));
      if (newHealth === 0) {

        setTimeout(checkEnding, 100);
      }
    }
  } else {
    addOutput("There's nothing to attack.");
  }
}

function handleFlee(
  gameState: GameState,
  setGameState: (updater: (prev: GameState) => GameState) => void,
  addOutput: (text: string) => void
) {
  if (gameState.inCombat) {
    addOutput("You flee from combat!");
    setGameState(prev => ({ ...prev, inCombat: false, monsterHealth: 0 }));
  } else {
    addOutput("You're not in combat.");
  }
}

function handleMovement(
  cmd: string,
  gameState: GameState,
  rooms: { [key: string]: Room },
  setGameState: (updater: (prev: GameState) => GameState) => void,
  addOutput: (text: string) => void,
  checkEnding: () => void
) {
  if (gameState.inCombat) {
    addOutput("You can't leave during combat! Use 'flee' to escape.");
    return;
  }

  const direction = cmd.split(" ")[1];
  const room = rooms[gameState.currentRoom];
  
  if (room.exits[direction]) {
    setGameState(prev => ({ ...prev, currentRoom: room.exits[direction] }));

    addOutput(`You go ${direction}.`);
    const newRoom = rooms[room.exits[direction]];
    addOutput(newRoom.description);
    const newExits = Object.keys(newRoom.exits);
    const isNewRoomEnding = (gameState.story === "dungeon" && room.exits[direction] === "exit") || 
                           (gameState.story === "forest" && room.exits[direction] === "village");
    if (newExits.length > 0 && !isNewRoomEnding) {
      addOutput(`Available directions: ${newExits.join(", ")}`);
    }
    
    if (Math.random() < 0.3) {
      const monsters = ["goblin", "skeleton", "rat"];
      const monster = monsters[Math.floor(Math.random() * monsters.length)];
      const monsterHealth = Math.floor(Math.random() * 30) + 20;
      addOutput(`A wild ${monster} appears!`);
      setGameState(prev => ({ ...prev, inCombat: true, monsterHealth }));
    }
    
    setTimeout(checkEnding, 100);
  } else {
    addOutput("You can't go that way.");
  }
}

function handleTakeItem(
  cmd: string,
  room: Room,
  gameState: GameState,
  setGameState: (updater: (prev: GameState) => GameState) => void,
  addOutput: (text: string) => void
) {
  const item = cmd.split(" ")[1];
  if (room.items.includes(item)) {
    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, item]
    }));
    room.items = room.items.filter(i => i !== item);

    addOutput(`You take the ${item}.`);
  } else {
    addOutput("There's no such item here.");
  }
}

function handleUseItem(
  cmd: string,
  room: Room,
  gameState: GameState,
  setGameState: (updater: (prev: GameState) => GameState) => void,
  addOutput: (text: string) => void
) {
  const item = cmd.split(" ")[1];
  if (gameState.inventory.includes(item)) {
    if (item === "key" && gameState.currentRoom === "treasure" && room.items.includes("chest")) {
      setGameState(prev => ({ ...prev, chestUnlocked: true }));

      addOutput("You unlock the treasure chest with the key! Inside you find gold coins!");
      room.items = ["gold"];
    } else if (item === "potion" && gameState.health < 100) {
      const healAmount = Math.min(50, 100 - gameState.health);
      setGameState(prev => ({ ...prev, health: prev.health + healAmount }));
      addOutput(`You drink the potion and heal ${healAmount} health!`);
    } else {
      addOutput("You can't use that here.");
    }
  } else {
    addOutput("You don't have that item.");
  }
}