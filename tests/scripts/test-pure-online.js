// Test our updated checkWordOnline function
import { checkWordOnline } from './src/data/dictionary.js';

async function testWords() {
  const testWords = ['PIANO', 'HOUSE', 'WORLD', 'XYZ123'];
  
  console.log('Testing pure online dictionary (no emergency list)...\n');
  
  for (const word of testWords) {
    try {
      console.log(`Testing: ${word}`);
      const result = await checkWordOnline(word);
      console.log(`Result: ${result ? 'VALID' : 'INVALID'}`);
      console.log('');
    } catch (error) {
      console.log(`Error testing ${word}:`, error.message);
      console.log('');
    }
  }
}

testWords()
  .then(() => {
    console.log('All tests completed.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });
