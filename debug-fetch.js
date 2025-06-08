// Debug script to test the exact checkWordOnline function from dictionary.js
// This simulates how the React app calls the function

console.log('=== Testing checkWordOnline function ===');

// Simulate fetch API (similar to browser environment)
const fetch = globalThis.fetch || (await import('node-fetch')).default;

async function checkWordOnline(word) {
  try {
    console.log(`Checking online dictionary for word: ${word}`);
    
    // Try the Free Dictionary API with a simple timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log(`API fetch timeout triggered for word: ${word}`);
      controller.abort();
    }, 3000); // 3-second timeout
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // If the response is OK (200-299), the word exists
      if (response.ok) {
        console.log(`Online dictionary API check for '${word}': Valid`);
        return true;
      }
      
      // If we get a 404, the word doesn't exist in the dictionary
      if (response.status === 404) {
        console.log(`Online dictionary API check for '${word}': Invalid`);
        return false;
      }
      
      // For other status codes, log and return false
      console.log(`API check failed with status ${response.status} for word '${word}'`);
      return false;
      
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.log('Fetch operation failed or timed out:', fetchError);
      
      // If the fetch fails with AbortError, it's likely a timeout issue
      if (fetchError.name === 'AbortError') {
        console.log(`Fetch operation timed out for word '${word}' - rejecting word`);
        return false;
      }
      
      // For other errors, also reject the word
      console.log(`Fetch operation failed for word '${word}' - rejecting word`);
      return false;
    }
    
  } catch (error) {
    console.error('Unexpected error in dictionary check:', error);
    // In case of unexpected errors, reject the word to be safe
    return false;
  }
}

async function testWords() {
  const words = ['PIANO', 'HOUSE', 'WORLD', 'INVALID'];
  
  for (const word of words) {
    console.log(`\n--- Testing: ${word} ---`);
    try {
      const startTime = Date.now();
      const result = await checkWordOnline(word);
      const endTime = Date.now();
      console.log(`Result: ${result ? 'VALID' : 'INVALID'}`);
      console.log(`Duration: ${endTime - startTime}ms`);
    } catch (error) {
      console.error(`Error testing ${word}:`, error);
    }
  }
}

// Run the test
testWords()
  .then(() => {
    console.log('\n=== All tests completed ===');
    process.exit(0);
  })
  .catch(error => {
    console.error('Test suite failed:', error);
    process.exit(1);
  });
