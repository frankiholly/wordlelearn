// Hard-coded list of target words for the game
// This is separate from dictionary validation which is done online
const TARGET_WORDS = [
  "WATER", "EARTH", "PLANT", "RIVER", "STONE", "BEACH", "CLOUD", "WORLD", 
  "HAPPY", "SMILE", "MUSIC", "HEART", "BRAIN", "HOUSE", "LIGHT", "PIANO"
];

// Get a random word from the target words list
export const getRandomWord = () => {
  return TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)];
};
