export interface Room {
  name: string;
  description: string;
  exits: { [key: string]: string };
  items: string[];
}

export interface GameState {
  currentRoom: string;
  inventory: string[];
  chestUnlocked: boolean;
  health: number;
  inCombat: boolean;
  monsterHealth: number;
  story: string;
  questComplete: boolean;
}

export interface Story {
  name: string;
  description: string;
  rooms: { [key: string]: Room };
  startRoom: string;
  endings: { [key: string]: string };
}