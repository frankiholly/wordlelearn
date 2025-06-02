// Import the dictionary
import { dictionary } from './data/dictionary';

// Get a random word from the dictionary
export const getRandomWord = () => {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};
