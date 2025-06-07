// Manual test for online dictionary validation
// Run with: node manual-test.js

// Import the online dictionary function
import { checkWordOnline } from './src/data/dictionary.js';

// Test words - some valid, some invalid
const testWords = [
  'HOUSE',   // Valid common word
  'PIANO',   // Valid word that was problematic
  'WORLD',   // Valid common word
  'BRAIN',   // Valid common word
  'WATER',   // Valid common word
  'XYZ123',  // Invalid word
  'QWERTY',  // Invalid word (though could be valid?)
  'HELLO',   // Valid common word
  'TESTS',   // Valid word
  'ABCDEF'   // Invalid word
];

async function testOnlineDictionary() {
  console.log('Testing online dictionary function...\n');
  
  for (const word of testWords) {
    console.log(`Testing word: ${word}`);
    try {
      const startTime = Date.now();
      const result = await checkWordOnline(word);
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log(`  Result: ${result ? 'VALID' : 'INVALID'}`);
      console.log(`  Duration: ${duration}ms`);
      console.log('');
    } catch (error) {
      console.log(`  Error: ${error.message}`);
      console.log('');
    }
  }
}

// Run the test
testOnlineDictionary()
  .then(() => {
    console.log('Test completed.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });
