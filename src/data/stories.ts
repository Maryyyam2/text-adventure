import { Story } from '../types';

export const stories: { [key: string]: Story } = {
  dungeon: {
    name: "The Dark Dungeon",
    description: "Escape from an ancient dungeon filled with treasure and danger.",
    startRoom: "entrance",
    endings: {
      treasure: "You escaped with the treasure! Victory!",
      empty: "You escaped alive, but empty-handed.",
      death: "You perished in the depths..."
    },
    rooms: {
      entrance: {
        name: "Dungeon Entrance",
        description: "A dark stone chamber with moss-covered walls. There's a rusty key on the floor.",
        exits: { north: "corridor" },
        items: ["key"]
      },
      corridor: {
        name: "Stone Corridor",
        description: "A narrow hallway lit by flickering torches. Passages lead north and south.",
        exits: { north: "treasure", south: "entrance", east: "exit" },
        items: []
      },
      treasure: {
        name: "Treasure Room",
        description: "A grand chamber with a locked treasure chest in the center.",
        exits: { south: "corridor" },
        items: ["chest"]
      },
      exit: {
        name: "Exit",
        description: "Sunlight streams through the exit. You can escape here.",
        exits: { west: "corridor" },
        items: []
      }
    }
  },
  forest: {
    name: "The Enchanted Forest",
    description: "Navigate a magical forest to find the lost village.",
    startRoom: "clearing",
    endings: {
      village: "You found the lost village and became their hero!",
      lost: "You wandered lost forever in the enchanted woods.",
      death: "The forest claimed another victim..."
    },
    rooms: {
      clearing: {
        name: "Forest Clearing",
        description: "A peaceful clearing with ancient runes carved into a stone. A magic potion glimmers nearby.",
        exits: { north: "path", east: "grove" },
        items: ["potion"]
      },
      path: {
        name: "Winding Path",
        description: "A narrow path winds through thick trees. You hear distant voices.",
        exits: { south: "clearing", north: "village" },
        items: []
      },
      grove: {
        name: "Dark Grove",
        description: "Twisted trees block out the sun. Something evil lurks here.",
        exits: { west: "clearing" },
        items: ["sword"]
      },
      village: {
        name: "Lost Village",
        description: "A hidden village of friendly folk who welcome travelers.",
        exits: { south: "path" },
        items: []
      }
    }
  }
};